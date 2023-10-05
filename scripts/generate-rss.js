import RSS from "rss";
import {
  BLOG_DESCRIPTION,
  BLOG_TITLE,
  FEED_URL,
  SITE_URL,
} from "../src/constants";

import {
  getBlogPostList,
  getPostFullUrl,
  saveRss,
} from "../src/helpers/file-helpers";

async function generateFeed() {
  const blogPosts = await getBlogPostList();

  const feed = new RSS({
    title: BLOG_TITLE,
    description: BLOG_DESCRIPTION,
    feed_url: FEED_URL,
    site_url: SITE_URL,
  });

  blogPosts.forEach((post) => {
    feed.item({
      title: post.title,
      description: post.abstract,
      date: post.publishedOn,
      url: getPostFullUrl(post.slug),
      guid: post.slug,
    });
  });

  const xml = feed.xml({ indent: true });

  await saveRss(xml);
}

generateFeed();
