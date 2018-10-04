/**
 * Flattens tree, depth first with async callChilds on node.
 * @method flattenAsync
 * @param {Array} [node, ...];
 * @param {Function} async function(node){ return []}
 * @return {Array} flattened tree
 */
export default async function flattenAsync(nodes, callChilds){
  if(nodes.length == 0){
    return [];
  }
  let results = [ nodes[0] ];
  let childs =  await callChilds(nodes[0]);
  let childNodes = (await flattenAsync( childs, callChilds));
  let remaingNodes = (await flattenAsync( nodes.slice(1), callChilds));

  results = [...results, ...childNodes];
  results = [...results, ...remaingNodes];

  return results;
}
