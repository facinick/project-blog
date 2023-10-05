import Card from "@/components/Card";
import { BLOG_TITLE } from "@/constants";
import Link from "next/link";
import styles from "./not-found.module.css";

export const metadata = {
  title: `404 Not found • ${BLOG_TITLE}`,
};

export default function NotFound() {
  return (
    <Card as="section" className={styles.wrapper}>
      <h2 className={styles.title}>404 Not Found</h2>
      <p className={styles.description}>
        Woops, the page you are trying to visit does not exist.
      </p>
      <Link href="/">Return Home</Link>
    </Card>
  );
}
