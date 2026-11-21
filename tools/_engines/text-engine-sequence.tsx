"use client";
import { useId, useRef, useState, type FormEvent } from "react";
import { useI18n } from "@/components/i18n-provider";
import { CopyButton } from "@/components/client-ui";
import { ToolPanel } from "@/components/ui";
import { generateTextSequence, type TextSequenceResult } from "../_lib/string-sequence";
import { SEQUENCE_MESSAGES, sequenceError } from "../_lib/string-sequence-copy";
import { parseLocaleNumber } from "../_lib/numparse";
const button="inline-flex min-h-11 items-center justify-center rounded-full border hairline px-4 py-2 text-sm font-medium hover:shadow-sm";
export function TextSequenceEngine(){
 const {locale}=useI18n();const c=SEQUENCE_MESSAGES[locale];const id=useId();const firstRef=useRef<HTMLInputElement>(null);
 const [start,setStart]=useState("1"),[step,setStep]=useState("1"),[count,setCount]=useState("10"),[width,setWidth]=useState("1");
 const [prefix,setPrefix]=useState(""),[suffix,setSuffix]=useState(""),[separator,setSeparator]=useState("\n");
 const [result,setResult]=useState<TextSequenceResult|null>(null);
 const changed=()=>setResult(null);
 function generate(event:FormEvent){event.preventDefault();setResult(generateTextSequence({start,step,count:parseLocaleNumber(count),integerWidth:parseLocaleNumber(width),prefix,suffix,separator}));}
 const field=(key:string,label:string,value:string,set:(value:string)=>void)=><div><label className="mb-1.5 block text-sm font-medium" htmlFor={`${id}-${key}`}>{label}</label><input ref={key==="start"?firstRef:undefined} id={`${id}-${key}`} data-sequence-field={key} type="text" dir="ltr" className="field mono min-h-11 w-full" value={value} onChange={event=>{changed();set(event.target.value);}} spellCheck={false} autoComplete="off" aria-describedby={`${id}-rules ${id}-limits${result?.error?` ${id}-error`:""}`} /></div>;
 return <ToolPanel><div data-text-sequence-tool className="space-y-5">
  <p id={`${id}-rules`} className="text-sm leading-6 text-[var(--color-sub)]">{c.rules}</p>
  <form onSubmit={generate} noValidate className="space-y-4"><div className="grid gap-4 sm:grid-cols-2">
   {field("start",c.start,start,setStart)}{field("step",c.step,step,setStep)}{field("count",c.count,count,setCount)}{field("width",c.width,width,setWidth)}{field("prefix",c.prefix,prefix,setPrefix)}{field("suffix",c.suffix,suffix,setSuffix)}
  </div><div><label className="mb-1.5 block text-sm font-medium" htmlFor={`${id}-separator`}>{c.separator}</label><textarea id={`${id}-separator`} data-sequence-field="separator" dir="ltr" rows={2} className="field mono w-full resize-y" value={separator} onChange={event=>{changed();setSeparator(event.target.value);}} spellCheck={false}/></div>
  <div className="flex flex-wrap gap-2.5"><button className={`${button} bg-[var(--color-action-bg)] text-white`} type="submit">{c.generate}</button><button className={button} type="button" onClick={()=>{setStart("0.1");setStep("0.2");setCount("5");setWidth("3");setPrefix("ID-");setSuffix("");setSeparator("\n");setResult(generateTextSequence({start:"0.1",step:"0.2",count:5,integerWidth:3,prefix:"ID-"}));}}>{c.sample}</button><button className={button} type="button" onClick={()=>{setStart("");setStep("");setCount("10");setWidth("1");setPrefix("");setSuffix("");setSeparator("\n");setResult(null);firstRef.current?.focus();}}>{c.clear}</button></div></form>
  {result?.error&&<p id={`${id}-error`} role="alert" className="rounded-xl error-bg px-4 py-3 text-sm text-[var(--color-bad)]">{sequenceError(locale,result.error)}</p>}
  <p role="status" aria-atomic="true" className="text-sm text-[var(--color-sub)]">{result&&!result.error?<>{c.items}: <bdi dir="ltr">{result.count}</bdi> · {c.first}: <bdi dir="ltr" className="mono break-all">{result.first}</bdi> · {c.last}: <bdi dir="ltr" className="mono break-all">{result.last}</bdi></>:!result?c.empty:""}</p>
  <div><label htmlFor={`${id}-output`} className="mb-1.5 block text-sm font-medium">{c.output}</label><textarea id={`${id}-output`} data-sequence-output dir="ltr" rows={8} className="field mono w-full resize-y whitespace-pre" readOnly value={result?.out??""}/></div>
  {result?.out&&<CopyButton value={result.out}/>}
  <p id={`${id}-limits`} className="text-sm leading-6 text-[var(--color-sub)]">{c.limits}</p>
 </div></ToolPanel>;
}
