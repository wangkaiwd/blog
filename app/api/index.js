const apiServer = (req, params) => {
  const {method, url} = req;
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
    return Promise.resolve(params);
  }
  // 如果apiMap里没有内容，说明是并不是ajax请求，而是静态资源请求
  return Promise.resolve(apiMap[url]);
};
module.exports = apiServer;
