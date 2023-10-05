import BlogHero from "@/components/BlogHero";
import { BLOG_TITLE } from "@/constants";
import { loadBlogPost } from "@/helpers/file-helpers";
import MDX_COMPONENTS_MAP from "@/helpers/mdx-components";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import styles from "./postSlug.module.css";

export async function generateMetadata({ params }) {
  const post = await loadBlogPost(params.postSlug);

  if (post === null) {
    return null;
  }

  const { title, abstract, publishedOn } = post.frontmatter;

  const metadataTitle = `${title} • ${BLOG_TITLE}`;

  return {
    title: metadataTitle,
    description: abstract,
    openGraph: {
      title: metadataTitle,
      description: abstract,
      type: "article",
      publishedTime: publishedOn,
    },
  };
}

async function BlogPost({ params }) {
  const post = await loadBlogPost(params.postSlug);

  if (post === null) {
    notFound();
  }

  const { frontmatter, content } = post;

  return (
    <article className={styles.wrapper}>
      <BlogHero
        title={frontmatter.title}
        publishedOn={frontmatter.publishedOn}
      />
      <div className={styles.page}>
        <MDXRemote components={MDX_COMPONENTS_MAP} source={content} />
      </div>
    </article>
  );
}

export default BlogPost;
