// Builds dist/ from src/: six service pages (src/template.html), four static pages (src/page.html), sitemap, robots.
import { readFileSync, writeFileSync, mkdirSync, cpSync, rmSync } from 'node:fs';

const read = f => readFileSync(f, 'utf8');
const css = read('src/css/fonts.css') + read('src/css/site.css');
const script = read('src/site.js');
const site = JSON.parse(read('src/data/site.json'));
const services = JSON.parse(read('src/data/services.json'));
const videos = JSON.parse(read('src/data/videos.json'));
const pages = JSON.parse(read('src/data/pages.json'));
const tpl = read('src/template.html');
const pageTpl = read('src/page.html');
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

rmSync('dist', { recursive: true, force: true });
mkdirSync('dist/css', { recursive: true });
cpSync('src/css', 'dist/css', { recursive: true });
cpSync('src/img', 'dist/img', { recursive: true });
cpSync('src/fonts', 'dist/fonts', { recursive: true });
cpSync('src/favicon.svg', 'dist/favicon.svg');

/* ---------- shared parts ---------- */
const ri = (name, sizes) => `src="/img/${name}.jpg" srcset="/img/${name}-640.jpg 640w, /img/${name}.jpg 1280w" sizes="${sizes}" width="1280" height="800"`;
const firstSentence = text => text.split('. ')[0].replace(/\.$/, '') + '.';

const serviceLinks = cur => services.map(s => `<a href="/services/${s.slug}/"${s.slug === cur ? ' aria-current="page"' : ''}>${esc(s.nav)}</a>`).join('');
const companyItems = [{ href: '/about/', label: 'About', key: 'about' }, { href: '/contact/', label: 'Contact', key: 'contact' }];
const companyLinks = cur => companyItems.map(n => `<a href="${n.href}"${n.key === cur ? ' aria-current="page"' : ''}>${esc(n.label)}</a>`).join('');
const navItems = [...services.map(s => ({ href: `/services/${s.slug}/`, label: s.nav })), ...companyItems];
const isService = cur => services.some(s => s.slug === cur);
const isCompany = cur => companyItems.some(n => n.key === cur);
const dropdown = (id, label, links, on) => `<div class="dd"><button class="dd-btn${on ? ' is-on' : ''}" type="button" aria-expanded="false" aria-controls="dd-${id}">${label}<i aria-hidden="true"></i></button><div class="dd-panel" id="dd-${id}">${links}</div></div>`;

const header = cur => `<header class="header">
  <div class="container">
    <a class="brand" href="/" aria-label="Avijeet Thakur, home"><img src="/favicon.svg" width="28" height="28" alt=""><span>Avijeet Thakur</span></a>
    <nav class="nav" aria-label="Primary">
      ${dropdown('services', 'Services', serviceLinks(cur), isService(cur))}
      ${dropdown('company', 'Company', companyLinks(cur), isCompany(cur))}
    </nav>
    <div class="head-actions">
      <a class="head-mail" href="mailto:${esc(site.email)}">${esc(site.email)}</a>
      <button class="btn btn-primary head-btn" type="button" data-open-lead>Hire me</button>
    </div>
    <details class="m-menu"><summary aria-label="Menu"><span></span></summary>
      <div class="m-panel">
        <p class="m-label">Services</p>${serviceLinks(cur)}
        <p class="m-label">Company</p>${companyLinks(cur)}
        <a class="m-mail" href="mailto:${esc(site.email)}">${esc(site.email)}</a>
        <button class="btn btn-primary" type="button" data-open-lead>Hire me</button>
      </div>
    </details>
  </div>
</header>`;

const leadForm = (prefix, pageName, path, cls = '') => `<form class="lead${cls}" id="${prefix}Form" action="/api/lead" method="post" novalidate>
      <p class="lead-eyebrow">Enquiry</p>
      <h2 class="lead-title">Tell me about your project</h2>
      <p class="lead-page"><span>Page</span> ${esc(pageName)}</p>
      <input type="hidden" name="page" value="${esc(pageName)}">
      <input type="hidden" name="path" value="${esc(path)}">
      <div class="hp" aria-hidden="true"><label>Company <input type="text" name="company" tabindex="-1" autocomplete="off"></label></div>
      <div class="field"><label for="${prefix}-name">Name</label><input id="${prefix}-name" name="name" type="text" autocomplete="name" required maxlength="120"></div>
      <div class="field"><label for="${prefix}-email">Email</label><input id="${prefix}-email" name="email" type="email" autocomplete="email" inputmode="email" required maxlength="160"></div>
      <div class="field"><label for="${prefix}-phone">Phone number</label><input id="${prefix}-phone" name="phone" type="tel" autocomplete="tel" inputmode="tel" required maxlength="40"></div>
      <button class="btn btn-primary btn-lg" type="submit">Submit <span class="arr" aria-hidden="true">&rarr;</span></button>
      <p class="lead-msg" role="status" aria-live="polite"></p>
    </form>`;

