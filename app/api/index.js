const apiServer = (req) => {
  const {method, url} = req;
  const apiMap = {
    '/list.action': ['商品1', '商品2', '商品3'],
    '/user.action': ['用户1', '用户2', '用户3']
  };
  if (method.toLowerCase() === 'post') {
    return new Promise((resolve, reject) => {
      let body = '';
      req.on('data', chunk => {
        body += chunk;
      });
      req.on('end', () => {
        resolve(JSON.parse(body));
      });
      req.on('error', err => {
        reject(err);
      });
    });
  }
  return Promise.resolve(apiMap[url]);
};
module.exports = apiServer;
