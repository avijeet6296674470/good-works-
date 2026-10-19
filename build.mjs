import { readFileSync, writeFileSync, mkdirSync, cpSync, rmSync } from 'node:fs';
const site = JSON.parse(readFileSync('src/data/site.json', 'utf8'));
const services = JSON.parse(readFileSync('src/data/services.json', 'utf8'));
const videos = JSON.parse(readFileSync('src/data/videos.json', 'utf8'));
const tpl = readFileSync('src/template.html', 'utf8');
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

rmSync('dist', { recursive: true, force: true });
mkdirSync('dist/css', { recursive: true });
cpSync('src/css', 'dist/css', { recursive: true });
cpSync("src/img", "dist/img", { recursive: true });

const navFor = cur => services.map(s => `<a href="/services/${s.slug}/"${s.slug === cur ? ' aria-current="page"' : ''}>${esc(s.nav)}</a>`).join('');
const nav = navFor('');
const footerLinks = services.map(s => `<li><a href="/services/${s.slug}/">${esc(s.nav)}</a></li>`).join('');

for (const s of services) {
  const proof = s.proofKeys.map(k => {
    const [val, label] = site.proof[k];
    const m = val.match(/^(\+?)(\d+)(.*)$/);
    return `<li class="stat"><strong data-count="${m[2]}" data-prefix="${esc(m[1])}" data-suffix="${esc(m[3])}">${esc(val)}</strong><span>${esc(label)}</span><i class="bar"></i></li>`;
  }).join('');
  const offerCards = s.offer.map(([t, d], i) => `<article class="card"><p class="eyebrow">0${i + 1}</p><h3>${esc(t)}</h3><p>${esc(d)}</p></article>`).join('');
  const steps = s.steps.map(([t, d]) => `<li><h3>${esc(t)}</h3><p>${esc(d)}</p></li>`).join('');
  const workCards = s.work.map(id => {
    const w = site.works[id];
    const link = w.url ? `<a class="more" href="${esc(w.url)}" rel="noopener">View live site &rarr;</a>` : '';
    return `<article class="card">${w.img ? `<img class="shot" src="/img/${w.img}.jpg" width="1280" height="800" alt="Screenshot of ${esc(w.title)}" loading="lazy">` : `<div class="shot">Screenshot to add</div>`}<p class="eyebrow">${esc(w.label)}</p><h3>${esc(w.title)}</h3><p>${esc(w.text)}</p>${link}</article>`;
  }).join('');
  const faq = s.faq.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('');
  const tiles = services.filter(o => o.slug !== s.slug).map((o, i) => `<a class="tile" href="/services/${o.slug}/"><span class="n">0${i + 1}</span><strong>${esc(o.nav)}</strong><span class="d">${esc(o.lead.split('. ')[0])}.</span><span class="go">View &rarr;</span></a>`).join('');
  const promo = site.promo.map(c => `<div class="promo-cell"><span>${esc(c.text)}</span>${c.link ? `<a href="${esc(c.link)}">${esc(c.linkText)}</a>` : ''}</div>`).join('');
  const order = [s.hero, ...site.heroSlides.filter(id => id !== s.hero)];
  const heroSlides = order.map((id, n) => { const w = site.works[id]; return `<img class="hero-slide${n === 0 ? ' on' : ''}" src="/img/${w.img}.jpg" width="1280" height="800" alt="" data-title="${esc(w.title)}"${n === 0 ? ' fetchpriority="high"' : ' loading="lazy"'}>`; }).join('');
  const li = a => a.map(x => '<li>' + esc(x) + '</li>').join('');
  const vidList = videos.map((v, n) => `<button class="vid-item${n === 0 ? ' on' : ''}" type="button" data-vid="${v.id}" data-n="${n}"><img src="https://i.ytimg.com/vi/${v.id}/mqdefault.jpg" width="160" height="90" alt="" loading="lazy"><span>${esc(v.title)}</span></button>`).join('');
  const vidDetails = videos.map((v, n) => `<article class="vid-detail"${n === 0 ? '' : ' hidden'} data-n="${n}"><h3>${esc(v.title)}</h3>${v.summary ? '<p>' + esc(v.summary) + '</p>' : ''}${v.tools.length ? '<p class="mono mini">Tools</p><div class="chips">' + v.tools.map(t => '<span class="chip">' + esc(t) + '</span>').join('') + '</div>' : ''}<div class="vid-cols">${v.features.length ? '<div><p class="mono mini">Key features</p><ul>' + li(v.features) + '</ul></div>' : ''}${v.challenges.length ? '<div><p class="mono mini">Challenges and solutions</p><ul>' + li(v.challenges) + '</ul></div>' : ''}</div>${v.outcome ? '<p class="mono mini">Outcome</p><p>' + esc(v.outcome) + '</p>' : ''}</article>`).join('');
  const related = services.filter(o => o.slug !== s.slug).map(o => `<a href="/services/${o.slug}/">${esc(o.nav)}</a>`).join('');
  const jsonld = JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'Person', '@id': `${site.siteUrl}/#person`, name: 'Avijeet Thakur', jobTitle: 'Full-stack, WordPress and Shopify developer', email: site.email, sameAs: [site.linkedin] },
      { '@type': 'Service', name: s.nav, description: s.metaDescription, url: `${site.siteUrl}/services/${s.slug}/`, provider: { '@id': `${site.siteUrl}/#person` }, areaServed: 'Worldwide' },
      { '@type': 'FAQPage', mainEntity: s.faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) }
    ]
  }).replace(/</g, '\u003c');
  const vars = {
    ...s, navLabel: s.nav, tiles, promo, heroSlides, vidList, vidDetails, vidFirst: videos[0].id, heroCaption: site.works[s.hero].title, siteUrl: site.siteUrl, email: site.email, linkedin: site.linkedin, footerLine: site.footerLine,
    mailSubject: encodeURIComponent(`Enquiry: ${s.nav}`),
    heroChips: '',
    stack: s.stack.map((c, i) => `<span class="chip${i < 3 ? ' hot' : ''}">${esc(c)}</span>`).join(''),
    proof, offerCards, steps, workCards, faq, related, jsonld, nav: navFor(s.slug), footerLinks
  };
  const raw = new Set(['tiles', 'promo', 'heroSlides', 'vidList', 'vidDetails', 'heroChips', 'stack', 'proof', 'offerCards', 'steps', 'workCards', 'faq', 'related', 'jsonld', 'nav', 'footerLinks', 'mailSubject']);
  const html = tpl.replace(/\{\{(\w+)\}\}/g, (_, k) => {
    if (!(k in vars)) throw new Error(`Missing slot ${k} in ${s.slug}`);
    return raw.has(k) ? vars[k] : esc(vars[k]);
  });
  mkdirSync(`dist/services/${s.slug}`, { recursive: true });
  writeFileSync(`dist/services/${s.slug}/index.html`, html);
}

// temporary home: links to every service (recruiter page is written later)
const home = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Avijeet Thakur | Developer Portfolio</title><link rel="stylesheet" href="/css/site.css"></head><body><main style="padding:48px 0"><div class="container"><h1>Avijeet Thakur</h1><p class="lead">Recruiter home page placeholder.</p><div class="related">${nav}</div></div></main></body></html>`;
writeFileSync('dist/index.html', home);
const urls = ['/', ...services.map(s => `/services/${s.slug}/`)];
writeFileSync('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(u => `<url><loc>${site.siteUrl}${u}</loc></url>`).join('\n')}\n</urlset>\n`);
writeFileSync('dist/robots.txt', `User-agent: *\nAllow: /\nSitemap: ${site.siteUrl}/sitemap.xml\n`);
console.log(`Built ${services.length} service pages.`);
