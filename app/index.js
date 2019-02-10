// 主要核心逻辑入口
const fs = require('fs');
const path = require('path');
const staticFunc = require('./staticServer');

class App {
  initServer () {
    return (req, res) => {
      // 例： url = /css/reset.css,这里的'/'代表服务器根路径: localhost:3000
      const { url } = req;
      const body = staticFunc(url);
      res.end(body);
    };
  }
}

module.exports = App;
