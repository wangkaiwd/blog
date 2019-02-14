const apiServer = (url) => {
  const apiMap = {
    '/list.action': ['商品1', '商品2', '商品3'],
    '/user.action': ['用户1', '用户2', '用户3']
  };
  return apiMap[url];
};
module.exports = apiServer;
