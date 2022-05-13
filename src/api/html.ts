type GenerateHtmlOpts = {
  opengraph?: {
    title?: string
    type?: 'website'
    image?: string
    url?: string
    description?: string
    site_name?: string
  }
  twitter?: {
    card_type?: 'summary_large_image'
  }
}

const normalizeCss = `
/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */

/* Document
   ========================================================================== */

/**
 * 1. Correct the line height in all browsers.
 * 2. Prevent adjustments of font size after orientation changes in iOS.
 */

html {
  line-height: 1.15; /* 1 */
  -webkit-text-size-adjust: 100%; /* 2 */
}

/* Sections
   ========================================================================== */

/**
 * Remove the margin in all browsers.
 */

body {
  margin: 0;
}

/**
 * Render the \`main\` element consistently in IE.
 */

main {
  display: block;
}

/**
 * Correct the font size and margin on \`h1\` elements within \`section\` and
 * \`article\` contexts in Chrome, Firefox, and Safari.
 */

h1 {
  font-size: 2em;
  margin: 0.67em 0;
}

/* Grouping content
   ========================================================================== */

/**
 * 1. Add the correct box sizing in Firefox.
 * 2. Show the overflow in Edge and IE.
 */

hr {
  box-sizing: content-box; /* 1 */
  height: 0; /* 1 */
  overflow: visible; /* 2 */
}

/**
 * 1. Correct the inheritance and scaling of font size in all browsers.
 * 2. Correct the odd \`em\` font sizing in all browsers.
 */

pre {
  font-family: monospace, monospace; /* 1 */
  font-size: 1em; /* 2 */
}

/* Text-level semantics
   ========================================================================== */

/**
 * Remove the gray background on active links in IE 10.
 */

a {
  background-color: transparent;
}

/**
 * 1. Remove the bottom border in Chrome 57-
 * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.
 */

abbr[title] {
  border-bottom: none; /* 1 */
  text-decoration: underline; /* 2 */
  text-decoration: underline dotted; /* 2 */
}

/**
 * Add the correct font weight in Chrome, Edge, and Safari.
 */

b,
strong {
  font-weight: bolder;
}

/**
 * 1. Correct the inheritance and scaling of font size in all browsers.
 * 2. Correct the odd \`em\` font sizing in all browsers.
 */

code,
kbd,
samp {
  font-family: monospace, monospace; /* 1 */
  font-size: 1em; /* 2 */
}

/**
 * Add the correct font size in all browsers.
 */

small {
  font-size: 80%;
}

/**
 * Prevent \`sub\` and \`sup\` elements from affecting the line height in
 * all browsers.
 */

sub,
sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}

sub {
  bottom: -0.25em;
}

sup {
  top: -0.5em;
}

/* Embedded content
   ========================================================================== */

/**
 * Remove the border on images inside links in IE 10.
 */

img {
  border-style: none;
}

/* Forms
   ========================================================================== */

/**
 * 1. Change the font styles in all browsers.
 * 2. Remove the margin in Firefox and Safari.
 */

button,
input,
optgroup,
select,
textarea {
  font-family: inherit; /* 1 */
  font-size: 100%; /* 1 */
  line-height: 1.15; /* 1 */
  margin: 0; /* 2 */
}

/**
 * Show the overflow in IE.
 * 1. Show the overflow in Edge.
 */

button,
input { /* 1 */
  overflow: visible;
}

/**
 * Remove the inheritance of text transform in Edge, Firefox, and IE.
 * 1. Remove the inheritance of text transform in Firefox.
 */

button,
select { /* 1 */
  text-transform: none;
}

/**
 * Correct the inability to style clickable types in iOS and Safari.
 */

button,
[type="button"],
[type="reset"],
[type="submit"] {
  -webkit-appearance: button;
}

/**
 * Remove the inner border and padding in Firefox.
 */

button::-moz-focus-inner,
[type="button"]::-moz-focus-inner,
[type="reset"]::-moz-focus-inner,
[type="submit"]::-moz-focus-inner {
  border-style: none;
  padding: 0;
}

/**
 * Restore the focus styles unset by the previous rule.
 */

button:-moz-focusring,
[type="button"]:-moz-focusring,
[type="reset"]:-moz-focusring,
[type="submit"]:-moz-focusring {
  outline: 1px dotted ButtonText;
}

/**
 * Correct the padding in Firefox.
 */

fieldset {
  padding: 0.35em 0.75em 0.625em;
}

/**
 * 1. Correct the text wrapping in Edge and IE.
 * 2. Correct the color inheritance from \`fieldset\` elements in IE.
 * 3. Remove the padding so developers are not caught out when they zero out
 *    \`fieldset\` elements in all browsers.
 */

legend {
  box-sizing: border-box; /* 1 */
  color: inherit; /* 2 */
  display: table; /* 1 */
  max-width: 100%; /* 1 */
  padding: 0; /* 3 */
  white-space: normal; /* 1 */
}

/**
 * Add the correct vertical alignment in Chrome, Firefox, and Opera.
 */

progress {
  vertical-align: baseline;
}

/**
 * Remove the default vertical scrollbar in IE 10+.
 */

textarea {
  overflow: auto;
}

/**
 * 1. Add the correct box sizing in IE 10.
 * 2. Remove the padding in IE 10.
 */

[type="checkbox"],
[type="radio"] {
  box-sizing: border-box; /* 1 */
  padding: 0; /* 2 */
}

/**
 * Correct the cursor style of increment and decrement buttons in Chrome.
 */

[type="number"]::-webkit-inner-spin-button,
[type="number"]::-webkit-outer-spin-button {
  height: auto;
}

/**
 * 1. Correct the odd appearance in Chrome and Safari.
 * 2. Correct the outline style in Safari.
 */

[type="search"] {
  -webkit-appearance: textfield; /* 1 */
  outline-offset: -2px; /* 2 */
}

/**
 * Remove the inner padding in Chrome and Safari on macOS.
 */

[type="search"]::-webkit-search-decoration {
  -webkit-appearance: none;
}

/**
 * 1. Correct the inability to style clickable types in iOS and Safari.
 * 2. Change font properties to \`inherit\` in Safari.
 */

::-webkit-file-upload-button {
  -webkit-appearance: button; /* 1 */
  font: inherit; /* 2 */
}

/* Interactive
   ========================================================================== */

/*
 * Add the correct display in Edge, IE 10+, and Firefox.
 */

details {
  display: block;
}

/*
 * Add the correct display in all browsers.
 */

summary {
  display: list-item;
}

/* Misc
   ========================================================================== */

/**
 * Add the correct display in IE 10+.
 */

template {
  display: none;
}

/**
 * Add the correct display in IE 10.
 */

[hidden] {
  display: none;
}

`

