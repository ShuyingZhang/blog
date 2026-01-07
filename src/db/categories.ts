import { eq, desc, isNull } from "drizzle-orm";
import { db, getDb, schema } from "./index";
import type { Post } from "./posts";

export interface Category {
  id: number;
  name: string;
  slug: string;
  postCount?: number;
}

export interface PostWithCategory extends Post {
  categories?: Category[];
}

export async function getAllCategories(): Promise<Category[]> {
  const database = getDb();
  const result = await database.select().from(schema.categories);
  return result as Category[];
}

export async function getPostsByCategory(
  slug: string,
): Promise<PostWithCategory[]> {
  const database = getDb();

  // 先找到分类ID
  const catResult = await database
    .select()
    .from(schema.categories)
    .where(eq(schema.categories.slug, slug));

  if (catResult.length === 0) return [];

  // 找到该分类下的所有文章
  const result = await database
    .select({
      id: schema.posts.id,
      title: schema.posts.title,
      excerpt: schema.posts.excerpt,
      content: schema.posts.content,
      createdAt: schema.posts.createdAt,
      deletedAt: schema.posts.deletedAt,
      categoryId: schema.categories.id,
      categoryName: schema.categories.name,
      categorySlug: schema.categories.slug,
    })
    .from(schema.postCategories)
    .innerJoin(schema.posts, eq(schema.postCategories.postId, schema.posts.id))
    .innerJoin(
      schema.categories,
      eq(schema.postCategories.categoryId, schema.categories.id),
    )
    .where(isNull(schema.posts.deletedAt))
    .orderBy(desc(schema.posts.createdAt));

  // 去重并添加分类信息
  const postsMap = new Map<number, PostWithCategory>();
  for (const row of result) {
    if (!postsMap.has(row.id)) {
      postsMap.set(row.id, {
        id: row.id,
        title: row.title,
        excerpt: row.excerpt,
        content: row.content,
        createdAt: row.createdAt,
        deletedAt: row.deletedAt,
        categories: [],
      });
    }
    postsMap.get(row.id)?.categories?.push({
      id: row.categoryId,
      name: row.categoryName,
      slug: row.categorySlug,
    });
  }

  return Array.from(postsMap.values());
}
