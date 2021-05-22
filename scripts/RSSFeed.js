/* eslint-disable import/no-extraneous-dependencies */
const { promises: fs } = require('fs');
const path = require('path');
const RSS = require('rss');
const matter = require('gray-matter');

async function generateRSSFeed(locale) {

  const isESLocale = locale === 'es' ? 'es/' : ''
  const feed = new RSS({
    title: 'Adrián Serrano',
    site_url: 'https://adrserr.com',
    feed_url: `https://adrserr.com/${isESLocale}rss.xml`,
    language: locale
  })

  const posts = await fs.readdir(path.join(__dirname, '..', 'data', 'posts', locale))

  await Promise.all(
    posts.map(async (name) => {
      const content = await fs.readFile(
        path.join(__dirname, '..', 'data', 'posts', locale,  name)
      );
      const frontmatter = matter(content);

      feed.item({
        title: frontmatter.data.title,
        url: `https://adrserr.com/${isESLocale}blog/${  name.replace(/\.mdx?/, '')}`,
        date: frontmatter.data.publishedAt,
        description: frontmatter.data.summary
      });
    })
  );

  await fs.writeFile(`./public/${isESLocale}rss.xml`, feed.xml({ indent: true }));
}

async function generateFeeds () {
  generateRSSFeed('es')
  generateRSSFeed('en')
}

generateFeeds()
