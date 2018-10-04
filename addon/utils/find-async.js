/**
 * Find with async predicate callback
 * @method findAsync
 * @param {Array} [element, ...];
 * @param {Function} async function(element){ return {Boolean}}
 * @return {Object} found element else undefinded
 */
export default async function findAsync(iterable, asyncPredicate){
  let results = await Promise.all(iterable.map(i => asyncPredicate(i)));
  let index = results.findIndex(r => r);
  return iterable[index];
}
