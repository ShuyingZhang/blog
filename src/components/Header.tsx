import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-gray-900 dark:text-white hover:text-primary-500 transition-colors">
          AI日志
        </Link>
        <nav className="flex items-center gap-6">
          <Link href="/" className="text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
            日志
          </Link>
          <Link href="/about" className="text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
            关于
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
