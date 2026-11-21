import { describe, expect, it } from "vitest";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import { createServer } from "@/mcp/server";

async function connect() {
  const c = new Client({ name: "text-uuid-file-test", version: "1" });
  const s = createServer();
  const [a, b] = InMemoryTransport.createLinkedPair();
  await Promise.all([c.connect(a), s.connect(b)]);
  return c;
}
const data = (r: Awaited<ReturnType<Client["callTool"]>>) => JSON.parse((r.content as {text: string}[])[0].text);

describe("new text UUID and file protocols", () => {
  it("filters literal lines, code point lengths and delimiter columns", async () => {
    const c = await connect();
    try {
      const literal = await c.callTool({name:"filter_text_lines",arguments:{input:" Ada \nGRACE\nada",mode:"contains",query:"ada",action:"include",case_sensitive:false}});
      expect(literal.isError).not.toBe(true);
      expect(data(literal)).toMatchObject({out:" Ada \nada",inputLines:3,outputLines:2});
      const length = await c.callTool({name:"filter_text_lines",arguments:{input:"😀\na\nab\n",mode:"length",min:1,max:1}});
      expect(data(length)).toMatchObject({out:"😀\na",outputLines:2});
      const column = await c.callTool({name:"filter_text_lines",arguments:{input:" a |001\nb",mode:"column",delimiter:"|",column:2,missing_column:"empty"}});
      expect(data(column)).toMatchObject({out:"001\n",outputLines:2});
      const invalid = await c.callTool({name:"filter_text_lines",arguments:{input:"a\nb",mode:"range",from:1,to:3}});
      expect(invalid.isError).toBe(true);
    } finally {await c.close();}
  });
  it("inspects UUID formats without confusing syntax with RFC version and variant", async () => {
    const c = await connect();
    try {
      const r = await c.callTool({name:"inspect_uuid",arguments:{input:"URN:UUID:F81D4FAE-7DEC-11D0-A765-00A0C91E6BF6"}});
      expect(r.isError).not.toBe(true);
      expect(data(r)).toMatchObject({ok:true,canonical:"f81d4fae-7dec-11d0-a765-00a0c91e6bf6",version:1,variant:"rfc",isRfc9562:true});
      const roundtrip = await c.callTool({name:"inspect_uuid",arguments:{input:data(r).base64}});
      expect(data(roundtrip).canonical).toBe(data(r).canonical);
      const unknown = await c.callTool({name:"inspect_uuid",arguments:{input:"f81d4fae-7dec-91d0-a765-00a0c91e6bf6"}});
      expect(unknown.isError).not.toBe(true);
      expect(data(unknown)).toMatchObject({ok:true,isRfc9562:false,versionSupported:false});
      const bad = await c.callTool({name:"inspect_uuid",arguments:{input:"not a uuid"}});
      expect(bad.isError).toBe(true);
    } finally {await c.close();}
  });
  it("plans exact binary split offsets with bounded size and part counts", async () => {
    const c = await connect();
    try {
      const r = await c.callTool({name:"plan_file_split",arguments:{size:10,part_bytes:4}});
      expect(r.isError).not.toBe(true);
      expect(data(r).parts).toEqual([
        {index:1,start:0,end:4,size:4},{index:2,start:4,end:8,size:4},{index:3,start:8,end:10,size:2},
      ]);
      const balanced = await c.callTool({name:"plan_file_split",arguments:{size:10,part_count:3}});
      expect(data(balanced).parts.map((p:{size:number})=>p.size)).toEqual([4,3,3]);
      const invalid = await c.callTool({name:"plan_file_split",arguments:{size:10,part_bytes:0}});
      expect(invalid.isError).toBe(true);
      const both = await c.callTool({name:"plan_file_split",arguments:{size:10,part_bytes:2,part_count:3}});
      expect(both.isError).toBe(true);
    } finally {await c.close();}
  });
});