const leadBar = (prefix, pageName, path) => `<form class="lead lead-bar" id="${prefix}Form" action="/api/lead" method="post" novalidate>
      <div class="bar-title"><p class="lead-eyebrow">Enquiry</p><h2 class="bar-h">Tell me about your project</h2></div>
      <input type="hidden" name="page" value="${esc(pageName)}">
      <input type="hidden" name="path" value="${esc(path)}">
      <div class="hp" aria-hidden="true"><label>Company <input type="text" name="company" tabindex="-1" autocomplete="off"></label></div>
      <div class="field"><label for="${prefix}-name">Name</label><input id="${prefix}-name" name="name" type="text" autocomplete="name" required maxlength="120"></div>
      <div class="field"><label for="${prefix}-email">Email</label><input id="${prefix}-email" name="email" type="email" autocomplete="email" inputmode="email" required maxlength="160"></div>
      <div class="field"><label for="${prefix}-phone">Phone number</label><input id="${prefix}-phone" name="phone" type="tel" autocomplete="tel" inputmode="tel" required maxlength="40"></div>
      <button class="btn btn-primary btn-lg" type="submit">Submit <span class="arr" aria-hidden="true">&rarr;</span></button>
      <p class="lead-msg" role="status" aria-live="polite"></p>
    </form>`;

const footerLinks = services.map(s => `<li><a href="/services/${s.slug}/">${esc(s.nav)}</a></li>`).join('');
const footer = (pageName, path) => `<footer class="footer">
  <div class="container">
    <div><h3>Avijeet Thakur</h3><p>${esc(site.footerLine)}</p></div>
    <div><h3>Services</h3><ul>${footerLinks}</ul></div>
    <div><h3>Company</h3><ul><li><a href="/about/">About</a></li><li><a href="/contact/">Contact</a></li><li><a href="/privacy-policy/">Privacy Policy</a></li><li><a href="/terms-and-conditions/">Terms and Conditions</a></li><li><a href="mailto:${esc(site.email)}">${esc(site.email)}</a></li><li><a href="${esc(site.linkedin)}" rel="noopener">LinkedIn</a></li></ul></div>
    <p class="legal">Client names shown only where the work is live and public.</p>
  </div>
</footer>
<button class="hire-fab btn btn-primary" type="button" data-open-lead>Hire me</button>
<div class="sticky"><button class="btn btn-primary btn-lg" type="button" data-open-lead>Hire me</button></div>
<dialog class="lead-dialog" id="leadDialog" aria-label="Hire me">
  <button class="dlg-close" type="button" aria-label="Close">&times;</button>
  ${leadForm('m', pageName, path)}
</dialog>`;

const fill = (template, vars, raw) => template.replace(/\{\{(\w+)\}\}/g, (_, k) => {
  if (!(k in vars)) throw new Error(`Missing slot ${k}`);
  return raw.has(k) ? vars[k] : esc(vars[k]);
});

const photoHero = photos => {
  const slides = photos.map((p, n) => {
    const attrs = `class="hero-slide${n === 0 ? ' on' : ''}${p.flip ? ' flip' : ''}" style="object-position:${p.pos}" alt="" width="1600" height="780" data-title=""`;
    const set = `/img/${p.img}-800.jpg 800w, /img/${p.img}-1600.jpg 1600w`;
    const sizes = '(min-width:1024px) 100vw, 400px';
    return n === 0
      ? `<img ${attrs} src="/img/${p.img}-1600.jpg" srcset="${set}" sizes="${sizes}" fetchpriority="high">`
      : `<img ${attrs} data-src="/img/${p.img}-1600.jpg" data-srcset="${set}" data-sizes="${sizes}">`;
  }).join('');
  const first = photos[0].img;
  const preload = `<link rel="preload" as="image" href="/img/${first}-800.jpg" imagesrcset="/img/${first}-800.jpg 800w, /img/${first}-1600.jpg 1600w" imagesizes="(min-width:1024px) 100vw, 400px" fetchpriority="high">`;
  return { slides, preload };
};

