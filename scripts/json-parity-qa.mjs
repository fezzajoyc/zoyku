import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {isAbsolute,join,resolve} from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
import {createRequire} from 'node:module';

/**
 * Run against an existing Playwright Browser, or invoke this module as a CLI.
 * The browser and axe runtimes are optional QA dependencies, never app bundles.
 * CLI configuration: ZOYKU_BASE_URL, ZOYKU_JSON_REPORT_DIR, ZOYKU_AXE_PATH,
 * ZOYKU_PLAYWRIGHT_MODULE (package name or local module path), ZOYKU_BROWSER_CHANNEL.
 * Without paths, the CLI resolves installed playwright and axe-core packages.
 * Includes 15-locale results, literal preservation, stable sorting, exact empty
 * states, all four resource rejections, and light/manual-dark axe audits.
 * Incomplete accessibility results are reported separately, never as passes.
 */
export default async function jsonParityQA(browser, {
  baseURL='http://127.0.0.1:3480',
  axePath,
  reportDir=join(tmpdir(),'zoyku-json-capability'),
}={}) {
  if(!axePath)throw new Error('Provide axePath for the required accessibility audits.');
  await mkdir(reportDir,{recursive:true});
  const context=await browser.newContext({viewport:{width:1440,height:1000},colorScheme:'light'});
  const page=await context.newPage();
  const checks=[];const audits=[];const consoleErrors=[];
  page.on('pageerror',e=>consoleErrors.push(e.message));
  const visit=(locale,slug)=>page.goto(`${baseURL}/${locale}/tools/${slug}`);
  const panel=page.locator('.apple-card').first();
  const input=panel.locator('textarea').nth(0);const output=panel.locator('textarea').nth(1);
  const check=async(name,run)=>{try{checks.push({name,passed:true,...await run()});}catch(e){checks.push({name,passed:false,error:e.message});}console.log(JSON.stringify({name,passed:checks.at(-1).passed}));};
  const waitResult=()=>page.waitForFunction(()=>document.querySelectorAll('.apple-card textarea')[1]?.value.length>0);
  const source=String.raw`{"2":"b","1":"a","id":9007199254740993,"exp":1e+09,"neg":-0,"escaped":"\u4F60\u597D","x":1,"x":2,"\u0061":0,"a":1,"space":"hi there"}`;
  for(const slug of ['json-formatter','json-minifier']){
   await visit('en',slug);
   await check(`${slug} initial exact empty input is neutral`,async()=>{
    assert.equal(await input.inputValue(),'');assert.equal(await output.inputValue(),'');assert.equal(await panel.getByRole('alert').count(),0);assert.equal(await input.getAttribute('aria-invalid'),'false');return {alerts:0};
   });
   await check(`${slug} malformed and whitespace input recover to valid output`,async()=>{
    for(const invalid of ['[',' ']){await input.fill(invalid);await panel.getByRole('alert').waitFor();assert.equal(await output.inputValue(),'');}
    await input.fill('{"ok":true}');await waitResult();assert.equal(await panel.getByRole('alert').count(),0);return {nonemptyWhitespaceStillInvalid:true,recovered:true};
   });
   await check(`${slug} Clear restores neutral empty state`,async()=>{
    await panel.getByRole('button',{name:'Clear',exact:true}).click();assert.equal(await input.inputValue(),'');assert.equal(await output.inputValue(),'');assert.equal(await panel.getByRole('alert').count(),0);
    await input.fill('[');await panel.getByRole('alert').waitFor();await panel.getByRole('button',{name:'Clear',exact:true}).click();assert.equal(await panel.getByRole('alert').count(),0);return {clearedAfterSuccess:true,clearedAfterError:true};
   });
  }
  await visit('en','json-formatter');
  await check('formatter preserves literal spelling duplicates and original order',async()=>{
   await input.fill(source);await waitResult();const text=await output.inputValue();
   for(const literal of ['9007199254740993','1e+09','-0',String.raw`\u4F60\u597D`,String.raw`"\u0061"`])assert.ok(text.includes(literal),literal);
   assert.ok(text.indexOf('"2"')<text.indexOf('"1"'));assert.match(text,/"x": 1,[\s\S]*"x": 2/);assert.ok(text.includes('hi there'));
   assert.equal(await panel.getByRole('button',{name:'2 spaces',exact:true}).getAttribute('aria-pressed'),'true');
   return {input:source,output:text};
  });
  await check('explicit stable sorting retains equivalent escaped duplicate keys',async()=>{
   const sort=panel.getByRole('button',{name:'Sort keys A→Z',exact:true});assert.equal(await sort.getAttribute('aria-pressed'),'false');
   await sort.click();await page.waitForFunction(()=>document.querySelectorAll('.apple-card textarea')[1]?.value.startsWith('{\n  "1"'));
   const text=await output.inputValue();assert.ok(text.indexOf('"1"')<text.indexOf('"2"'));
   assert.ok(text.indexOf(String.raw`"\u0061": 0`)<text.indexOf('"a": 1'));assert.match(text,/"x": 1,[\s\S]*"x": 2/);
   assert.ok(text.includes('9007199254740993'));assert.equal(await sort.getAttribute('aria-pressed'),'true');
   await panel.getByRole('button',{name:'4 spaces',exact:true}).click();assert.equal(await panel.getByRole('button',{name:'4 spaces',exact:true}).getAttribute('aria-pressed'),'true');
   return {output:text,stableEquivalentKeys:true};
  });
  await visit('en','json-minifier');
  await check('minifier preserves the full compact token stream',async()=>{
   await input.fill(source);await waitResult();assert.equal(await output.inputValue(),source);return {input:source,output:await output.inputValue()};
  });
  for(const slug of ['json-formatter','json-minifier'])await check(`${slug} rejects over-limit input locally without truncating it`,async()=>{
   await visit('zh',slug);const text='"'+'a'.repeat(999999)+'"';await input.fill(text);
   await panel.getByRole('alert').filter({hasText:'JSON 输入超过 1,000,000'}).waitFor();
   assert.equal((await input.inputValue()).length,1000001);assert.equal(await output.inputValue(),'');assert.equal(await input.getAttribute('aria-invalid'),'true');
   const error=await panel.getByRole('alert').innerText();assert.ok(!error.includes('JSON input exceeds'));return {inputLength:1000001,retainedInputLength:(await input.inputValue()).length,error,partialOutput:false};
  });
  const rejectionCases=[
   {kind:'depth',input:'['.repeat(201)+'0'+']'.repeat(201),error:'JSON 嵌套深度超过 200'},
   {kind:'values',input:'['+'0,'.repeat(99999)+'0]',error:'JSON 值数量超过 100,000'},
   {kind:'output',input:'['.repeat(200)+'0,'.repeat(5999)+'0'+']'.repeat(200),error:'JSON 输出超过 4,000,000'},
  ];
  for(const item of rejectionCases)await check(`formatter localizes ${item.kind} rejection`,async()=>{
   await visit('zh','json-formatter');if(item.kind==='output')await panel.getByRole('button',{name:'4 空格',exact:true}).click();await input.fill(item.input);
   await panel.getByRole('alert').filter({hasText:item.error}).waitFor();assert.equal(await output.inputValue(),'');
   return {inputLength:item.input.length,error:await panel.getByRole('alert').innerText(),partialOutput:false};
  });
  const locales=['en','zh','ja','es','pt','fr','de','ru','it','tr','ko','ar','hi','id','vi'];
  for(const locale of locales)for(const slug of ['json-formatter','json-minifier'])await check(`localized limits and result ${locale}/${slug}`,async()=>{
   await visit(locale,slug);const note=panel.locator('p[id]').first();const content=await note.innerText();
   for(const s of ['1,000,000','4,000,000','200','100,000','UTF-16'])assert.ok(content.includes(s),s);
   assert.equal(await input.getAttribute('aria-describedby'),await note.getAttribute('id'));
   await input.fill(source);await waitResult();assert.ok((await output.inputValue()).includes('9007199254740993'));
   return {h1:await page.getByRole('heading',{level:1}).innerText(),resourceNote:content};
  });
  const auditPage=async(p,name)=>{
   await p.addScriptTag({path:axePath});
   const audit=await p.evaluate(async()=>{const r=await window.axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa','wcag22aa','best-practice']}});return {version:r.testEngine.version,violations:r.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>({target:n.target,failureSummary:n.failureSummary}))})),incomplete:r.incomplete.map(v=>({id:v.id,nodes:v.nodes.length,targets:v.nodes.map(n=>n.target)}))};});
   audits.push({name,...audit});assert.deepEqual(audit.violations,[]);return audit;
  };
  for(const manualDark of [false,true]){
   const c=await browser.newContext({viewport:{width:1440,height:1000},colorScheme:'light'});
   if(manualDark)await c.addInitScript(()=>localStorage.setItem('theme','dark'));
   const p=await c.newPage();p.on('pageerror',e=>consoleErrors.push(e.message));const label=manualDark?'OS-light manual-dark':'OS-light default-light';
   await p.goto(baseURL+'/en/tools/json-formatter');const box=p.locator('.apple-card').first();const fields=box.locator('textarea');
   await fields.nth(0).fill(source);await p.waitForFunction(()=>document.querySelectorAll('.apple-card textarea')[1]?.value.length>0);
   await check(`${label} success-state accessibility`,async()=>{
    assert.equal(await p.locator('html').evaluate(e=>e.classList.contains('dark')),manualDark);const audit=await auditPage(p,label+' success');
    return {themeClassDark:manualDark,violations:audit.violations.length,incomplete:audit.incomplete};
   });
   await fields.nth(0).fill('['.repeat(201)+'0'+']'.repeat(201));await box.getByRole('alert').filter({hasText:'JSON nesting depth exceeds'}).waitFor();
   await check(`${label} error-state accessibility`,async()=>{
    const audit=await auditPage(p,label+' error');await p.screenshot({path:`${reportDir}/${manualDark?'manual-dark':'default-light'}-error.png`});
    const colors=await box.getByRole('alert').evaluate(e=>({color:getComputedStyle(e).color,background:getComputedStyle(e).backgroundColor}));
    return {themeClassDark:manualDark,violations:audit.violations.length,incomplete:audit.incomplete,colors};
   });
   for(const slug of ['json-formatter','json-minifier']){
    await p.goto(baseURL+'/en/tools/'+slug);const emptyBox=p.locator('.apple-card').first();
    await emptyBox.locator('textarea').nth(0).fill('[');await emptyBox.getByRole('alert').waitFor();await emptyBox.getByRole('button',{name:'Clear',exact:true}).click();
    await check(`${label} ${slug} cleared-empty sample accessibility`,async()=>{
     assert.equal(await emptyBox.getByRole('alert').count(),0);const sample=emptyBox.getByRole('button',{name:'Try an example',exact:true});assert.equal(await sample.isVisible(),true);
     await p.screenshot({path:`${reportDir}/${manualDark?'manual-dark':'default-light'}-${slug}-empty.png`});
     const colors=await sample.evaluate(e=>({color:getComputedStyle(e).color,background:getComputedStyle(e).backgroundColor}));
     const audit=await auditPage(p,label+' '+slug+' cleared empty');await sample.click();await p.waitForFunction(()=>document.querySelectorAll('.apple-card textarea')[1]?.value.length>0);
     return {violations:audit.violations.length,incomplete:audit.incomplete,colors,sampleActionWorks:true};
    });
   }
   await c.close();
  }
  const report={date:'2026-11-20',baseURL,browser:await browser.version(),passed:checks.filter(r=>r.passed).length,failed:checks.filter(r=>!r.passed).length,checks,audits,consoleErrors,limits:{input:1000000,output:4000000,depth:200,values:100000,units:'UTF-16 code units; values include containers and exclude keys'},limitations:['axe incomplete results require human review and are not counted as passes.','Manual-dark cases use OS light, matching the previously failing theme combination.','These UI checks do not replace the parser regression suite or test every browser and device.']};
  await writeFile(reportDir+'/browser-report.json',JSON.stringify(report,null,2));await context.close();
  console.log(JSON.stringify({passed:report.passed,failed:report.failed,failedChecks:checks.filter(c=>!c.passed),audits:audits.map(a=>({name:a.name,violations:a.violations.length,incomplete:a.incomplete})),consoleErrors,reportPath:reportDir+'/browser-report.json'},null,2));
  return report;

}

if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url)){
  const specifier=process.env.ZOYKU_PLAYWRIGHT_MODULE||'playwright';
  const modulePath=isAbsolute(specifier)||specifier.startsWith('.')?pathToFileURL(resolve(specifier)).href:specifier;
  const {chromium}=await import(modulePath);
  const require=createRequire(import.meta.url);
  const axePath=process.env.ZOYKU_AXE_PATH||require.resolve('axe-core/axe.min.js');
  const browser=await chromium.launch({channel:process.env.ZOYKU_BROWSER_CHANNEL||'chrome',headless:true});
  try{
    const report=await jsonParityQA(browser,{
      baseURL:process.env.ZOYKU_BASE_URL||'http://127.0.0.1:3480',
      reportDir:process.env.ZOYKU_JSON_REPORT_DIR||join(tmpdir(),'zoyku-json-capability'),
      axePath,
    });
    if(report.failed||report.consoleErrors.length)process.exitCode=1;
  }finally{await browser.close();}
}
