import { eq, desc, isNull } from "drizzle-orm";
import { db, getDb, schema } from "./index";

export interface Post {
  id: number;
  title: string;
  content: string | null;
  excerpt: string | null;
  createdAt: Date;
  deletedAt: Date | null;
}

export async function getAllPosts(): Promise<Post[]> {
  const database = getDb();
  const result = await database
    .select({
      id: schema.posts.id,
      title: schema.posts.title,
      excerpt: schema.posts.excerpt,
      createdAt: schema.posts.createdAt,
      content: schema.posts.content,
      deletedAt: schema.posts.deletedAt,
    })
    .from(schema.posts)
    .where(isNull(schema.posts.deletedAt))
    .orderBy(desc(schema.posts.createdAt));

  return result as Post[];
}

export async function getPostById(id: number): Promise<Post | undefined> {
  const database = getDb();
  const result = await database
    .select()
    .from(schema.posts)
    .where(eq(schema.posts.id, id))
    .limit(1);
  return result[0] as Post | undefined;
}

export async function createPost(
  title: string,
  content: string,
  excerpt?: string,
): Promise<Post> {
  const database = getDb();
  const result = await database
    .insert(schema.posts)
    .values({ title, content, excerpt: excerpt || content.substring(0, 200) })
    .returning();
  return result[0] as Post;
}

export async function deletePost(id: number): Promise<void> {
  const database = getDb();
  await database
    .update(schema.posts)
    .set({ deletedAt: new Date() })
    .where(eq(schema.posts.id, id));
}
