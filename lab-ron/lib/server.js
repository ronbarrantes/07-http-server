// node dependencies
const http = require('http');
const requestParser = require('./request-parser.js');
const cowsay = require('cowsay');

const app = http.createServer((req, res) => {

  requestParser(req)
    .then(req => {
      if (req.method === 'GET' && req.url.pathname === '/') {
        res.writeHead(200, {
          'Content-Type': 'text/html',
        });
        res.write(`
        <!DOCTYPE html><html>
        <head><title>Welcome To Cowsay</title></head><body><header>
        <h1>CowSay</h1>
        <nav><ul>
        <li><a href="/">home</a></li>
        <li><a href="/cowsay">cowsay</a></li>
        </ul></nav></header><main>
        <p>Welcome to cowsay, navigate click on the </p></main></body></html>
        `);
        res.end();
        return;
      }
      if (req.method === 'GET' &&
        req.url.pathname === '/cowsay') {

        let message = '';
        if (req.url.query.text)
          message = req.url.query.text;
        else
          message = 'I need something to say!!';
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title> cowsay </title>  
          </head>
          <body>
            <h1> cowsay </h1>
            <p>Make the cow say</p>
            <pre>
               ${cowsay.say({ text: message })} 
            </pre>
            <p>at the end of the URL type <b>/cowsay?text=<i>your message here</i></b></p>
          </body>
        </html>`);

        console.log('req.url.pathname', req.url.query);
        res.end();
        return;
      }
      if (req.method === 'POST' && req.url.pathname === '/api/cowsay') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify({ message: cowsay.say(req.body) }));
        res.end();
        return;
      }
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.write(`resource ${req.url.pathname} not found!`);
      console.log(res); // testing
      res.end();
    })
    .catch(err => {
      console.log(err);
      res.writeHead(400, {
        'Content-Type': 'text/plain',
      });
      res.write('bad request');
      res.end();
    });
});

// export interface
module.exports = {
  start: (port, callback) => app.listen(port, callback),
  stop: (callback) => app.close(callback),
};