/* Results block: one featured case plus compact rows. Used by service pages and the home page. */
const workBlocks = ids => {
  const wk = ids.map(id => site.works[id]);
  const wlink = w => w.url ? `<a class="more" href="${esc(w.url)}" rel="noopener">View live site &rarr;</a>` : '';
  const f = wk[0];
  const workFeature = `<article class="feature">${f.img ? `<img ${ri(f.img, '(min-width:1024px) 56vw, 100vw')} alt="Screenshot of ${esc(f.title)}" loading="lazy" decoding="async">` : ''}<div class="feature-body"><p class="eyebrow">${esc(f.label)}</p><h3>${esc(f.title)}</h3><p>${esc(f.text)}</p>${wlink(f)}</div></article>`;
  const workRows = wk.slice(1).map(w => `<li class="row">${w.img ? `<img class="thumb" ${ri(w.img, '(min-width:768px) 200px, 100vw')} alt="Screenshot of ${esc(w.title)}" loading="lazy" decoding="async">` : `<div class="thumb none">${esc(w.label)}</div>`}<div><p class="eyebrow">${esc(w.label)}</p><h3>${esc(w.title)}</h3><p>${esc(w.text)}</p></div>${wlink(w)}</li>`).join('');
  return { workFeature, workRows };
};

/* ---------- service pages ---------- */
const serviceRaw = new Set(['heroPreload', 'heroClass', 'css', 'script', 'header', 'footer', 'heroForm', 'offerRows', 'workFeature', 'workRows', 'tiles', 'heroSlides', 'vidList', 'vidDetails', 'stack', 'proof', 'steps', 'faq', 'jsonld']);

