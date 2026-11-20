import { describe, expect, it } from 'vitest';
import { toolCopy } from './tool-copy';
import { TOOL_BY_SLUG } from '@/tools/registry';

describe('authored tool FAQ content', () => {
  it('does not add generic lossless claims to rasterizing PDF compression', () => {
    const tool = TOOL_BY_SLUG.get('compress-pdf')!;
    const copy = toolCopy(tool, 'en');
    expect(copy.faqs).toEqual(tool.copy.en.faqs);
    expect(copy.faqs.map(f=>f.a).join(' ')).not.toContain('not re-encoded page by page');
  });
  it('does not append generated-secret advice to a DNS lookup', () => {
    const tool = TOOL_BY_SLUG.get('dns-lookup')!;
    expect(toolCopy(tool,'en').faqs).toEqual(tool.copy.en.faqs);
  });
});
