// 主要核心逻辑入口
const fs = require('fs');
const path = require('path');
const staticFunc = require('./staticServer');

class App {
  initServer () {
    return (req, res) => {
      const { url } = req;
      const body = staticFunc(url);
      res.end(body);
    };
  }
}

module.exports = App;
