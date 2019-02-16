const urlParse = (req) => {
  const {method} = req;
  return new Promise((resolve, reject) => {
    if (method.toLowerCase() === 'post') {
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
      return;
    }
    resolve();
  });
};
module.exports = urlParse;
