const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 7070;
const HTML_PATH = path.join(__dirname, 'public', 'index.html');

// SSE clients waiting for reload events
const clients = new Set();

// Watch index.html and notify all connected browsers.
// fs.watchFile (polling) is used for Docker on macOS compatibility.
fs.watchFile(HTML_PATH, { interval: 300 }, () => {
  for (const res of clients) {
    res.write('data: reload\n\n');
  }
});

// Heartbeat every 25s to keep SSE connections alive
setInterval(() => {
  for (const res of clients) {
    res.write(': heartbeat\n\n');
  }
}, 25000);

// Injected into HTML at serve time (only in non-Docker / dev use)
const LIVE_RELOAD = `<script>
(function(){
  var es = new EventSource('/sse');
  es.onmessage = function(){ location.reload(); };
  es.onerror   = function(){ setTimeout(function(){ location.reload(); }, 1000); };
})();
</script>`;

const server = http.createServer((req, res) => {
  // SSE endpoint
  if (req.url === '/sse') {
    res.writeHead(200, {
      'Content-Type':  'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection':    'keep-alive',
    });
    res.write(': connected\n\n');
    clients.add(res);
    req.on('close', () => clients.delete(res));
    return;
  }

  // Serve HTML with live-reload script injected
  fs.readFile(HTML_PATH, 'utf8', (err, html) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Internal Server Error');
      return;
    }
    const body = html.replace('</body>', LIVE_RELOAD + '\n</body>');
    res.writeHead(200, {
      'Content-Type':  'text/html; charset=utf-8',
      'Cache-Control': 'no-cache',
    });
    res.end(body);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log('');
  console.log('  WebSocket Tester');
  console.log(`  http://localhost:${PORT}`);
  console.log('');
  console.log('  Press Ctrl+C to stop');
});
