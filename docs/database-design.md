# 数据库设计说明

## 概述

本文档描述 AI日志博客系统的数据库设计方案，使用 Neon PostgreSQL 作为数据存储。

## 数据库信息

- **服务提供商**: Neon (Serverless PostgreSQL)
- **项目名称**: project_neon_blog
- **数据库名称**: neondb
- **连接字符串**: 已配置在 `.env.local` 中

## 表结构

### posts 表

存储博客文章的核心数据表。

```sql
CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP
);
```

| 字段名 | 类型 | 约束 | 说明 |
|--------|------|------|------|
| `id` | SERIAL | PRIMARY KEY | 文章唯一标识，自增主键 |
| `title` | VARCHAR(255) | NOT NULL | 文章标题，最大255字符 |
| `content` | TEXT | - | 文章完整内容，支持长文本 |
| `created_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | 文章创建时间，自动记录 |
| `deleted_at` | TIMESTAMP | - | 软删除时间，NULL表示未删除 |

### 设计说明

#### 软删除机制

使用 `deleted_at` 字段实现软删除：
- 当 `deleted_at` 为 `NULL` 时，文章正常显示
- 当设置具体时间戳时，文章被视为已删除
- 此设计便于数据恢复和审计追踪

#### 自增主键

`id` 字段使用 `SERIAL` 类型，自动生成唯一标识，适合博客文章的 URL 路由（如 `/posts/1`）。

#### 时间戳

`created_at` 自动记录文章创建时间，便于排序和展示。

## 索引设计

```sql
-- 查询未删除文章（隐式使用主键索引）
SELECT * FROM posts WHERE deleted_at IS NULL;

-- 按时间倒序查询
SELECT * FROM posts WHERE deleted_at IS NULL ORDER BY created_at DESC;
```

## 典型查询

### 获取所有文章列表

```sql
SELECT id, title, created_at
FROM posts
WHERE deleted_at IS NULL
ORDER BY created_at DESC;
```

### 获取单篇文章

```sql
SELECT * FROM posts WHERE id = 1 AND deleted_at IS NULL;
```

### 软删除文章

```sql
UPDATE posts SET deleted_at = CURRENT_TIMESTAMP WHERE id = 1;
```

### 恢复已删除文章

```sql
UPDATE posts SET deleted_at = NULL WHERE id = 1;
```

## 后续扩展建议

### 分类表 (categories)

```sql
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL UNIQUE
);
```

### 文章分类关联表 (post_categories)

```sql
CREATE TABLE post_categories (
  post_id INTEGER REFERENCES posts(id),
  category_id INTEGER REFERENCES categories(id),
  PRIMARY KEY (post_id, category_id)
);
```

### 标签表 (tags)

```sql
CREATE TABLE tags (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE post_tags (
  post_id INTEGER REFERENCES posts(id),
  tag_id INTEGER REFERENCES tags(id),
  PRIMARY KEY (post_id, tag_id)
);
```

### 用户表 (users) - 可选

如需支持多用户博客，可添加用户表：

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

并为 posts 表添加作者关联：

```sql
ALTER TABLE posts ADD COLUMN user_id INTEGER REFERENCES users(id);
```

## 环境配置

连接数据库需要在 `.env.local` 中配置：

```env
DATABASE_URL=postgresql://neondb_owner:xxx@ep-xxx.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
```

**注意**: 请勿将 `.env.local` 提交到公开仓库，避免泄露数据库凭证。
