// Shared meta-tag injector — keeps SEO/OG tags consistent across pages
(function() {
  const SITE = 'https://xeniabuild.com';
  const TITLE = 'Xenia Home Build · The Harbor Spring';
  const DESC = 'Tracking our custom Diyanni Harbor Spring build in Xenia Township, Ohio — budget, timeline, decisions, and gallery.';
  const IMG = SITE + '/images/harbor-spring/og-cover.jpg'; // placeholder; site works without it
  const path = location.pathname.replace(/index\.html$/, '');
  const url = SITE + path;

  const tags = [
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:url', content: url }],
    ['meta', { property: 'og:title', content: document.title || TITLE }],
    ['meta', { property: 'og:description', content: DESC }],
    ['meta', { property: 'og:image', content: IMG }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: document.title || TITLE }],
    ['meta', { name: 'twitter:description', content: DESC }],
    ['meta', { name: 'theme-color', content: '#1F4E78' }],
    ['link', { rel: 'canonical', href: url }],
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
  ];
  tags.forEach(([tag, attrs]) => {
    const el = document.createElement(tag);
    Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
    document.head.appendChild(el);
  });
})();
