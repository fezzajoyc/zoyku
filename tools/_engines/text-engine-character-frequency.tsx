"use client";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { CopyButton } from "@/components/client-ui";
import { ToolPanel } from "@/components/ui";
import { countCharacterFrequency, exportCharacterFrequency, type CharacterFrequencyOptions } from "../_lib/character-frequency";
import { FREQUENCY_MESSAGES, frequencyError } from "../_lib/character-frequency-copy";
import { parseLocaleNumber } from "../_lib/numparse";
const button="inline-flex min-h-11 items-center justify-center rounded-full border hairline px-4 py-2 text-sm font-medium hover:bg-[var(--color-surface)]";
const sample="AaA 中😀😀 İI é 👩‍💻\n";
export function CharacterFrequencyEngine(){
 const {locale}=useI18n();const c=FREQUENCY_MESSAGES[locale];const id=useId();const inputRef=useRef<HTMLTextAreaElement>(null);
 const [input,setInput]=useState(""),[ignore,setIgnore]=useState(false),[caseMode,setCaseMode]=useState<"preserve"|"lower">("preserve");
 const [sort,setSort]=useState<CharacterFrequencyOptions["sort"]>("count-desc"),[limit,setLimit]=useState("100");
 const [downloaded,setDownloaded]=useState<"csv"|"txt"|null>(null),[downloadError,setDownloadError]=useState(false);
 const urls=useRef(new Map<string,ReturnType<typeof setTimeout>>());const timer=useRef<ReturnType<typeof setTimeout>|null>(null);
 useEffect(()=>{const active=urls.current;return()=>{for(const [url,timeout]of active){clearTimeout(timeout);URL.revokeObjectURL(url);}active.clear();if(timer.current)clearTimeout(timer.current);};},[]);
 const result=useMemo(()=>countCharacterFrequency(input,{ignoreWhitespace:ignore,caseMode,sort,limit:parseLocaleNumber(limit)}),[input,ignore,caseMode,sort,limit]);
 const csv=useMemo(()=>exportCharacterFrequency(result,"csv"),[result]);
 function changed(){setDownloaded(null);setDownloadError(false);if(timer.current){clearTimeout(timer.current);timer.current=null;}}
 function download(format:"csv"|"txt"){
  const text=exportCharacterFrequency(result,format);if(!text)return;
  setDownloaded(null);setDownloadError(false);
  let url:string|undefined;let anchor:HTMLAnchorElement|undefined;
  try{url=URL.createObjectURL(new Blob([text],{type:format==="csv"?"text/csv;charset=utf-8":"text/plain;charset=utf-8"}));anchor=document.createElement("a");anchor.href=url;anchor.download=`character-frequency.${format}`;document.body.appendChild(anchor);anchor.click();anchor.remove();const active=url;urls.current.set(active,setTimeout(()=>{URL.revokeObjectURL(active);urls.current.delete(active);},5000));setDownloadError(false);setDownloaded(format);if(timer.current)clearTimeout(timer.current);timer.current=setTimeout(()=>setDownloaded(null),1600);}catch{if(url)URL.revokeObjectURL(url);setDownloadError(true);}finally{anchor?.remove();}
 }
 return <ToolPanel><div data-character-frequency-tool className="space-y-5">
  <p id={`${id}-rules`} className="text-sm leading-6 text-[var(--color-sub)]">{c.rules}</p>
  <div className="grid gap-4 sm:grid-cols-2"><div><label htmlFor={`${id}-case`} className="mb-1.5 block text-sm font-medium">{c.preserve}</label><select id={`${id}-case`} data-frequency-case className="field min-h-11 w-full" value={caseMode} onChange={event=>{changed();setCaseMode(event.target.value as "preserve"|"lower");}}><option value="preserve">{c.preserve}</option><option value="lower">{c.lower}</option></select></div>
   <div><label htmlFor={`${id}-sort`} className="mb-1.5 block text-sm font-medium">{c.sort}</label><select id={`${id}-sort`} data-frequency-sort className="field min-h-11 w-full" value={sort} onChange={event=>{changed();setSort(event.target.value as CharacterFrequencyOptions["sort"]);}}><option value="count-desc">{c.countDesc}</option><option value="count-asc">{c.countAsc}</option><option value="codepoint">{c.codepointSort}</option><option value="first">{c.firstSort}</option></select></div>
   <div><label htmlFor={`${id}-limit`} className="mb-1.5 block text-sm font-medium">{c.limit}</label><input id={`${id}-limit`} data-frequency-limit dir="ltr" className="field mono min-h-11 w-full" value={limit} onChange={event=>{changed();setLimit(event.target.value);}} inputMode="numeric" aria-describedby={`${id}-limits`} /></div>
   <label className="inline-flex min-h-11 items-center gap-2 text-sm"><input data-frequency-ignore type="checkbox" checked={ignore} onChange={event=>{changed();setIgnore(event.target.checked);}}/>{c.ignore}</label>
  </div>
  <div><label htmlFor={`${id}-input`} className="mb-1.5 block text-sm font-medium">{c.input}</label><textarea ref={inputRef} id={`${id}-input`} data-frequency-input dir="ltr" className="field mono w-full resize-y" rows={7} value={input} onChange={event=>{changed();setInput(event.target.value);}} spellCheck={false} autoCapitalize="off" autoCorrect="off" aria-invalid={Boolean(result.error)} aria-describedby={`${id}-rules ${id}-limits${result.error?` ${id}-error`:""}`}/></div>
  <div className="flex flex-wrap gap-2.5"><button type="button" className={button} onClick={()=>{changed();setInput(sample);inputRef.current?.focus();}}>{c.sample}</button><button type="button" className={button} onClick={()=>{changed();setInput("");inputRef.current?.focus();}}>{c.clear}</button></div>
  {result.error&&<p id={`${id}-error`} role="alert" className="rounded-xl error-bg px-4 py-3 text-sm text-[var(--color-bad)]">{frequencyError(locale,result.error)}</p>}
  {!result.error&&<div role="status" aria-atomic="true" className="space-y-1 text-sm text-[var(--color-sub)]"><p>{c.raw}: <bdi dir="ltr">{result.rawCodePoints}</bdi> · {c.total}: <bdi dir="ltr">{result.total}</bdi> · {c.distinct}: <bdi dir="ltr">{result.distinct}</bdi> · {c.shown}: <bdi dir="ltr">{result.shown}</bdi></p>{result.total===0&&<p>{result.rawCodePoints===0?c.empty:c.excluded}</p>}{result.truncated&&<p>{c.truncated}</p>}</div>}
  {result.rows.length>0&&<><div className="overflow-x-auto rounded-xl border hairline"><table className="w-full text-sm" data-frequency-table><thead><tr className="border-b hairline"><th scope="col" className="p-3 text-start">{c.character}</th><th scope="col" className="p-3 text-end">{c.count}</th><th scope="col" className="p-3 text-end">{c.share}</th></tr></thead><tbody>{result.rows.slice(0,result.shown).map(row=><tr key={row.codepoint} className="border-b hairline"><td className="p-3"><bdi dir="ltr" className="mono">{JSON.stringify(row.character)} · {row.codepoint}</bdi></td><td className="p-3 text-end"><bdi dir="ltr">{row.count}</bdi></td><td className="p-3 text-end"><bdi dir="ltr">{(row.share*100).toLocaleString(locale,{maximumFractionDigits:6})}%</bdi></td></tr>)}</tbody></table></div>
   <div className="flex flex-wrap gap-2.5"><CopyButton value={csv}/><button data-frequency-download="csv" type="button" className={button} onClick={()=>download("csv")}>{downloaded==="csv"?`✓ ${c.downloaded}`:c.csv}</button><button data-frequency-download="txt" type="button" className={button} onClick={()=>download("txt")}>{downloaded==="txt"?`✓ ${c.downloaded}`:c.txt}</button></div></>}
  {downloadError&&<p role="alert" className="text-sm text-[var(--color-bad)]">{c.downloadError}</p>}
  <p id={`${id}-limits`} className="text-sm leading-6 text-[var(--color-sub)]">{c.limits}</p>
 </div></ToolPanel>;
}
