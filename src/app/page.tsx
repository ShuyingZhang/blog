import Link from "next/link";
import { getAllPosts } from "@/db/posts";
import { format } from "date-fns";

// 强制动态渲染，避免构建时连接数据库
export const dynamic = "force-dynamic";

export default async function Home() {
  const posts = await getAllPosts();

  return (
    <div className="animate-fade-in">
      <section className="text-center py-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          AI日志
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          记录AI学习之旅，分享技术心得，与你一起探索人工智能的无限可能
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 pb-2 border-b border-gray-200 dark:border-gray-700">
          最新日志
        </h2>

        {posts.length === 0 ? (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            <p>暂无日志文章</p>
            <p className="mt-2 text-sm">在数据库中添加文章即可</p>
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <article
                key={post.id}
                className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:border-primary-500 dark:hover:border-primary-400 transition-all duration-300 hover:shadow-lg"
              >
                <Link href={`/posts/${post.id}`} className="block group">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors">
                    {post.title}
                  </h3>
                  {post.excerpt && (
                    <p className="text-gray-600 dark:text-gray-300 mt-2 line-clamp-2">
                      {post.excerpt}
                    </p>
                  )}
                  <div className="flex items-center gap-4 mt-4 text-sm text-gray-500 dark:text-gray-400">
                    <time dateTime={post.createdAt.toISOString()}>
                      {format(post.createdAt, "yyyy年MM月dd日")}
                    </time>
                    <span className="flex items-center gap-1">
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
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                      阅读全文
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
