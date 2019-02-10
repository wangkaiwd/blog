// 主要核心逻辑入口
const fs = require('fs');

class App {
  initServer () {
    return (req, res) => {
      const { url } = req;
      const staticFunc = (url) => {
        if (url === '/favicon.ico') return;
        if (url === '/') {
          url = '/index.html';
        }
        fs.readFile(`./public${url}`, 'utf8', (err, data) => {
          if (err) throw err;
          res.end(data);
        });
      };
      staticFunc(url);
    };
  }
}

module.exports = App;
