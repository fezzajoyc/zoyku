import { TextSequenceEngine } from "../_engines/text-engine-sequence";
import { textSequenceToolCopy } from "../_lib/string-sequence-copy";
import { defineTool } from "../_lib/types";
export default defineTool({slug:"text-sequence-generator",category:"text",icon:"hash",engine:{component:TextSequenceEngine},related:["line-number-generator","text-line-filter","random-number","text-sorter"],copy:textSequenceToolCopy()});
