const http = require('http');
const App = require('./app');
const app = new App();
const PORT = 3000;
http.createServer(app.initServer()).listen(PORT, err => {
  if (err) throw err;
  console.log(`server listening on port ${PORT}`);
});
