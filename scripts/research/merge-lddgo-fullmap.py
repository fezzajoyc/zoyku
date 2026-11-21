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
            r['pre_delivery_boundary_or_gap']=r['boundary_or_gap']
            r['pre_delivery_source_anchors']=r.get('source_anchors',[])
            r.update(status=status,mapped_slugs=slugs,delivery_update=why,boundary_or_gap=why)
            paths={
              'LDDGO-01-025':['tools/text/line-number-generator.ts','tools/_engines/text-engine-line-numbers.tsx','tools/_lib/line-numbers.ts'],
              'LDDGO-02-018':['tools/developer/json-yaml-converter.ts','tools/_engines/dev-engine-yaml.tsx','tools/_lib/yaml-converter.ts','lib/tool-copy.ts'],
              'LDDGO-10-023':['tools/developer/file-type-detector.ts','tools/_engines/dev-engine-file-type.tsx','tools/_lib/file-signature.ts'],
            }[r['catalog_id']]
            r['source_paths']=paths
            r['source_anchors']=[]
            for source in paths:
                text=(ROOT/source).read_text().splitlines()
                line=next((i for i,t in enumerate(text,1) if 'slug:' in t or 'export function' in t or 'export async function' in t),1)
                r['source_anchors'].append({'path':source,'line':line,'excerpt':text[line-1].strip()})
            r['delivery_verification']='2026-11-21-complete-catalog-browser.json'
            r['delivery_verified_on']='2026-11-22'
    next_file=D/'2026-11-22-text-uuid-file-browser.json'
    next_evidence=json.loads(next_file.read_text()) if next_file.exists() else {}
    next_verified=next_evidence.get('status')=='passed' and all(next_evidence.get('acceptance',{}).get(k) is True for k in ['text_filter','uuid','file_parts'])
    if next_file.exists():
        assert next_verified, 'Next delivery evidence did not pass all checks'
    next_updates={
      'LDDGO-01-026':('partial',['text-line-filter'],'本轮完成字面包含/排除、行范围、码点长度和分隔列提取；正则筛选和正则列提取仍未支持。',['tools/text/text-line-filter.ts','tools/_engines/text-engine-line-filter.tsx','tools/_lib/text-line-filter.ts']),
      'LDDGO-01-039':('existing',['text-line-filter'],'本轮按Unicode码点长度范围筛选文本行，保留空白与末空行；不按视觉字素计数。',['tools/text/text-line-filter.ts','tools/_engines/text-engine-line-filter.tsx','tools/_lib/text-line-filter.ts']),
      'LDDGO-01-081':('existing',['uuid-validator-converter'],'本轮实现标准文本、HEX、128位二进制和严格Base64的UUID双向转换，解释版本/变体和NIL/MAX；布局识别不证明唯一性或随机性。',['tools/developer/uuid-validator-converter.ts','tools/_engines/dev-engine-uuid-inspector.tsx','tools/_lib/uuid-inspector.ts']),
      'LDDGO-10-018':('existing',['file-splitter-merger'],'本轮按用户顺序合并原始文件字节，支持重排/移除和下载。限制总计50MiB和100文件；不理解PDF页或文本语义。',['tools/utility/file-splitter-merger.ts','tools/_engines/util-engine-file-parts.tsx','tools/_lib/file-parts.ts']),
      'LDDGO-10-019':('existing',['file-splitter-merger'],'本轮按精确字节大小或均衡份数拆分本地文件，实际分片回读可还原原字节。限制50MiB/100分片；空文件一空片。',['tools/utility/file-splitter-merger.ts','tools/_engines/util-engine-file-parts.tsx','tools/_lib/file-parts.ts']),
    }
    if next_verified:
        for r in rows:
            if r['catalog_id'] not in next_updates:continue
            status,slugs,why,paths=next_updates[r['catalog_id']]
            r['pre_delivery_status']=r['status'];r['pre_delivery_mapping']=r.get('mapped_slugs',[])
            r['pre_delivery_boundary_or_gap']=r['boundary_or_gap'];r['pre_delivery_source_anchors']=r.get('source_anchors',[])
            r.update(status=status,mapped_slugs=slugs,boundary_or_gap=why,delivery_update=why,source_paths=paths,
                     delivery_verification=next_file.name,delivery_verified_on='2026-11-22')
            r['source_anchors']=[]
            for source in paths:
                lines=(ROOT/source).read_text().splitlines()
                line=next((i for i,t in enumerate(lines,1) if 'slug:' in t or 'export function' in t or 'export async function' in t),1)
                r['source_anchors'].append({'path':source,'line':line,'excerpt':lines[line-1].strip()})
    workflow_file=D/'2026-11-22-sequence-bytes-watermark-browser.json'
    workflow_evidence=json.loads(workflow_file.read_text()) if workflow_file.exists() else {}
    workflow_verified=workflow_evidence.get('status')=='passed' and all(workflow_evidence.get('acceptance',{}).get(k) is True for k in ['sequence','frequency','byte_encoding','image_watermark'])
    if workflow_file.exists():
        assert workflow_verified, 'Sequence/bytes/watermark delivery evidence did not pass all checks'
    workflow_updates={
      'LDDGO-01-014':('partial',['text-sequence-generator'],'本轮补精确有限小数起点/步长、数量、整数位补零与字面前后缀/分隔符；详情页的表达式、随机模板函数和2–36进制序列仍未支持。',['tools/text/text-sequence-generator.ts','tools/_engines/text-engine-sequence.tsx','tools/_lib/string-sequence.ts']),
      'LDDGO-01-062':('partial',['character-frequency-counter','keyword-density-checker'],'本轮新增通用Unicode码点频率与完整CSV/TXT导出，支持整段小写及去空白；分母明确为保留的变换后码点。仍未复现同行汉字/字母/单词/数字分类表及专用分母。',['tools/text/character-frequency-counter.ts','tools/_engines/text-engine-character-frequency.tsx','tools/_lib/character-frequency.ts']),
      'LDDGO-02-013':('partial',['byte-encoding-converter'],'本轮提供严格RFC4648 Base32与UTF-8/HEX/Base64/文件原始字节互转，保留原始换行；其他字符集与显式LF/CRLF归一化选项仍未支持。',['tools/developer/byte-encoding-converter.ts','tools/_engines/dev-engine-byte-encoding.tsx','tools/_lib/byte-encoding.ts']),
      'LDDGO-02-025':('existing',['byte-encoding-converter'],'本轮补Bitcoin字母表的原始字节Base58，支持UTF-8文本和本地文件，保留每个前导零字节并下载回读；Base58限1024字节，不含Base58Check。',['tools/developer/byte-encoding-converter.ts','tools/_engines/dev-engine-byte-encoding.tsx','tools/_lib/byte-encoding.ts']),
      'LDDGO-09-017':('existing',['watermark-image'],'现有入口已补文字/图片Logo两种水印、九点定位、相对宽度、旋转、透明度和有限平铺；PNG保留alpha、JPEG白底，单个/最多6源图片本地处理，尺寸限制及动画/元数据边界见页面。',['tools/image/watermark-image.ts','tools/_engines/image-engine-watermark.tsx','tools/_lib/image-watermark.ts','lib/tool-copy.ts']),
      'LDDGO-09-035':('existing',['watermark-image'],'同一入口支持最多6源图片的文字/图片Logo批量水印，比例/旋转/留边/透明度和输出格式共享；不新增同义批量路由，不保留动画/元数据，支持尺寸与总量限制显式披露。',['tools/image/watermark-image.ts','tools/_engines/image-engine-watermark.tsx','tools/_lib/image-watermark.ts','lib/tool-copy.ts']),
    }
    if workflow_verified:
        for r in rows:
            if r['catalog_id'] not in workflow_updates:continue
            status,slugs,why,paths=workflow_updates[r['catalog_id']]
            r['pre_delivery_status']=r['status'];r['pre_delivery_mapping']=r.get('mapped_slugs',[])
            r['pre_delivery_boundary_or_gap']=r['boundary_or_gap'];r['pre_delivery_source_anchors']=r.get('source_anchors',[])
            r.update(status=status,mapped_slugs=slugs,boundary_or_gap=why,delivery_update=why,source_paths=paths,
                     delivery_verification=workflow_file.name,delivery_verified_on='2026-11-22')
            if r['catalog_id'] in ['LDDGO-01-014','LDDGO-01-062','LDDGO-02-013']:
                r['delivery_detail_source']='2026-11-22-sequence-frequency-codec-sources.json'
            r['source_anchors']=[]
            for source in paths:
                lines=(ROOT/source).read_text().splitlines()
                line=next((i for i,t in enumerate(lines,1) if 'slug:' in t or 'export function' in t or 'export async function' in t),1)
                r['source_anchors'].append({'path':source,'line':line,'excerpt':lines[line-1].strip()})
    rows.sort(key=lambda r:r['catalog_id'])
    summary={'catalog_rows':420,'status_counts':dict(Counter(r['status'] for r in rows)),
      'category_counts':dict(Counter(str(r['category_id']) for r in rows)),
      'new_peer_runtime_runs_in_merge':0,
      'boundary':'All official catalog rows have a semantic triage decision, not 420 runtime tests or verified parity.'}
    payload={'title':'LDDGO 420项完整语义对照','date':'2026-11-21','delivery_updated_on':'2026-11-22','summary':summary,'rows':rows}
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
