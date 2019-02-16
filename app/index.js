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
      // 通过一个对象来整合req与res
      const ctx = {
        req,
        reqCtx: {body: '', query: {}},
        res,
        resCtx: {body: '', headers: {}}
      };
      urlParser(ctx).then(() => {
        return apiServer(ctx);
      }).then(() => {
        const {query, body} = ctx.reqCtx;
        if (Object.keys(query).length === 0 && body === '') {
          return staticServer(ctx);
        }
      }).then(() => {
        const {resCtx, reqCtx} = ctx;
        // 静态资源
        resCtx.body = reqCtx.body;
        if (!Buffer.isBuffer(reqCtx.body)) {
          resCtx.body = reqCtx.body ? JSON.stringify(reqCtx.body) : JSON.stringify(reqCtx.query);
          resCtx.headers = {'Content-Type': 'application/json'};
        }
        res.writeHead(200, 'resolve OK', resCtx.headers);
        res.write(resCtx.body);
        res.end();
      });

      // urlParser(req).then(
      //   params => {
      //     return apiServer(req, params);
      //   }
      // ).then(result => {
      //   if (result) return result;
      //   return staticServer(req);
      // }).then(data => {
      //   // api
      //   if (!Buffer.isBuffer(data)) {
      //     res.writeHead(200, 'resolve OK', {
      //       'Content-Type': 'application/json'
      //     });
      //     res.write(JSON.stringify(data));
      //   } else { // 静态文件加载
      //     res.write(data);
      //   }
      //   res.end();
      // });

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