for (const s of services) {
  const path = `/services/${s.slug}/`;
  const proof = s.proofKeys.map(k => {
    const [val, label] = site.proof[k];
    const m = val.match(/^(\+?)(\d+)(.*)$/);
    return `<li class="stat"><strong data-count="${m[2]}" data-prefix="${esc(m[1])}" data-suffix="${esc(m[3])}">${esc(val)}</strong><span>${esc(label)}</span><i class="bar"></i></li>`;
  }).join('');
  const offerRows = s.offer.map(([t, d], i) => `<li><span class="n">0${i + 1}</span><div><h3>${esc(t)}</h3><p>${esc(d)}</p></div></li>`).join('');
  const steps = s.steps.map(([t, d]) => `<li><h3>${esc(t)}</h3><p>${esc(d)}</p><i></i></li>`).join('');

  const { workFeature, workRows } = workBlocks(s.work);

  const faq = s.faq.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('');
  const tiles = services.filter(o => o.slug !== s.slug).map((o, i) => `<a class="tile" href="/services/${o.slug}/"><span class="n">0${i + 1}</span><strong>${esc(o.nav)}</strong><span class="d">${esc(firstSentence(o.lead))}</span><span class="go">View &rarr;</span></a>`).join('');

  const photos = s.heroPhotos || null;
  let heroSlides, heroPreload, heroClass = 'hero', heroCaption = site.works[s.hero].title;
  if (photos) {
    heroClass = 'hero hero-photos';
    heroCaption = '';
    ({ slides: heroSlides, preload: heroPreload } = photoHero(photos));
  } else {
    const order = [s.hero, ...site.heroSlides.filter(id => id !== s.hero)];
    heroSlides = order.map((id, n) => {
      const w = site.works[id];
      const set = `/img/${w.img}-640.jpg 640w, /img/${w.img}.jpg 1280w`;
      const sizes = '(min-width:1024px) 66vw, 360px';
      return n === 0
        ? `<img class="hero-slide on" ${ri(w.img, sizes)} alt="" data-title="${esc(w.title)}" fetchpriority="high">`
        : `<img class="hero-slide" data-src="/img/${w.img}.jpg" data-srcset="${set}" data-sizes="${sizes}" width="1280" height="800" alt="" data-title="${esc(w.title)}">`;
    }).join('');
    const first = site.works[s.hero].img;
    heroPreload = `<link rel="preload" as="image" href="/img/${first}-640.jpg" imagesrcset="/img/${first}-640.jpg 640w, /img/${first}.jpg 1280w" imagesizes="(min-width:1024px) 66vw, 360px" fetchpriority="high">`;
  }

  const li = a => a.map(x => '<li>' + esc(x) + '</li>').join('');
  const vidList = videos.map((v, n) => `<button class="vid-item${n === 0 ? ' on' : ''}" type="button" data-vid="${v.id}" data-n="${n}"><img src="https://i.ytimg.com/vi/${v.id}/mqdefault.jpg" width="160" height="90" alt="" loading="lazy"><span>${esc(v.title)}</span></button>`).join('');
  const vidDetails = videos.map((v, n) => `<article class="vid-detail"${n === 0 ? '' : ' hidden'} data-n="${n}"><h3>${esc(v.title)}</h3>${v.summary ? '<p>' + esc(v.summary) + '</p>' : ''}${v.tools.length ? '<p class="mono mini">Tools</p><div class="chips">' + v.tools.map(t => '<span class="chip">' + esc(t) + '</span>').join('') + '</div>' : ''}<div class="vid-cols">${v.features.length ? '<div><p class="mono mini">Key features</p><ul>' + li(v.features) + '</ul></div>' : ''}${v.challenges.length ? '<div><p class="mono mini">Challenges and solutions</p><ul>' + li(v.challenges) + '</ul></div>' : ''}</div>${v.outcome ? '<p class="mono mini">Outcome</p><p>' + esc(v.outcome) + '</p>' : ''}</article>`).join('');

  const jsonld = JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'Person', '@id': `${site.siteUrl}/#person`, name: 'Avijeet Thakur', jobTitle: 'Full-stack, WordPress and Shopify developer', email: site.email, sameAs: [site.linkedin] },
      { '@type': 'Service', name: s.nav, description: s.metaDescription, url: `${site.siteUrl}${path}`, provider: { '@id': `${site.siteUrl}/#person` }, areaServed: 'Worldwide' },
      { '@type': 'FAQPage', mainEntity: s.faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) }
    ]
  }).replace(/</g, '\\u003c');

  const vars = {
    ...s, navLabel: s.nav, siteUrl: site.siteUrl, linkedin: site.linkedin,
    css, script, header: header(s.slug), footer: footer(s.nav, path), heroForm: leadForm('hero', s.nav, path),
    heroSlides, heroPreload, heroClass, heroCaption, tiles, offerRows, workFeature, workRows, vidList, vidDetails, vidFirst: videos[0].id,
    stack: s.stack.map((c, i) => `<span class="chip${i < 3 ? ' hot' : ''}">${esc(c)}</span>`).join(''),
    proof, steps, faq, jsonld
  };
  mkdirSync(`dist/services/${s.slug}`, { recursive: true });
  writeFileSync(`dist/services/${s.slug}/index.html`, fill(tpl, vars, serviceRaw));
}

/* ---------- static pages ---------- */
const pageRaw = new Set(['css', 'script', 'header', 'footer', 'content', 'jsonld']);
for (const p of pages) {
  const path = `/${p.slug}/`;
  const body = read(`src/pages/${p.slug}.html`)
    .replace(/\{\{email\}\}/g, esc(site.email))
    .replace(/\{\{linkedin\}\}/g, esc(site.linkedin))
    .replace(/\{\{leadForm\}\}/g, leadForm('page', p.navLabel, path));
  const jsonld = JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'Person', '@id': `${site.siteUrl}/#person`, name: 'Avijeet Thakur', email: site.email, sameAs: [site.linkedin] },
      { '@type': p.type, name: p.title, description: p.metaDescription, url: `${site.siteUrl}${path}` }
    ]
  }).replace(/</g, '\\u003c');
  const vars = { ...p, siteUrl: site.siteUrl, css, script, header: header(p.slug), footer: footer(p.navLabel, path), content: body, jsonld };
  mkdirSync(`dist/${p.slug}`, { recursive: true });
  writeFileSync(`dist/${p.slug}/index.html`, fill(pageTpl, vars, pageRaw));
}

