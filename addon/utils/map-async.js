export default  async function mapAsync(iterable, asyncCallback){
  return await Promise.all(iterable.map(i => asyncCallback(i)) || []);
}
