// SSE Server created by previous group but wasn't being used in any of the tests so they've been commented out in case a future group wants to use them

const http = require('http');

http.createServer((request, response) => {
  // these headers tell our 'browser' to keep the connection open
  response.writeHead(200, {
    'Connection': 'keep-alive',
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Access-Control-Allow-Origin': '*',
  });
  
  sendSSEs(response); 
  

}).listen(5001, () => console.log('fakeSSEServer is listening on port 5001'));

// this function sends messages every 3 seconds 
const sendSSEs = (response, id = 0, timeout) => {
  response.write(
    `id: ${id}\ndata: This is event ${id}\n\n`
  );
  console.log(id, 'just sent something')
  id++; 

  if (id < 6) {
    timeout = setTimeout(() => {
      sendSSEs(response, id, timeout);
    }, 3000)
  };
} 