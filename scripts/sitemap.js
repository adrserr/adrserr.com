const fs = require('fs');

const globby = require('globby');
const prettier = require('prettier');

(async () => {
  const prettierConfig = await prettier.resolveConfig('./.prettierrc.js')
  const pages = await globby([
    'pages/*.tsx',
    'data/**/*.mdx',
    '!pages/_*.tsx',
    '!pages/api'
  ])

  // FIXME: Refactor
  const sitemap = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
            ${pages
              .map((page) => {
                if(page.includes('pages')) {
                  const path =page.replace('pages', '').replace('.tsx', '').replace('index', '')
                  const route = path === '/' ? '' : path
                   return `
                        <url>
                           <loc>${`https://adrserr.com/es${route}`}</loc>
                           <xhtml:link 
                            rel="alternate"
                            hreflang="es"
                            href="${`https://adrserr.com/es${route}`}"/>
                         <xhtml:link 
                            rel="alternate"
                            hreflang="en"
                            href="${`https://adrserr.com${route}`}"/>
                        </url>
                        <url>
                           <loc>${`https://adrserr.com${route}`}</loc>
                           <xhtml:link 
                            rel="alternate"
                            hreflang="es"
                            href="${`https://adrserr.com/es${route}`}"/>
                         <xhtml:link 
                            rel="alternate"
                            hreflang="en"
                            href="${`https://adrserr.com${route}`}"/>
                        </url>
                      `

                }
                if(page.includes('data/posts')) {
                  const path = page.replace('data/posts/en', 'blog')
                        .replace('data/posts/es', 'es/blog')
                        .replace('.mdx', '')
                        const child = path === '/' ? '' : `<xhtml:link 
                            rel="alternate"
                            hreflang="es"
                            href="${`https://adrserr.com/${path}`}"/>
                          <xhtml:link 
                            rel="alternate"
                            hreflang="en"
                            href="${`https://adrserr.com/${path}`}"/>`
                        return `<url>
                                        <loc>${`https://adrserr.com/${path}`}</loc>
                                        ${child}
                                    </url>`
                }
             
              })
              .join('')}
        </urlset>
    `

  const formatted = prettier.format(sitemap, {
    ...prettierConfig,
    parser: 'html'
  })

  // eslint-disable-next-line no-sync
  fs.writeFileSync('public/sitemap.xml', formatted)
})();
