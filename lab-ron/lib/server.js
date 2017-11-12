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
        res.write(`<!DOCTYPE html>
                  <html>
                  <head> <title> cool beans </title> </head>
                  <body> <h1> hello world ${Math.random()}</h1> </body>
                  </html>`);
        res.end();
        return; 
      }


      if (req.method === 'GET' && req.url.pathname === '/cowsay' && req.url.query.text === true) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title> cowsay </title>  
          </head>
          <body>
            <h1> cowsay </h1>
            <pre></pre>
              <!-- cowsay.say({text: req.query.text}) -->
            </pre>
          </body>
        </html>`);

        console.log('req.url.pathname', req.url.query);
        res.end();
        return;
      }



      if (req.method === 'GET' && req.url.pathname === '/cowsay') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title> cowsay </title>  
          </head>
          <body>
           <header>
             <nav>
               <ul> 
                 <li><a href="/cowsay">cowsay</a></li>
               </ul>
             </nav>
           <header>
           <main>
             <!-- project description -->
           </main>
          </body>
        </html>`);

        // console.log('hello');

        res.end();
        return;
      }












      if (req.method === 'POST' && req.url.pathname === '/echo') {
        res.writeHead(200, {
          'Content-Type': 'application/json',
        });
        console.log(res);// what's in here?
        res.write(JSON.stringify(req.body));
        res.end();
        return; // break out of the (req, res) => {} callback
      }

      // 404 for any request to a non route
      // respond to the client
      res.writeHead(404, {
        'Content-Type': 'text/plain',
      });
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
  // register routes
});

// export interface
module.exports = {
  start: (port, callback) => app.listen(port, callback),
  stop: (callback) => app.close(callback),
};
