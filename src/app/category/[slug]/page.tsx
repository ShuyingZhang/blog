import Link from "next/link";
import { getPostsByCategory, getAllCategories } from "@/db/categories";
import { format } from "date-fns";
import { notFound } from "next/navigation";

export const dynamic = 'force-dynamic';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const categories = await getAllCategories();
  const category = categories.find((c) => c.slug === slug);

  if (!category) {
    return { title: "分类未找到" };
  }

  return {
    title: `${category.name} | AI日志`,
    description: `${category.name}分类下的所有文章`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const categories = await getAllCategories();
  const category = categories.find((c) => c.slug === slug);

  if (!category) {
    notFound();
  }

  const posts = await getPostsByCategory(slug);

  return (
    <div className="animate-fade-in">
      <header className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-primary-500 hover:text-primary-600 mb-6 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          返回首页
        </Link>

        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {category.name}
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          共 {posts.length} 篇文章
        </p>
      </header>

      {/* 分类导航 */}
      <nav className="mb-8 flex flex-wrap gap-2">
        {categories.map((c) => (
          <Link
            key={c.id}
            href={`/category/${c.slug}`}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              c.slug === slug
                ? "bg-primary-500 text-white"
                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-primary-100 dark:hover:bg-primary-900/30"
            }`}
          >
            {c.name}
          </Link>
        ))}
      </nav>

      {posts.length === 0 ? (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          <p>该分类下暂无文章</p>
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
                </div>
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
