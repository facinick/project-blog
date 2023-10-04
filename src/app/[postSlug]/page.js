import BlogHero from "@/components/BlogHero";
import CodeSnippet from "@/components/CodeSnippet";
import { BLOG_TITLE } from "@/constants";
import { loadBlogPost } from "@/helpers/file-helpers";
import { MDXRemote } from "next-mdx-remote/rsc";
import styles from "./postSlug.module.css";

export async function generateMetadata({ params }) {
  const { frontmatter } = await loadBlogPost(params.postSlug);
  const { title, abstract, publishedOn } = frontmatter;

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

const components = {
  pre: (props) => <CodeSnippet>{props.children}</CodeSnippet>,
};

async function BlogPost({ params }) {
  const { frontmatter, content } = await loadBlogPost(params.postSlug);

  return (
    <article className={styles.wrapper}>
      <BlogHero
        title={frontmatter.title}
        publishedOn={frontmatter.publishedOn}
      />
      <div className={styles.page}>
        <MDXRemote components={{ ...components }} source={content} />
      </div>
    </article>
  );
}

export default BlogPost;
