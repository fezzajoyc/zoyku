import { CharacterFrequencyEngine } from "../_engines/text-engine-character-frequency";
import { characterFrequencyToolCopy } from "../_lib/character-frequency-copy";
import { defineTool } from "../_lib/types";
export default defineTool({slug:"character-frequency-counter",category:"text",icon:"text",engine:{component:CharacterFrequencyEngine},related:["character-counter","word-counter","keyword-density-checker","text-line-filter"],copy:characterFrequencyToolCopy()});
