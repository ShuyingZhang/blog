# AI日志 - 个人博客网站

## 网站简介

一个记录AI学习之旅的个人博客网站，分享技术心得、随笔感悟。

访问地址：https://ai-blog-e0n0vzpvd-duringzn-5638s-projects.vercel.app/

---

## 已实现功能

### 1. 首页
- 个人介绍与网站简介
- 最新文章列表展示
- 文章搜索功能

### 2. 博客列表与分类
- 所有文章按时间倒序展示
- 分类导航：学习笔记、技术分享、随笔感悟
- 分类页面筛选特定类型文章

### 3. 博客详情
- 文章标题、发布日期展示
- 文章内容阅读
- 返回首页导航

### 4. 搜索功能
- 支持按标题和内容搜索
- 搜索结果实时过滤
- 显示搜索结果数量

### 5. RSS订阅
- 访问 `/feed.xml` 获取RSS订阅
- 兼容主流RSS阅读器

### 6. 深色模式
- 点击Header右上角按钮切换
- 自动记住用户偏好
- 支持系统主题跟随

### 7. 关于页面
- 个人介绍
- 技能标签展示
- 联系方式

---

## 技术栈

### 前端
- **Next.js 14** - React框架（App Router）
- **TypeScript** - 类型安全
- **Tailwind CSS** - 样式框架
- **date-fns** - 日期格式化

### 后端/数据库
- **Neon** - Serverless PostgreSQL 数据库
- **Drizzle ORM** - TypeScript ORM

### 部署
- **Vercel** - 部署平台
- **GitHub** - 代码仓库（两个仓库：blog 和 ai-blog）

---

## 使用的AI模型

本项目开发过程中使用了 **Claude Code**（Claude Opus 4.5）作为AI编程助手。

### AI Coding Plan 使用体验

1. **代码生成**：快速生成Next.js组件、数据库Schema等代码骨架
2. **问题排查**：协助定位和修复构建错误、类型错误
3. **文档编写**：自动生成数据库设计文档、功能说明文档
4. **方案建议**：提供技术选型建议，如ORM选择、部署方案等

### 使用心得

- AI适合生成代码骨架和解决明确的问题
- 复杂的业务逻辑仍需人工设计和把控
- 数据库相关的配置需要仔细验证
- 构建错误需要结合日志和AI建议逐步排查

---

## 研发心得

### 项目开发历程

1. **起步阶段**
   - 使用 Next.js 14 搭建项目骨架
   - 配置 Tailwind CSS 实现响应式设计
   - 实现基础的主题切换功能

2. **数据库集成**
   - 选择 Neon 作为 Serverless PostgreSQL 方案
   - 使用 Drizzle ORM 进行数据操作
   - 实现 posts 表的增删改查功能
   - 添加软删除机制保护数据

3. **功能完善**
   - 添加搜索功能实现文章过滤
   - 实现 RSS 订阅功能
   - 添加分类功能支持文章分类浏览

4. **部署上线**
   - 配置 Vercel 部署
   - 处理构建时的数据库连接问题
   - 实现懒加载数据库避免构建失败

### 技术收获

- **Next.js App Router**：掌握了动态路由、Server Components 等新特性
- **TypeScript**：深入理解了类型定义和接口继承
- **Drizzle ORM**：学会了 schema 定义和查询构建
- **Vercel 部署**：了解了环境变量配置和构建优化

### 经验教训

1. **数据库连接**：构建时不要直接连接数据库，使用懒加载或动态渲染
2. **类型安全**：提前定义好接口，避免运行时错误
3. **双仓库同步**：Vercel 可能绑定不同仓库，需要保持代码同步
4. **缓存问题**：部署后可能需要强制刷新或删除重建

---

## 数据库设计

### posts 表
| 字段 | 类型 | 说明 |
|------|------|------|
| id | SERIAL | 主键，自增 |
| title | VARCHAR(255) | 文章标题 |
| content | TEXT | 文章内容 |
| excerpt | TEXT | 文章摘要 |
| created_at | TIMESTAMP | 创建时间 |
| deleted_at | TIMESTAMP | 软删除时间 |

### categories 表
| 字段 | 类型 | 说明 |
|------|------|------|
| id | SERIAL | 主键 |
| name | TEXT | 分类名称 |
| slug | TEXT | 分类别名（URL用） |

### post_categories 表（关联表）
| 字段 | 类型 | 说明 |
|------|------|------|
| post_id | INTEGER | 文章ID |
| category_id | INTEGER | 分类ID |

---

## 项目结构

```
blog/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.tsx           # 首页
│   │   ├── about/             # 关于页面
│   │   ├── posts/[slug]/      # 文章详情页
│   │   ├── category/[slug]/   # 分类页面
│   │   └── feed.xml/          # RSS订阅
│   ├── components/            # React组件
│   │   ├── Header.tsx         # 导航栏
│   │   ├── Footer.tsx         # 页脚
│   │   ├── Avatar.tsx         # 头像
│   │   └── ThemeToggle.tsx    # 主题切换
│   ├── context/               # React Context
│   │   └── ThemeContext.tsx   # 主题状态
│   └── db/                    # 数据库
│       ├── index.ts           # 数据库连接
│       ├── schema.ts          # 表结构定义
│       ├── posts.ts           # 文章数据操作
│       └── categories.ts      # 分类数据操作
├── content/posts/             # Markdown文章（本地备份）
├── docs/                      # 文档
│   └── database-design.md     # 数据库设计说明
└── drizzle.config.ts          # Drizzle配置
```

---

## 开发与部署

### 本地开发

```bash
cd blog
npm run dev
# 访问 http://localhost:3000
```

### 构建测试

```bash
npm run build
```

### 代码推送

```bash
# 推送到两个仓库
git push origin main     # blog 仓库
git push ai-blog main    # ai-blog 仓库
```

### 环境变量

DATABASE_URL - Neon数据库连接字符串

---

## 文章列表

| 标题 | 分类 | 日期 |
|------|------|------|
| 知行合一 | 随笔感悟 | 2025-01-09 |
| 日知录 | 随笔感悟 | 2025-01-08 |
| Hello World - 我的AI探索之旅 | 技术分享 | 2025-01-07 |
| LLM提示词工程入门指南 | 技术分享 | 2025-01-06 |
| 随想三则 | 随笔感悟 | 2025-01-04 |
| 月在天心，人在途中 | 随笔感悟 | 2024-09-17 |

---

## 后续优化方向

- [ ] 添加文章标签功能
- [ ] 添加访客留言/评论功能
- [ ] 添加网站访问统计
- [ ] 添加文章阅读量统计
- [ ] 支持文章编辑功能

---

最后更新：2025-01-07
