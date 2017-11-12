'use strict';

let apiURL = `http://localhost:3000`;

const superagent = require('superagent');
describe('POST /api/cowsay', () => {
  test('200 OK returns cowsay message', () => {
    return superagent.post(`${apiURL}/api/cowsay`)
      .send({
        text: 'hello world',
      })
      .then(res => {
        console.log('HELLO WORLD', res.body);
        expect(res.status).toEqual(200);
        expect(res.body).toEqual({ message: ` _____________\n< hello world >\n -------------\n        \\   ^__^\n         \\  (oo)\\_______\n            (__)\\       )\\/\\\n                ||----w |\n                ||     ||` }
        );
      });
  });

  test('400 Bad Request', () => {
    return superagent.post(`${apiURL}/api/cowsay`)
      .set({ 'Content-Type': 'application/json' })
      .send('{')
      .then(Promise.reject)
      .catch(res => {
        expect(res.status).toEqual(400);
        expect(res.response.text).toEqual('bad request');
      });
  });

  test('404 Not found', () => {
    let tempPath = 'lulwat';
    return superagent.get(`${apiURL}/${tempPath}`)
      .then(Promise.reject)
      .catch(res => {
        expect(res.status).toEqual(404);
        expect(res.response.text).toEqual(`resource /${tempPath} not found!`);
      });
  });

});