const createMetaTag = (property: string, content: string) =>
  `<meta property="${property}" content="${content}" />`

export const generateHtml = (
  title: string,
  style: string,
  body: string,
  opts?: GenerateHtmlOpts,
): string => {
  const openGraphOpts = opts?.opengraph

  const openGraphMetaTags: string[] = []

  if (openGraphOpts?.title) {
    openGraphMetaTags.push(createMetaTag('og:title', openGraphOpts.title))
  }

  if (openGraphOpts?.type) {
    openGraphMetaTags.push(createMetaTag('og:type', openGraphOpts.type))
  }

  if (openGraphOpts?.image) {
    openGraphMetaTags.push(createMetaTag('og:image', openGraphOpts.image))
  }

  if (openGraphOpts?.url) {
    openGraphMetaTags.push(createMetaTag('og:url', openGraphOpts.url))
  }

  if (openGraphOpts?.description) {
    openGraphMetaTags.push(
      createMetaTag('og:description', openGraphOpts.description),
    )
  }

  if (openGraphOpts?.site_name) {
    openGraphMetaTags.push(
      createMetaTag('og:site_name', openGraphOpts.site_name),
    )
  }

  const twitterEmbedOpts = opts?.twitter

  const twitterEmbedMetaTags: string[] = []

  if (twitterEmbedOpts?.card_type) {
    twitterEmbedMetaTags.push(
      createMetaTag('twitter:card', twitterEmbedOpts.card_type),
    )
  }

  const html = `
    <!DOCTYPE html>
        <html>
        <head>
            <title>${title}</title>
            <meta charset="UTF-8" />
            ${openGraphMetaTags.join('\n')}
            ${twitterEmbedMetaTags.join('\n')}
            <style>
                ${normalizeCss}
            </style>
            <style>
                html, body {
                    background-color: #212121;
                    color: #cdcdcd;
                    font-family: monospace;
                }

                html {
                }

                body {
                  overflow-x: hidden;
                  width: 100vw;
                }

                img {
                  max-width: 100vw;
                }

                a:link {
                    color: #cdcdcd;
                }

                a:visited {
                    color: #cdcdcd;
                }

                table {
                  border-collapse: collapse;
                  /*overflow-x: auto;*/
                }

                table, td, th {
                  border: 1px solid;
                }

                td, th {
                  padding: 10px;
                }

                h1 {
                  font-size: 5.5rem;
                }

                h2 {
                  font-size: 5rem;
                }

                h3 {
                  font-size: 4.5rem;
                }

                h4 {
                  font-size: 4.1rem;
                }

                h5 {
                  font-size: 3.6rem;
                }

                h6 {
                  font-size: 3.3rem;
                }

                p, li, a, dt, dl, summary, address, th, td, caption, pre {
                  font-size: 3rem;
                }

                h1, h2, h3, h4, h5, h6, p, li, a, dt, dl, summary, address, th, td, caption, pre {
                  overflow-wrap: break-word;
                }

                @media only screen and (min-width: 992px) {

                  h1 {
                    font-size: 1.75rem;
                  }

                  h2 {
                    font-size: 1.70rem;
                  }

                  h3 {
                    font-size: 1.65rem;
                  }

                  h4 {
                    font-size: 1.5rem;
                  }

                  h5 {
                    font-size: 1.4rem;
                  }

                  h6 {
                    font-size: 1.3rem;
                  }

                  p, li, a, dt, dl, summary, address, th, td, caption, pre {
                    font-size: 1.3rem;
                  }
                }

                ${style}
            </style>
        </head>
        <body>
            ${body}
        </body>
        </html>
    `

  return html
}

