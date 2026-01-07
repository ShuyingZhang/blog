import Avatar from '@/components/Avatar';

export default function About() {
  return (
    <div className="animate-slide-up max-w-3xl mx-auto">
      <div className="text-center mb-12">
        <Avatar />
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          你好，我是AI探索者
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          一个热爱人工智能的普通开发者
        </p>
      </div>

      <section className="space-y-8">
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span className="text-2xl">💡</span>
            关于我
          </h2>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              我是一个对人工智能充满热情的探索者。在这个AI快速发展的时代，我希望通过这个博客记录我的学习历程，分享我的心得体会。
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
              我相信AI将会深刻改变我们的生活和工作方式。作为一个AI爱好者，我致力于学习和探索最新的AI技术和应用。
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span className="text-2xl">🛠️</span>
            技能标签
          </h2>
          <div className="flex flex-wrap gap-3">
            {[
              '机器学习',
              '深度学习',
              '自然语言处理',
              '计算机视觉',
              '提示词工程',
              'AI工具应用',
              'Python',
              '数据分析',
            ].map((skill) => (
              <span
                key={skill}
                className="px-4 py-2 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span className="text-2xl">📚</span>
            博客内容
          </h2>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-primary-500 mt-1">•</span>
              <span><strong>技术笔记</strong> - 记录AI相关技术的学习笔记</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-500 mt-1">•</span>
              <span><strong>工具评测</strong> - 分享各种AI工具的使用体验</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-500 mt-1">•</span>
              <span><strong>行业观察</strong> - 追踪AI领域的最新动态</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-500 mt-1">•</span>
              <span><strong>思考随笔</strong> - 对AI与人类关系的深度思考</span>
            </li>
          </ul>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span className="text-2xl">🔗</span>
            联系我
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            如果你对AI感兴趣，欢迎交流学习！
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              GitHub
            </a>
            <a
              href="mailto:hello@example.com"
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              邮件
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
