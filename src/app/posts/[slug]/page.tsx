import { getPostById } from "@/db/posts";
import Link from "next/link";
import { format } from "date-fns";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const id = parseInt(slug);
  const post = await getPostById(id);

  if (!post) {
    return { title: "文章未找到" };
  }

  return {
    title: `${post.title} | AI日志`,
    description: post.content?.substring(0, 100) || "",
  };
}

export default async function Post({ params }: Props) {
  const { slug } = await params;
  const id = parseInt(slug);
  const post = await getPostById(id);

  if (!post) {
    notFound();
  }

  return (
    <article className="animate-fade-in max-w-3xl mx-auto">
      <header className="mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-primary-500 hover:text-primary-600 mb-6 transition-colors"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          返回首页
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {post.title}
        </h1>

        <time
          className="text-gray-500 dark:text-gray-400"
          dateTime={post.createdAt.toISOString()}
        >
          {format(post.createdAt, "yyyy年MM月dd日")}
        </time>
      </header>

      <div
        className="prose dark:prose-invert max-w-none
          prose-headings:font-semibold
          prose-a:text-primary-500 dark:prose-a:text-primary-400
          prose-a:no-underline hover:prose-a:underline
          prose-code:bg-gray-100 dark:prose-code:bg-gray-800
          prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
          prose-pre:bg-gray-900 dark:prose-pre:bg-gray-950
          prose-pre:rounded-xl
          prose-li:text-gray-700 dark:prose-li:text-gray-300
          prose-strong:text-gray-900 dark:prose-strong:text-white"
      >
        {post.content ? (
          <div className="whitespace-pre-wrap">{post.content}</div>
        ) : (
          <p className="text-gray-500">暂无内容</p>
        )}
      </div>

      <footer className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-primary-500 hover:text-primary-600 transition-colors"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          返回首页
        </Link>
      </footer>
    </article>
  );
}