/* ---------- home page, sitemap, robots ---------- */
const homeData = JSON.parse(read('src/data/home.json'));
const homeTpl = read('src/home.html');
const homeHero = photoHero(homeData.photos);
const homeTiles = services.map((o, i) => `<a class="tile" href="/services/${o.slug}/"><span class="n">0${i + 1}</span><strong>${esc(o.nav)}</strong><span class="d">${esc(firstSentence(o.lead))}</span><span class="go">View &rarr;</span></a>`).join('');
const homeJsonldObj = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'Person', '@id': `${site.siteUrl}/#person`, name: 'Avijeet Thakur', jobTitle: 'Product and web developer', email: site.email, sameAs: [site.linkedin] },
    { '@type': 'WebSite', name: 'Avijeet Thakur', url: site.siteUrl + '/', publisher: { '@id': `${site.siteUrl}/#person` } }
  ]
};
const testimonials = JSON.parse(read('src/data/testimonials.json'));
// Testimonials only render when real, approved quotes exist in src/data/testimonials.json.
const testimonialsHtml = testimonials.length
  ? `<section class="sec ink" id="testimonials"><div class="gridtex"></div><div class="container"><div class="sechead"><p class="eyebrow">Testimonials</p><h2 class="h2">What clients say</h2></div><div class="quotes">${testimonials.map(q => `<figure class="quote"><blockquote>${esc(q.quote)}</blockquote><figcaption><strong>${esc(q.name)}</strong>${q.role ? ' ' + esc(q.role) : ''}</figcaption></figure>`).join('')}</div></div></section>`
  : '';
const { workFeature: homeFeature, workRows: homeRows } = workBlocks(homeData.results.works);
const homeFaq = homeData.faq.items.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('');
homeJsonldObj['@graph'].push({ '@type': 'FAQPage', mainEntity: homeData.faq.items.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) });
const homeJsonldFull = JSON.stringify(homeJsonldObj).replace(/</g, '\\u003c');
const homeRaw = new Set(['css', 'script', 'header', 'footer', 'heroBar', 'heroSlides', 'heroPreload', 'tiles', 'jsonld', 'whoParagraphs', 'whatSteps', 'whyRows', 'workFeature', 'workRows', 'testimonials', 'faqItems']);
writeFileSync('dist/index.html', fill(homeTpl, {
  title: homeData.title, metaDescription: homeData.metaDescription, eyebrow: homeData.eyebrow, h1: homeData.h1, lead: homeData.lead,
  ctaPrimary: homeData.ctaPrimary, ctaSecondary: homeData.ctaSecondary, fine: homeData.fine,
  siteUrl: site.siteUrl, css, script, header: header(''), footer: footer('Home', '/'),
  heroBar: leadBar('hero', 'Home', '/'), heroSlides: homeHero.slides, heroPreload: homeHero.preload, tiles: homeTiles, jsonld: homeJsonldFull,
  whoEyebrow: homeData.who.eyebrow, whoTitle: homeData.who.title, whoLink: homeData.who.linkText,
  whoParagraphs: homeData.who.paragraphs.map(p => `<p>${esc(p)}</p>`).join(''),
  whatEyebrow: homeData.what.eyebrow, whatTitle: homeData.what.title, whatIntro: homeData.what.intro,
  whatSteps: homeData.what.steps.map(([t, d]) => `<li><h3>${esc(t)}</h3><p>${esc(d)}</p><i></i></li>`).join(''),
  whyEyebrow: homeData.why.eyebrow, whyTitle: homeData.why.title, whyIntro: homeData.why.intro,
  whyRows: homeData.why.reasons.map(([t, d], i) => `<li><span class="n">0${i + 1}</span><div><h3>${esc(t)}</h3><p>${esc(d)}</p></div></li>`).join(''),
  servicesEyebrow: homeData.services.eyebrow, servicesTitle: homeData.services.title,
  resultsEyebrow: homeData.results.eyebrow, resultsTitle: homeData.results.title, workFeature: homeFeature, workRows: homeRows,
  testimonials: testimonialsHtml,
  faqEyebrow: homeData.faq.eyebrow, faqTitle: homeData.faq.title, faqItems: homeFaq,
  faqSideEyebrow: homeData.faq.sideEyebrow, faqSideTitle: homeData.faq.sideTitle, faqSideText: homeData.faq.sideText,
  ctaEyebrow: homeData.cta.eyebrow, ctaTitle: homeData.cta.title, ctaText: homeData.cta.text
}, homeRaw));
const urls = ['/', ...services.map(s => `/services/${s.slug}/`), ...pages.map(p => `/${p.slug}/`)];
writeFileSync('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(u => `<url><loc>${site.siteUrl}${u}</loc></url>`).join('\n')}\n</urlset>\n`);
writeFileSync('dist/robots.txt', `User-agent: *\nAllow: /\nSitemap: ${site.siteUrl}/sitemap.xml\n`);
console.log(`Built ${services.length} service pages and ${pages.length} static pages.`);
