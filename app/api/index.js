const apiServer = (ctx) => {
  const {method, url} = ctx.req;
  const {reqCtx} = ctx;
  const apiMap = {
    '/list.action': ['商品1', '商品2', '商品3'],
    '/user.action': ['用户1', '用户2', '用户3']
  };
  // return new Promise((resolve) => {
  //   if (method.toLowerCase() === 'post') {
  //     return resolve(params);
  //   }
  //   resolve(apiMap[url]);
  // });
  if (method.toLowerCase() === 'post') {
    return Promise.resolve();
  }
  // 如果apiMap里没有内容，说明是并不是ajax请求，而是静态资源请求
  reqCtx.query = apiMap[url] || {};
  return Promise.resolve();
};
module.exports = apiServer;
