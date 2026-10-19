import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join } from 'node:path';
const types = { '.html': 'text/html', '.css': 'text/css', '.xml': 'application/xml', '.txt': 'text/plain', '.js': 'text/javascript' };
createServer(async (req, res) => {
  if (req.method === 'POST' && req.url.startsWith('/_save/')) { const n = req.url.slice(7).replace(/[^a-z0-9-]/g, ''); const chunks = []; for await (const c of req) chunks.push(c); (await import('node:fs')).writeFileSync(`src/img/${n}.webp`, Buffer.concat(chunks)); res.writeHead(200); return res.end('ok'); }
  let p = decodeURIComponent(req.url.split('?')[0]);
  if (p.includes('..')) { res.writeHead(400); return res.end(); }
  if (p.endsWith('/')) p += 'index.html';
  try {
    const data = await readFile(join('dist', p));
    res.writeHead(200, { 'content-type': types[extname(p)] || 'application/octet-stream' });
    res.end(data);
  } catch { res.writeHead(404); res.end('Not found'); }
}).listen(4173, () => console.log('http://localhost:4173'));
