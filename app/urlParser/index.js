const urlParse = (ctx) => {
  const {req, reqCtx} = ctx;
  return new Promise((resolve, reject) => {
    if (req.method.toLowerCase() === 'post') {
      req.on('data', chunk => {
        reqCtx.body += chunk;
      });
      req.on('end', () => {
        reqCtx.body = JSON.parse(reqCtx.body);
        resolve();
      });
      req.on('error', err => {
        reqCtx.body = err;
        reject();
      });
      return;
    }
    resolve();
  });
};
module.exports = urlParse;
