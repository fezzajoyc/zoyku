#!/usr/bin/env bash
# 部署前自动清理旧 Vercel 部署(保留最新 3 个),然后执行生产部署。
# 用法: bash scripts/deploy-clean.sh   (在 toolsite 目录下运行)
set -uo pipefail

PROXY="http://127.0.0.1:7890"
PROJECT_ID="prj_GRlSiXHYctH8FNhVBcDbt4H9oOPv"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
KEYS_FILE="$SCRIPT_DIR/../../../deploy-keys.md"
KEEP=3

VT=$(grep -io "vcp_[A-Za-z0-9]*" "$KEYS_FILE" | head -1)
if [ -z "$VT" ]; then echo "✗ 未找到 Vercel token"; exit 1; fi

echo "── 清理旧部署(保留最新 $KEEP 个)"
curl -s --proxy "$PROXY" --max-time 30 -H "Authorization: Bearer $VT" \
  "https://api.vercel.com/v6/deployments?projectId=$PROJECT_ID&limit=100" -o /tmp/vd_clean.json

TOTAL=$(python3 -c "import json;print(len(json.load(open('/tmp/vd_clean.json')).get('deployments',[])))")
KEEP_UIDS=$(python3 - <<PYEOF
import json
d=json.load(open('/tmp/vd_clean.json'))
deps=sorted(d.get('deployments',[]), key=lambda x: x['createdAt'], reverse=True)
for dep in deps[:$KEEP]: print(dep['uid'])
PYEOF
)
DROP_UIDS=$(python3 - <<PYEOF
import json
d=json.load(open('/tmp/vd_clean.json'))
deps=sorted(d.get('deployments',[]), key=lambda x: x['createdAt'], reverse=True)
for dep in deps[$KEEP:]: print(dep['uid'])
PYEOF
)
DROP_COUNT=$(echo -n "$DROP_UIDS" | grep -c dpl_ || true)
echo "   现有 $TOTAL 个,待删 $DROP_COUNT 个"

DELETED=0
if [ "$DROP_COUNT" -gt 0 ]; then
  while IFS= read -r uid; do
    [ -z "$uid" ] && continue
    code=$(curl -s --proxy "$PROXY" --max-time 20 -X DELETE \
      -H "Authorization: Bearer $VT" \
      "https://api.vercel.com/v13/deployments/$uid" -o /dev/null -w "%{http_code}")
    if [ "$code" = "200" ]; then DELETED=$((DELETED+1)); else echo "   删除失败 $uid: $code"; fi
  done <<< "$DROP_UIDS"
  echo "   已删 $DELETED 个"
else
  echo "   无需清理"
fi

echo "── 生产部署"
export HTTPS_PROXY="$PROXY" HTTP_PROXY="$PROXY"
npx vercel deploy --prod --yes --token "$VT"
