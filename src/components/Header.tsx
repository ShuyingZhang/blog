import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-bold text-gray-900 dark:text-white hover:text-primary-500 transition-colors"
        >
          AI日志
        </Link>
        <nav className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2">
            <Link
              href="/"
              className="text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors text-sm"
            >
              最新
            </Link>
            <Link
              href="/category/study"
              className="text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors text-sm"
            >
              学习笔记
            </Link>
            <Link
              href="/category/tech"
              className="text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors text-sm"
            >
              技术分享
            </Link>
            <Link
              href="/category/essay"
              className="text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors text-sm"
            >
              随笔感悟
            </Link>
          </div>
          <span className="md:hidden text-gray-400">|</span>
          <Link
            href="/about"
            className="text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors text-sm"
          >
            关于
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
