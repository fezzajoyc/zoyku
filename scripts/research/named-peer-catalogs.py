#!/usr/bin/env python3
"""Read the three user-named public directories; record actual extraction scope."""
import hashlib,json,re
from datetime import datetime,timezone
from html.parser import HTMLParser
from pathlib import Path
from urllib.request import Request,urlopen
from urllib.parse import urljoin,urlsplit

ROOT=Path(__file__).resolve().parents[2]
class Links(HTMLParser):
    def __init__(self,base,kind):
        super().__init__(convert_charrefs=True);self.base=base;self.kind=kind
        self.current=None;self.rows=[]
    def handle_starttag(self,t,attrs):
        a=dict(attrs)
        if t=='a' and a.get('href'):
            u=urljoin(self.base,a['href'])
            if self.kind=='small' and 'data-tool-name' in a:
                self.rows.append({'title':a['data-tool-name'],'url':u})
            elif self.kind=='rapid' and urlsplit(u).hostname=='www.rapidtables.com' and re.search(r'/(tools|calc|convert|web|text|pdf)/',urlsplit(u).path):
                self.current={'title':'','url':u}
    def handle_data(self,s):
        if self.current:self.current['title']+=s
    def handle_endtag(self,t):
        if t=='a' and self.current:
            self.current['title']=' '.join(self.current['title'].split())
            if self.current['title']:self.rows.append(self.current)
            self.current=None

def collect():
    sources=[]
    for name,url,kind in [
        ('SmallSEOTools.net','https://www.smallseotools.net/','small'),
        ('RapidTables home','https://www.rapidtables.com/','rapid'),
        ('RapidTables tools','https://www.rapidtables.com/tools/index.html','rapid'),
        ('Omni sitemap','https://www.omnicalculator.com/sitemap.xml','omni'),
    ]:
        item={'name':name,'requested_url':url,'method':'official_public_GET','runtime_tested':False}
        try:
            with urlopen(Request(url,headers={'User-Agent':'ZoykuResearch/1.0'}),timeout=15) as r:
                body=r.read(4_000_000);item.update(status=r.status,final_url=r.geturl())
            html=body.decode('utf8',errors='replace')
            item.update(bytes=len(body),sha256=hashlib.sha256(body).hexdigest(),title=re.findall(r'<title[^>]*>(.*?)</title>',html,re.S)[:1])
            p=Links(item['final_url'],kind);p.feed(html)
            item['link_occurrences']=len(p.rows)
            item['entries']=list({row['url']:row for row in p.rows}.values())
            item['unique_urls']=len(item['entries'])
            if kind=='omni':item['sitemap_locations']=re.findall(r'<loc>([^<]+)</loc>',html)
        except Exception as e:item.update(status='unavailable',error=str(e),entries=[],unique_urls=0)
        sources.append(item)
    return {'observed_at_utc':datetime.now(timezone.utc).isoformat(),'scope':'Only the named homepage/index documents, not a complete RapidTables inventory; SmallSEOTools.net data-tool-name links. Omni access failure is retained, prior selected Omni evidence remains separate.','sources':sources,'same_input_runs':0}

if __name__=='__main__':
    out=ROOT/'docs/research/2026-11-21-named-peer-catalogs.json'
    data=collect();out.write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n')
    for s in data['sources']:print(s['name'],s['status'],s['unique_urls'])
