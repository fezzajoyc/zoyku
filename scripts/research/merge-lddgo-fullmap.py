#!/usr/bin/env python3
"""Merge reviewed category batches; unmatched names are never inferred missing."""
import json,re
from collections import Counter
from pathlib import Path
ROOT=Path(__file__).resolve().parents[2]
D=ROOT/'docs/research'
STATUS={'existing','partial','missing','not-comparable','needs-source'}

def merge():
    c=json.loads((D/'2026-11-21-lddgo-catalog-matrix.json').read_text())
    cat={r['catalog_id']:r for r in c['rows']}
    rows=[]
    for suffix in ['network-crypto','daily-math','remaining']:
        path=D/('2026-11-21-lddgo-fullmap-'+suffix+'.json')
        for r in json.loads(path.read_text())['rows']:
            row=dict(r);row['review_source']=path.name;rows.append(row)
    path=D/'2026-11-21-lddgo-semantic-batch1.json'
    for r in json.loads(path.read_text())['rows']:
        peer=cat[r['catalog_id']]
        rows.append({
          'catalog_id':r['catalog_id'],'category_id':peer['category_id'],'title_zh':peer['title_zh'],
          'peer_url':peer['url_zh'],'status':r['status'],'mapped_slugs':r['mapped_slugs'],
          'boundary_or_gap':r['boundary_or_gap'],'workflow_group':r['workflow_group'],
          'source_anchors':r['local_evidence'],'evidence_level':r['evidence_level'],
          'review_source':path.name,'same_input_status':r['same_input_status']
        })
    for r in cat.values():
        p=r.get('peer_review')
        if not p:continue
        mapped=p.get('current_mapping')
        slug=(mapped.get('slug') or mapped.get('local_slug')) if mapped else p['local_slug']
        rows.append({
          'catalog_id':r['catalog_id'],'category_id':r['category_id'],'title_zh':r['title_zh'],
          'peer_url':r['url_zh'],'status':mapped.get('mapping_status', p['status']) if mapped else p['status'],'mapped_slugs':[slug] if slug else [],
          'boundary_or_gap':p['comparison'],'workflow_group':'historical-exact-slug',
          'source_paths':mapped.get('local_source',p['local_source']) if mapped else p['local_source'],'evidence_level':p['evidence_level'],
          'review_source':'2026-11-21-lddgo-catalog-matrix.json:peer_review','same_input_status':'unverified',
        })
    ids=[r['catalog_id'] for r in rows]
    assert len(ids)==420 and len(set(ids))==420 and set(ids)==set(cat)
    for r in rows:assert r['status'] in STATUS
    # Delivery changes are explicit, retaining the prior source classification.
    updates={
      'LDDGO-01-025':('existing',['line-number-generator'],'本轮新实现行首/行尾编号、开始/步长/对齐/分隔符，保留空行和Unicode。'),
      'LDDGO-02-018':('existing',['json-yaml-converter'],'本轮修复真正双向转换及异步状态，并加入JSON兼容值/资源限制。'),
    }
    for r in rows:
        if '文件类型' in r['title_zh']:
            updates[r['catalog_id']]=('partial',['file-type-detector'],'本轮提供明确签名表的有限头部匹配；不覆盖所有文件格式、不验证完整文件、不解析容器子格式。')
    evidence_file=D/'2026-11-21-complete-catalog-browser.json'
    evidence=json.loads(evidence_file.read_text()) if evidence_file.exists() else {}
    verified_delivery=evidence.get('status')=='passed' and all(evidence.get('acceptance',{}).get(k) is True for k in ['file_type','line_numbers','yaml_direction'])
    if evidence_file.exists():
        assert verified_delivery, 'Delivery evidence exists without all acceptance checks passing'
    for r in rows:
        if r['catalog_id'] in updates and verified_delivery:
            status,slugs,why=updates[r['catalog_id']]
            r['pre_delivery_status']=r['status'];r['pre_delivery_mapping']=r.get('mapped_slugs',[])
            r.update(status=status,mapped_slugs=slugs,delivery_update=why)
    rows.sort(key=lambda r:r['catalog_id'])
    summary={'catalog_rows':420,'status_counts':dict(Counter(r['status'] for r in rows)),
      'category_counts':dict(Counter(str(r['category_id']) for r in rows)),
      'new_peer_runtime_runs_in_merge':0,
      'boundary':'All official catalog rows have a semantic triage decision, not 420 runtime tests or verified parity.'}
    payload={'title':'LDDGO 420项完整语义对照','date':'2026-11-21','summary':summary,'rows':rows}
    out=D/'2026-11-21-lddgo-full-comparison.json'
    out.write_text(json.dumps(payload,ensure_ascii=False,indent=2)+'\n')
    lines=['# LDDGO 420 项完整对照与实施队列','',
      '来源为已保存的官方中英文分类目录。420 行全部有对照状态；这是目录与本地可达源码的语义核对，不等于逐项运行验收，也不代表把同行源码搬入本项目。','',
      '状态统计：'+json.dumps(summary['status_counts'],ensure_ascii=False)+'。',
      'existing 表示目录描述的核心任务存在；partial 表示只有部分工作流；missing 为检查到的缺失能力；needs-source 为目录不足以定义实现或仍需标准/数据源；not-comparable 为文档、外链或不属于原生工具的对象。','',
      '本轮交付更新保留 pre_delivery_status，原始分类报告不回写。本清单内的每行都保留来源文件、同行链接和源码证据。缺失条目不能直接相加为新增路由数，同内核/不同选项须按工作流合并。','',
      '## 逐分类清单','']
    for category in range(1,11):
        subset=[r for r in rows if r['category_id']==category]
        lines+=['### '+str(category)+' · '+cat[subset[0]['catalog_id']]['category_zh']+'（'+str(len(subset))+' 项）','',
          '| ID | 同行工具 | 状态 | 本地入口 | 具体差距 / 当前范围 |','| --- | --- | --- | --- | --- |']
        for r in subset:
            gap=r.get('delivery_update') or r['boundary_or_gap']
            gap=str(gap).replace('|','\\|').replace('\n',' ')
            lines.append('| '+r['catalog_id']+' | ['+r['title_zh']+']('+r['peer_url']+') | '+r['status']+' | '+', '.join(r.get('mapped_slugs',[]))+' | '+gap+' |')
        lines.append('')
    lines+=['## 其他同行','',
      '用户点名的 SmallSEOTools.net、RapidTables、Omni 的本轮入口采集另存[报告](2026-11-21-named-peer-catalogs.md)。已有 Browserling、IT-Tools、OnlineTools、PDF24、iLovePDF、Convertio、FreeConvert、Zamzar 等证据继续供给排期；目录与 sitemap URL 不当成独立功能或已完成实测。','',
      '[完整 JSON 证据](2026-11-21-lddgo-full-comparison.json)']
    out.with_suffix('.md').write_text('\n'.join(lines)+'\n')
    print(json.dumps(summary,ensure_ascii=False,indent=2))

if __name__=='__main__':merge()
