// Local preview server for dist/. Mirrors production basics: gzip for text, long cache for static assets.
// Also accepts POST /api/lead and appends the enquiry to leads.jsonl (gitignored).
import { createServer } from 'node:http';
import { gzipSync } from 'node:zlib';
import { readFile, appendFile } from 'node:fs/promises';
import { extname, join } from 'node:path';

const types = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.xml': 'application/xml', '.txt': 'text/plain',
  '.js': 'text/javascript', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.jpg': 'image/jpeg'
};
const textTypes = new Set(['.html', '.css', '.xml', '.txt', '.js', '.svg']);
const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const clean = (v, n) => String(v ?? '').replace(/[\r\n]+/g, ' ').trim().slice(0, n);
const json = (res, code, body) => { res.writeHead(code, { 'content-type': 'application/json' }); res.end(JSON.stringify(body)); };

async function handleLead(req, res) {
  let body = '';
  for await (const chunk of req) {
    body += chunk;
    if (body.length > 10000) { res.writeHead(413); return res.end(); }
  }
  let d;
  try { d = JSON.parse(body); } catch { res.writeHead(400); return res.end(); }
  if (clean(d.company, 80)) return json(res, 200, { ok: true }); // honeypot: pretend success, store nothing
  const lead = { name: clean(d.name, 120), email: clean(d.email, 160), phone: clean(d.phone, 40), page: clean(d.page, 80), path: clean(d.path, 120) };
  if (!lead.name || !EMAIL.test(lead.email) || lead.phone.replace(/\D/g, '').length < 7) return json(res, 422, { ok: false });
  await appendFile('leads.jsonl', JSON.stringify({ at: new Date().toISOString(), ...lead }) + '\n');
  return json(res, 200, { ok: true });
}

createServer(async (req, res) => {
  if (req.method === 'POST' && req.url === '/api/lead') return handleLead(req, res);
  let p = decodeURIComponent(req.url.split('?')[0]);
  if (p.includes('..')) { res.writeHead(400); return res.end(); }
  if (p.endsWith('/')) p += 'index.html';
  try {
    const data = await readFile(join('dist', p));
    const ext = extname(p);
    const immutable = p.startsWith('/img/') || p.startsWith('/fonts/');
    const headers = {
      'content-type': types[ext] || 'application/octet-stream',
      'cache-control': immutable ? 'public, max-age=31536000, immutable' : 'no-cache'
    };
    if (textTypes.has(ext)) {
      headers['content-encoding'] = 'gzip';
      headers.vary = 'Accept-Encoding';
      res.writeHead(200, headers);
      res.end(gzipSync(data));
    } else {
      res.writeHead(200, headers);
      res.end(data);
    }
  } catch {
    res.writeHead(404);
    res.end('Not found');
  }
}).listen(4173, () => console.log('http://localhost:4173'));
