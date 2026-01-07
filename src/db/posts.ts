import { eq, desc, isNull } from "drizzle-orm";
import { db } from "./index";
import { posts } from "./schema";

export interface Post {
  id: number;
  title: string;
  content: string | null;
  excerpt: string | null;
  createdAt: Date;
  deletedAt: Date | null;
}

export async function getAllPosts(): Promise<Post[]> {
  const result = await db
    .select({
      id: posts.id,
      title: posts.title,
      excerpt: posts.excerpt,
      createdAt: posts.createdAt,
      content: posts.content,
      deletedAt: posts.deletedAt,
    })
    .from(posts)
    .where(isNull(posts.deletedAt))
    .orderBy(desc(posts.createdAt));

  return result as Post[];
}

export async function getPostById(id: number): Promise<Post | undefined> {
  const result = await db.select().from(posts).where(eq(posts.id, id)).limit(1);
  return result[0] as Post | undefined;
}

export async function createPost(
  title: string,
  content: string,
  excerpt?: string,
): Promise<Post> {
  const result = await db
    .insert(posts)
    .values({ title, content, excerpt: excerpt || content.substring(0, 200) })
    .returning();
  return result[0] as Post;
}

export async function deletePost(id: number): Promise<void> {
  await db.update(posts).set({ deletedAt: new Date() }).where(eq(posts.id, id));
}
