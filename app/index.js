// 主要核心逻辑入口
const fs = require('fs');

class App {
  initServer () {
    return (req, res) => {
      fs.readFile('./package.json', 'utf8', (err, data) => {
        if (err) throw err;
        res.write(data);
        res.end();
      });
    };
  }
}

module.exports = App;
