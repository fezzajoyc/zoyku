/** Parse declared JSON-LD scripts; prose mentioning a schema type is not schema. */
export function readJsonLd(html) {
  const nodes = [];
  const errors = [];
  function collect(value) {
    if (Array.isArray(value)) { for (const item of value) collect(item); return; }
    if (!value || typeof value !== 'object') { errors.push({kind:'invalid',message:'schema node is not an object'}); return; }
    const type = value['@type'];
    const validType = typeof type === 'string' && type.length > 0 || Array.isArray(type) && type.length > 0 && type.every(t=>typeof t==='string' && t.length>0);
    if (validType) nodes.push(value);
    else if (!Array.isArray(value['@graph'])) errors.push({kind:'invalid',message:'schema node has no valid @type or @graph'});
    if (Array.isArray(value['@graph'])) collect(value['@graph']);
  }
  const pattern = /<script\b(?=[^>]*\btype\s*=\s*["']application\/ld\+json["'])[^>]*>([\s\S]*?)<\/script>/gi;
  for (const match of html.matchAll(pattern)) {
    try { collect(JSON.parse(match[1])); }
    catch(error) { errors.push({kind:'parse',message:String(error).slice(0,160)}); }
  }
  return {nodes,errors};
}
export function hasSchemaType(nodes, type) {
  return nodes.some(node=>node['@type'] === type || Array.isArray(node['@type']) && node['@type'].includes(type));
}
