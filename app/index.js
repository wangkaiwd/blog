// 主要核心逻辑入口
const fs = require('fs');
const path = require('path');
const staticServer = require('./staticServer');
const apiServer = require('./api');
const urlParser = require('./urlParser');

/**
 * 1. 通过urlParse对请求方式进行处理
 * 2. 通过staticServer处理静态资源
 * 3. 通过apiServer处理ajax请求
 */
class App {
  initServer () {
    return (req, res) => {
      urlParser(req).then(
        params => {
          return apiServer(req, params);
        }
      ).then(result => {
        if (result) return result;
        return staticServer(req.url);
      }).then(data => {
        // api
        if (!Buffer.isBuffer(data)) {
          res.writeHead(200, 'resolve OK', {
            'Content-Type': 'application/json'
          });
          res.write(JSON.stringify(data));
        } else { // 静态文件加载
          res.write(data);
        }
        res.end();
      });

      // 例： url = /css/reset.css,这里的'/'代表服务器根路径: localhost:3000
      // const {url} = req;
      // if (path.extname(url) === '.action') {
      //   apiServer(req).then(data => {
      //     data = JSON.stringify(data);
      //     res.setHeader('Content-Type', 'application/json');
      //     res.writeHead(200, 'resolve OK');
      //     res.end(data);
      //   });
      // } else {
      //   staticServer(url).then(
      //     body => {
      //       res.writeHead(200, 'resolve OK');
      //       res.end(body);
      //     }
      //   );
      // }
    };
  }
}

module.exports = App;
