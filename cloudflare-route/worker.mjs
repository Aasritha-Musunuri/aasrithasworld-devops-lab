// Proxy only the study path. All other paths continue to the existing origin.
const PREFIX = '/devops-learning';
const ORIGIN = 'https://aasritha-musunuri.github.io';
const REPOSITORY_PATH = '/asymytric-devops-journey-web/';

export default {
  async fetch(request) {
    const incoming = new URL(request.url);
    if (incoming.pathname !== PREFIX && !incoming.pathname.startsWith(PREFIX + '/')) {
      return fetch(request);
    }
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      return new Response('Only GET and HEAD are supported.', {status: 405, headers: {Allow: 'GET, HEAD'}});
    }
    if (incoming.pathname === PREFIX) {
      incoming.pathname += '/';
      return Response.redirect(incoming.href, 308);
    }

    const target = new URL(REPOSITORY_PATH + incoming.pathname.slice(PREFIX.length + 1), ORIGIN);
    target.search = incoming.search;
    // Send only public-site request headers, never the main site's cookies or credentials.
    const headers = new Headers();
    for (const name of ['accept', 'accept-language', 'if-none-match', 'if-modified-since']) {
      if (request.headers.has(name)) headers.set(name, request.headers.get(name));
    }
    let upstream;
    try {
      upstream = await fetch(target.href, {method: request.method, headers, redirect: 'manual'});
    } catch {
      return new Response('The study website is temporarily unavailable. Please try again later.', {status: 502});
    }
    const responseHeaders = new Headers(upstream.headers);
    responseHeaders.delete('set-cookie');
    const location = responseHeaders.get('location');
    if (location) {
      const destination = new URL(location, target);
      if (destination.origin !== ORIGIN || !destination.pathname.startsWith(REPOSITORY_PATH)) {
        return new Response('Unexpected study-site redirect. Keep the GitHub Pages custom domain empty for this setup.', {status: 502});
      }
      destination.host = incoming.host;
      destination.protocol = incoming.protocol;
      destination.pathname = PREFIX + '/' + destination.pathname.slice(REPOSITORY_PATH.length);
      responseHeaders.set('location', destination.href);
    }
    return new Response(request.method === 'HEAD' ? null : upstream.body, {
      status: upstream.status, statusText: upstream.statusText, headers: responseHeaders
    });
  }
};
