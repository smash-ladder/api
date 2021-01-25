import { readFileSync } from 'fs';
import * as marked from 'marked';
import * as path from 'path';
import * as highlight from 'highlight.js';
import { Context } from 'koa';
import { HalLink, HalLinkList, OneHalLink, HalEmbeddedList, OneHalEmbedded } from '../types/hal';
import { Problem } from '../types/problem';

// Setting up highlight.js in marked
marked.setOptions({
  highlight: function(code: string) {
    return highlight.highlightAuto(code).value;
  }
});

/**
 * Escape a string for output to HTML
 */
const escapeHtml = function(input: string): string {

  return input.replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

};

/**
 * Turns any object into a syntax-highlighted JSON-encoded, html string.
 */
const highlightJson = function(input: any): string {

  input = JSON.stringify(input, undefined, 2);
  return highlight.highlight('json', input).value;

};

const assets: {
  logo: string;
  css: string;
  highlight: string;
} = {
  logo: readFileSync(path.join(__dirname, '/../../assets//browser/logo.svg'), 'UTF-8'),
  css: readFileSync(path.join(__dirname, '/../../assets/browser/turnstyle.css'), 'UTF-8'),
  highlight: readFileSync(path.join(__dirname, '/../../node_modules/highlight.js/styles/monokai-sublime.css'), 'UTF-8')
};

/**
 * The real middleware.
 *
 * This gets called for every request.
 */
export default async function(ctx: Context, next: Function) {

  if (ctx.method !== 'GET' && ctx.method !== 'HEAD') {

    // Only handling GET and HEAD requests at the moment.
    return next();

  }

  if (!ctx.accepts('html')) {
    // We're only interested in browsers
    return next();

  }

  // Doing a sub request
  ctx.req.headers['accept'] = 'application/json, text/markdown';
  const innerResult = await next();

  renderBrowser(ctx);

}

/**
 * This function is responsible for rendering the HTML for the browser plugin.
 */
const renderBrowser = function(ctx: Context) {

  const path = escapeHtml(ctx.path);
  let content = '';

  switch (ctx.type) {
    case 'application/vnd.turnstyle.hal+json' :
    case 'application/json' :
      content = renderJSON(ctx.body);
      break;
    case 'text/markdown' :
      content = renderMarkdown(ctx.body);
      break;
    case 'application/problem+json' :
      content = renderProblem(ctx.body);
      break;
    default:
      return;
  }

  const template = `<!DOCTYPE html>
<html>
<head>
  <title>Bad Gateway Smash API</title>
  <style>${assets.css}</style>
  <style>${assets.highlight}</style>
</head>
<body>
  <header>
    <h1>Smash Ladder API - ${path}</h1>
    <h2>${assets.logo}</h2>

  </header>
  <main>
    ${content}

  </main>
</body>
</html>
`;

  ctx.body = template;
  ctx.response.set('Content-Type', 'text/html');

};

/**
 * This function renders JSON responses, with special handling for the _links
 * and _embedded objects. It returns a HTML string.
 */
const renderJSON = function(json: any): string {

  let linksHtml = '';

  if (json._links) {

    linksHtml += '<h1>Links</h1>';
    linksHtml += renderLinksTable(json._links);

  }

  let embeddedHtml = '';

  if (json._embedded) {

    embeddedHtml += '<h1>Embedded</h1>';
    embeddedHtml += renderEmbedded(json._embedded);

  }

  delete json._links;
  delete json._embedded;

  let propertiesHtml = '';
  if (Object.keys(json).length > 0) {
    propertiesHtml += '<h1>Properties</h1>\n';
    propertiesHtml += '<pre><code>';
    propertiesHtml += highlightJson(json);
    propertiesHtml += '</code></pre>';

  }

  return `
    ${linksHtml}
    ${propertiesHtml}
    ${embeddedHtml}
  `;

};

/**
 * This function takes a markdown document and turns it into HTML
 */