export const htmlResponse = (html: string, status?: number) => {
  return new Response(html, {
    status: status,
    headers: {
      'Content-Type': 'text/html',
    },
  })
}

export const notFoundPage = () => {
  return generateHtml(
    'Not Found',
    `
        div {
            padding: 3rem;
        }
    `,
    `
    <div>
        <h1>Error 404: Page Not Found</h1>
        <p>Unfortunately, I couldn&apos;t find this page.</p>
    </div>
    `,
  )
}

export const internalServerErrorPage = () => {
  return generateHtml(
    'Internal Server Error',
    `
        div {
            padding: 3rem;
        }
    `,
    `
    <div>
        <h1>Error 500: Internal Server Error</h1>
        <p>Something weird happened on the server.</p>
    </div>
    `,
  )
}

export const htmlTestPage = () => {
  const html = generateHtml(
    'css test page',
    '',
    `
    <div id="top" role="document">
      <header>
        <h1>HTML5 Test Page</h1>
        <p>This is a test page filled with common HTML elements to be used to provide visual feedback whilst building CSS systems and frameworks.</p>
      </header>
      <nav>
        <ul>
          <li>
            <a href="#text">Text</a>
            <ul>
              <li><a href="#text__headings">Headings</a></li>
              <li><a href="#text__paragraphs">Paragraphs</a></li>
              <li><a href="#text__lists">Lists</a></li>
              <li><a href="#text__blockquotes">Blockquotes</a></li>
              <li><a href="#text__details">Details / Summary</a></li>
              <li><a href="#text__address">Address</a></li>
              <li><a href="#text__hr">Horizontal rules</a></li>
              <li><a href="#text__tables">Tabular data</a></li>
              <li><a href="#text__code">Code</a></li>
              <li><a href="#text__inline">Inline elements</a></li>
              <li><a href="#text__comments">HTML Comments</a></li>
            </ul>
          </li>
          <li>
            <a href="#embedded">Embedded content</a>
            <ul>
              <li><a href="#embedded__images">Images</a></li>
              <li><a href="#embedded__bgimages">Background images</a></li>
              <li><a href="#embedded__audio">Audio</a></li>
              <li><a href="#embedded__video">Video</a></li>
              <li><a href="#embedded__canvas">Canvas</a></li>
              <li><a href="#embedded__meter">Meter</a></li>
              <li><a href="#embedded__progress">Progress</a></li>
              <li><a href="#embedded__svg">Inline SVG</a></li>
              <li><a href="#embedded__iframe">IFrames</a></li>
              <li><a href="#embedded__embed">Embed</a></li>
              <li><a href="#embedded__object">Object</a></li>
            </ul>
          </li>
          <li>
            <a href="#forms">Form elements</a>
            <ul>
              <li><a href="#forms__input">Input fields</a></li>
              <li><a href="#forms__select">Select menus</a></li>
              <li><a href="#forms__checkbox">Checkboxes</a></li>
              <li><a href="#forms__radio">Radio buttons</a></li>
              <li><a href="#forms__textareas">Textareas</a></li>
              <li><a href="#forms__html5">HTML5 inputs</a></li>
              <li><a href="#forms__action">Action buttons</a></li>
            </ul>
          </li>
        </ul>
      </nav>
      <main>
        <section id="text">
          <header><h1>Text</h1></header>
          <article id="text__headings">
            <header>
              <h2>Headings</h2>
            </header>
            <div>
              <h1>Heading 1</h1>
              <h2>Heading 2</h2>
              <h3>Heading 3</h3>
              <h4>Heading 4</h4>
              <h5>Heading 5</h5>
              <h6>Heading 6</h6>
            </div>
            <footer><p><a href="#top">[Top]</a></p></footer>
          </article>
          <article id="text__paragraphs">
            <header><h2>Paragraphs</h2></header>
            <div>
              <p>A paragraph (from the Greek paragraphos, “to write beside” or “written beside”) is a self-contained unit of a discourse in writing dealing with a particular point or idea. A paragraph consists of one or more sentences. Though not required by the syntax of any language, paragraphs are usually an expected part of formal writing, used to organize longer prose.</p>
            </div>
            <footer><p><a href="#top">[Top]</a></p></footer>
          </article>
          <article id="text__blockquotes">
            <header><h2>Blockquotes</h2></header>
            <div>
              <blockquote>
                <p>A block quotation (also known as a long quotation or extract) is a quotation in a written document, that is set off from the main text as a paragraph, or block of text.</p>
                <p>It is typically distinguished visually using indentation and a different typeface or smaller size quotation. It may or may not include a citation, usually placed at the bottom.</p>
                <cite><a href="#!">Said no one, ever.</a></cite>
              </blockquote>
            </div>
            <footer><p><a href="#top">[Top]</a></p></footer>
          </article>
          <article id="text__lists">
            <header><h2>Lists</h2></header>
            <div>
              <h3>Definition list</h3>
              <dl>
                <dt>Definition List Title</dt>
                <dd>This is a definition list division.</dd>
              </dl>
              <h3>Ordered List</h3>
              <ol type="1">
                <li>List Item 1</li>
                <li>
                  List Item 2
                  <ol type="A">
                    <li>List Item 1</li>
                    <li>
                      List Item 2
                      <ol type="a">
                        <li>List Item 1</li>
                        <li>
                          List Item 2
                          <ol type="I">
                            <li>List Item 1</li>
                            <li>
                              List Item 2
                              <ol type="i">
                                <li>List Item 1</li>
                                <li>List Item 2</li>
                                <li>List Item 3</li>
                              </ol>
                            </li>
                            <li>List Item 3</li>
                          </ol>
                        </li>
                        <li>List Item 3</li>
                      </ol>
                    </li>
                    <li>List Item 3</li>
                  </ol>
                </li>
                <li>List Item 3</li>
              </ol>
              <h3>Unordered List</h3>
              <ul>
                <li>List Item 1</li>
                <li>
                  List Item 2
                  <ul>
                    <li>List Item 1</li>
                    <li>
                      List Item 2
                      <ul>
                        <li>List Item 1</li>
                        <li>
                          List Item 2
                          <ul>
                            <li>List Item 1</li>
                            <li>
                              List Item 2
                              <ul>
                                <li>List Item 1</li>
                                <li>List Item 2</li>
                                <li>List Item 3</li>
                              </ul>
                            </li>
                            <li>List Item 3</li>
                          </ul>
                        </li>
                        <li>List Item 3</li>
                      </ul>
                    </li>
                    <li>List Item 3</li>
                  </ul>
                </li>
                <li>List Item 3</li>
              </ul>
            </div>
            <footer><p><a href="#top">[Top]</a></p></footer>
          </article>
          <article id="text__blockquotes">
            <header><h1>Blockquotes</h1></header>
            <div>
              <blockquote>
                <p>A block quotation (also known as a long quotation or extract) is a quotation in a written document, that is set off from the main text as a paragraph, or block of text.</p>
                <p>It is typically distinguished visually using indentation and a different typeface or smaller size quotation. It may or may not include a citation, usually placed at the bottom.</p>
                <cite><a href="#!">Said no one, ever.</a></cite>
              </blockquote>
            </div>
            <footer><p><a href="#top">[Top]</a></p></footer>
          </article>
          <article id="text__details">
            <header><h1>Details / Summary</h1></header>
            <details>
              <summary>Expand for details</summary>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum, odio! Odio natus ullam ad quaerat, eaque necessitatibus, aliquid distinctio similique voluptatibus dicta consequuntur animi. Quaerat facilis quidem unde eos! Ipsa.</p>
            </details>
            <footer><p><a href="#top">[Top]</a></p></footer>
          </article>
          <article id="text__address">
            <header><h1>Address</h1></header>
            <address>
              Written by <a href="mailto:webmaster@example.com">Jon Doe</a>.<br>
              Visit us at:<br>
              Example.com<br>
              Box 564, Disneyland<br>
              USA
            </address>
            <footer><p><a href="#top">[Top]</a></p></footer>
          </article>
          <article id="text__hr">
            <header><h2>Horizontal rules</h2></header>
            <div>
              <hr>
            </div>
            <footer><p><a href="#top">[Top]</a></p></footer>
          </article>
          <article id="text__tables">
            <header><h2>Tabular data</h2></header>
            <table>
              <caption>Table Caption</caption>
              <thead>
                <tr>
                  <th>Table Heading 1</th>
                  <th>Table Heading 2</th>
                  <th>Table Heading 3</th>
                  <th>Table Heading 4</th>
                  <th>Table Heading 5</th>
                </tr>
              </thead>
              <tfoot>
                <tr>
                  <th>Table Footer 1</th>
                  <th>Table Footer 2</th>
                  <th>Table Footer 3</th>
                  <th>Table Footer 4</th>
                  <th>Table Footer 5</th>
                </tr>
              </tfoot>
              <tbody>
                <tr>
                  <td>Table Cell 1</td>
                  <td>Table Cell 2</td>
                  <td>Table Cell 3</td>
                  <td>Table Cell 4</td>
                  <td>Table Cell 5</td>
                </tr>
                <tr>
                  <td>Table Cell 1</td>
                  <td>Table Cell 2</td>
                  <td>Table Cell 3</td>
                  <td>Table Cell 4</td>
                  <td>Table Cell 5</td>
                </tr>
                <tr>
                  <td>Table Cell 1</td>
                  <td>Table Cell 2</td>
                  <td>Table Cell 3</td>
                  <td>Table Cell 4</td>
                  <td>Table Cell 5</td>
                </tr>
                <tr>
                  <td>Table Cell 1</td>
                  <td>Table Cell 2</td>
                  <td>Table Cell 3</td>
                  <td>Table Cell 4</td>
                  <td>Table Cell 5</td>
                </tr>
              </tbody>
            </table>
            <footer><p><a href="#top">[Top]</a></p></footer>
          </article>
          <article id="text__code">
            <header><h2>Code</h2></header>
            <div>
              <p><strong>Keyboard input:</strong> <kbd>Cmd</kbd></p>
              <p><strong>Inline code:</strong> <code>&lt;div&gt;code&lt;/div&gt;</code></p>
              <p><strong>Sample output:</strong> <samp>This is sample output from a computer program.</samp></p>
              <h2>Pre-formatted text</h2>
              <pre>P R E F O R M A T T E D T E X T
    ! " # $ % &amp; ' ( ) * + , - . /
    0 1 2 3 4 5 6 7 8 9 : ; &lt; = &gt; ?
    @ A B C D E F G H I J K L M N O
    P Q R S T U V W X Y Z [ \\ ] ^ _
    \` a b c d e f g h i j k l m n o
    p q r s t u v w x y z { | } ~ </pre>
            </div>
            <footer><p><a href="#top">[Top]</a></p></footer>
          </article>
          <article id="text__inline">
            <header><h2>Inline elements</h2></header>
            <div>
              <p><a href="#!">This is a text link</a>.</p>
              <p><strong>Strong is used to indicate strong importance.</strong></p>
              <p><em>This text has added emphasis.</em></p>
              <p>The <b>b element</b> is stylistically different text from normal text, without any special importance.</p>
              <p>The <i>i element</i> is text that is offset from the normal text.</p>
              <p>The <u>u element</u> is text with an unarticulated, though explicitly rendered, non-textual annotation.</p>
              <p><del>This text is deleted</del> and <ins>This text is inserted</ins>.</p>
              <p><s>This text has a strikethrough</s>.</p>
              <p>Superscript<sup>®</sup>.</p>
              <p>Subscript for things like H<sub>2</sub>O.</p>
              <p><small>This small text is small for fine print, etc.</small></p>
              <p>Abbreviation: <abbr title="HyperText Markup Language">HTML</abbr></p>
              <p><q cite="https://developer.mozilla.org/en-US/docs/HTML/Element/q">This text is a short inline quotation.</q></p>
              <p><cite>This is a citation.</cite></p>
              <p>The <dfn>dfn element</dfn> indicates a definition.</p>
              <p>The <mark>mark element</mark> indicates a highlight.</p>
              <p>The <var>variable element</var>, such as <var>x</var> = <var>y</var>.</p>
              <p>The time element: <time datetime="2013-04-06T12:32+00:00">2 weeks ago</time></p>
            </div>
            <footer><p><a href="#top">[Top]</a></p></footer>
          </article>
          <article id="text__comments">
            <header><h2>HTML Comments</h2></header>
            <div>
              <p>There is comment here: <!--This comment should not be displayed--></p>
              <p>There is a comment spanning multiple tags and lines below here.</p>
              <!--<p><a href="#!">This is a text link. But it should not be displayed in a comment</a>.</p>
              <p><strong>Strong is used to indicate strong importance. But, it should not be displayed in a comment</strong></p>
              <p><em>This text has added emphasis. But, it should not be displayed in a comment</em></p>-->
            </div>
            <footer><p><a href="#top">[Top]</a></p></footer>
          </article>
        </section>
        <section id="embedded">
          <header><h2>Embedded content</h2></header>
          <article id="embedded__images">
            <header><h2>Images</h2></header>
            <div>
              <h3>Plain <code>&lt;img&gt;</code> element</h3>
              <p><img src="https://placekitten.com/480/480" alt="Photo of a kitten"></p>
              <h3><code>&lt;figure&gt;</code> element with <code>&lt;img&gt;</code> element</h3>
              <figure><img src="https://placekitten.com/420/420" alt="Photo of a kitten"></figure>
              <h3><code>&lt;figure&gt;</code> element with <code>&lt;img&gt;</code> and <code>&lt;figcaption&gt;</code> elements</h3>
              <figure>
                <img src="https://placekitten.com/420/420" alt="Photo of a kitten">
                <figcaption>Here is a caption for this image.</figcaption>
              </figure>
              <h3><code>&lt;figure&gt;</code> element with a <code>&lt;picture&gt;</code> element</h3>
              <figure>
                <picture>
                  <source srcset="https://placekitten.com/800/800"
                    media="(min-width: 800px)">
                  <img src="https://placekitten.com/420/420" alt="Photo of a kitten" />
                </picture>
              </figure>
            </div>
            <footer><p><a href="#top">[Top]</a></p></footer>
          </article>
          <article id="embedded__bgimages">
            <header><h2>Background images</h2></header>
            <div style="background-image:url('https://placekitten.com/300/300'); width:300px; height: 300px;"></div>
            <footer><p><a href="#top">[Top]</a></p></footer>
          </article>
          <article id="embedded__audio">
            <header><h2>Audio</h2></header>
            <div><audio controls="">audio</audio></div>
            <footer><p><a href="#top">[Top]</a></p></footer>
          </article>
          <article id="embedded__video">
            <header><h2>Video</h2></header>
            <div><video controls="">video</video></div>
            <footer><p><a href="#top">[Top]</a></p></footer>
          </article>
          <article id="embedded__canvas">
            <header><h2>Canvas</h2></header>
            <div><canvas>canvas</canvas></div>
            <footer><p><a href="#top">[Top]</a></p></footer>
          </article>
          <article id="embedded__meter">
            <header><h2>Meter</h2></header>
            <div><meter value="2" min="0" max="10">2 out of 10</meter></div>
            <footer><p><a href="#top">[Top]</a></p></footer>
          </article>
          <article id="embedded__progress">
            <header><h2>Progress</h2></header>
            <div><progress>progress</progress></div>
            <footer><p><a href="#top">[Top]</a></p></footer>
          </article>
          <article id="embedded__svg">
            <header><h2>Inline SVG</h2></header>
            <div><svg width="100px" height="100px"><circle cx="100" cy="100" r="100" fill="#1fa3ec"></circle></svg></div>
            <footer><p><a href="#top">[Top]</a></p></footer>
          </article>
          <article id="embedded__iframe">
            <header><h2>IFrame</h2></header>
            <div><iframe src="index.html" height="300"></iframe></div>
            <footer><p><a href="#top">[Top]</a></p></footer>
          </article>
          <article id="embedded__embed">
            <header><h2>Embed</h2></header>
            <div><embed src="index.html" height="300"></div>
            <footer><p><a href="#top">[Top]</a></p></footer>
          </article>
          <article id="embedded__object">
            <header><h2>Object</h2></header>
            <div><object data="index.html" height="300"></object></div>
            <footer><p><a href="#top">[Top]</a></p></footer>
          </article>
        </section>
        <section id="forms">
          <header><h2>Form elements</h2></header>
          <form>
            <fieldset id="forms__input">
              <legend>Input fields</legend>
              <p>
                <label for="input__text">Text Input</label>
                <input id="input__text" type="text" placeholder="Text Input">
              </p>
              <p>
                <label for="input__password">Password</label>
                <input id="input__password" type="password" placeholder="Type your Password">
              </p>
              <p>
                <label for="input__webaddress">Web Address</label>
                <input id="input__webaddress" type="url" placeholder="https://yoursite.com">
              </p>
              <p>
                <label for="input__emailaddress">Email Address</label>
                <input id="input__emailaddress" type="email" placeholder="name@email.com">
              </p>
              <p>
                <label for="input__phone">Phone Number</label>
                <input id="input__phone" type="tel" placeholder="(999) 999-9999">
              </p>
              <p>
                <label for="input__search">Search</label>
                <input id="input__search" type="search" placeholder="Enter Search Term">
              </p>
              <p>
                <label for="input__text2">Number Input</label>
                <input id="input__text2" type="number" placeholder="Enter a Number">
              </p>
              <p>
                <label for="input__file">File Input</label>
                <input id="input__file" type="file">
              </p>
            </fieldset>
            <p><a href="#top">[Top]</a></p>
            <fieldset id="forms__select">
              <legend>Select menus</legend>
              <p>
                <label for="select">Select</label>
                <select id="select">
                  <optgroup label="Option Group">
                    <option>Option One</option>
                    <option>Option Two</option>
                    <option>Option Three</option>
                  </optgroup>
                </select>
              </p>
              <p>
                <label for="select_multiple">Select (multiple)</label>
                <select id="select_multiple" multiple="multiple">
                  <optgroup label="Option Group">
                    <option>Option One</option>
                    <option>Option Two</option>
                    <option>Option Three</option>
                  </optgroup>
                </select>
              </p>
            </fieldset>
            <p><a href="#top">[Top]</a></p>
            <fieldset id="forms__checkbox">
              <legend>Checkboxes</legend>
              <ul>
                <li><label for="checkbox1"><input id="checkbox1" name="checkbox" type="checkbox" checked="checked"> Choice A</label></li>
                <li><label for="checkbox2"><input id="checkbox2" name="checkbox" type="checkbox"> Choice B</label></li>
                <li><label for="checkbox3"><input id="checkbox3" name="checkbox" type="checkbox"> Choice C</label></li>
              </ul>
            </fieldset>
            <p><a href="#top">[Top]</a></p>
            <fieldset id="forms__radio">
              <legend>Radio buttons</legend>
              <ul>
                <li><label for="radio1"><input id="radio1" name="radio" type="radio" checked="checked"> Option 1</label></li>
                <li><label for="radio2"><input id="radio2" name="radio" type="radio"> Option 2</label></li>
                <li><label for="radio3"><input id="radio3" name="radio" type="radio"> Option 3</label></li>
              </ul>
            </fieldset>
            <p><a href="#top">[Top]</a></p>
            <fieldset id="forms__textareas">
              <legend>Textareas</legend>
              <p>
                <label for="textarea">Textarea</label>
                <textarea id="textarea" rows="8" cols="48" placeholder="Enter your message here"></textarea>
              </p>
            </fieldset>
            <p><a href="#top">[Top]</a></p>
            <fieldset id="forms__html5">
              <legend>HTML5 inputs</legend>
              <p>
                <label for="ic">Color input</label>
                <input type="color" id="ic" value="#000000">
              </p>
              <p>
                <label for="in">Number input</label>
                <input type="number" id="in" min="0" max="10" value="5">
              </p>
              <p>
                <label for="ir">Range input</label>
                <input type="range" id="ir" value="10">
              </p>
              <p>
                <label for="idd">Date input</label>
                <input type="date" id="idd" value="1970-01-01">
              </p>
              <p>
                <label for="idm">Month input</label>
                <input type="month" id="idm" value="1970-01">
              </p>
              <p>
                <label for="idw">Week input</label>
                <input type="week" id="idw" value="1970-W01">
              </p>
              <p>
                <label for="idt">Datetime input</label>
                <input type="datetime" id="idt" value="1970-01-01T00:00:00Z">
              </p>
              <p>
                <label for="idtl">Datetime-local input</label>
                <input type="datetime-local" id="idtl" value="1970-01-01T00:00">
              </p>
              <p>
                <label for="idl">Datalist</label>
                <input type="text" id="idl" list="example-list">
                <datalist id="example-list">
                  <option value="Example #1" />
                  <option value="Example #2" />
                  <option value="Example #3" />
                </datalist>
              </p>
            </fieldset>
            <p><a href="#top">[Top]</a></p>
            <fieldset id="forms__action">
              <legend>Action buttons</legend>
              <p>
                <input type="submit" value="<input type=submit>">
                <input type="button" value="<input type=button>">
                <input type="reset" value="<input type=reset>">
                <input type="submit" value="<input disabled>" disabled>
              </p>
              <p>
                <button type="submit">&lt;button type=submit&gt;</button>
                <button type="button">&lt;button type=button&gt;</button>
                <button type="reset">&lt;button type=reset&gt;</button>
                <button type="button" disabled>&lt;button disabled&gt;</button>
              </p>
            </fieldset>
            <p><a href="#top">[Top]</a></p>
          </form>
        </section>
      </main>
      <footer>
        <p>Made by <a href="http://twitter.com/cbracco">@cbracco</a>. Code on <a href="http://github.com/cbracco/html5-test-page">GitHub</a>.</p>
      </footer>
    </div>
    `,
  )

  return html
}