const renderMarkdown = function(md: Buffer): string {

  return marked(md.toString());

};

/**
 * This function renders a HTML table for a _links object.
 */
const renderLinksTable = function(links: HalLinkList): string {

  let linksHtml = '<table>';
  linksHtml += '<tr><th>rel</th><th>href</th><th></th></tr>';
  const forms: HalLinkList = {};

  for (const ii in links) {

    let ll: OneHalLink[] = [];
    ll = ll.concat(links[ii]);

    linksHtml += '<tr><td>' + escapeHtml(ii) + '</td><td>';

    for (const jj in ll) {
      linksHtml += '<a href="' + escapeHtml(ll[jj].href) + '">' + escapeHtml(ll[jj].href) + '</a> ';

      if (ll[jj].type) {
        let typeLabel = ll[jj].type;
        let typeClass = 'mimeType';
        switch (typeLabel) {
          case 'text/html' :
            typeLabel = 'html';
            break;
          case 'text/csv' :
            typeLabel = 'csv';
            typeClass += ' csv';
            break;
          case 'application/atom+xml' :
            typeLabel = 'atom';
            typeClass += ' atom';
            break;
        }

        linksHtml += '<span class="' + typeClass + '">' + typeLabel + '</span>';
      }

      linksHtml += '<br />';
    }
    linksHtml += '</td><td>';
    for (const jj in ll) {
      if (ll[jj].title) {
        linksHtml += escapeHtml(ll[jj].title) + '<br />';
      }
    }
    linksHtml += '</td></tr>';
  }

  linksHtml += '</table>';

  if (Object.keys(forms).length) {
    linksHtml += renderQueryForm(forms);
  }

  return linksHtml;

};

/**
 * This function renders items in the _embedded object.
 */
const renderEmbedded = function(embedded: HalEmbeddedList): string {

  let embeddedHtml = '';
  for (const ii in embedded) {
    embeddedHtml += '<h2>' + escapeHtml(ii) + '</h2>';

    let eItems: OneHalEmbedded[] = [];
    eItems = eItems.concat(embedded[ii]);

    for (const jj in eItems) {

      if (eItems[jj]._links) {
        embeddedHtml += '<h3>Links</h3>';
        embeddedHtml += renderLinksTable(eItems[jj]._links);
        delete eItems[jj]._links;
      }

      embeddedHtml += '<pre><code>' + highlightJson(eItems[jj]) + '</code></pre>';

    }

  }
  return embeddedHtml;
};

/**
 * Renders a application/problem+json response.
 */
const renderProblem = function(problem: Problem): string {

  const json = highlightJson(problem);

  return `
    <h1>Error</h1>
    <pre><code>${json}</code></pre>
  `;

};

/**
 * This function renders a HTML table for queries.
 */

const renderQueryForm = function(forms: HalLinkList): string {

  let formHtml = '<h1>Queries</h1>\n';

  for (const ii in forms) {

    const flattenedForms: OneHalLink[] = [];
    flattenedForms.concat(forms[ii]);

    for (const form of flattenedForms) {

      // Remove templated variables from base url
      const baseUrl = form.href.replace(/{\?[^}]+}/g, '');

      // Make a list of all templated variables
      const queryParams = form.href.match(/{\?[^}]+}/g);

      formHtml += `<form action="${escapeHtml(baseUrl)}">\n<h2>${escapeHtml(ii)}</h2>`;

      formHtml += `<table>\n`;
      for (const jj in queryParams) {

        const param = escapeHtml(queryParams[jj].slice(2, -1));
        formHtml += `<tr>`;
        formHtml += `<td><label for="${param}">${param}</label></td>`;
        formHtml += `<td><input type="text" name="${param}" /><br /></td>`;
        formHtml += `</tr>\n`;
      }

      formHtml += `<tr><td colspan="2"><input type="submit" value="Submit" /></td></tr>\n`;
      formHtml += `</table></form>`;

    }

  }
  return formHtml;
};
