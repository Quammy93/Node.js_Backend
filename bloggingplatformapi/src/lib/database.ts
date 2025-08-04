// Database utility functions for production use
// This would replace the in-memory storage in a real application

export interface BlogPost {
  id: number
  title: string
  content: string
  category: string
  tags: string[]
  createdAt: string
  updatedAt: string
}

// Mock database functions - replace with real database calls
export class BlogPostService {
  private static posts: BlogPost[] = [
    {
      id: 1,
      title: "Getting Started with Next.js",
      content: "Next.js is a powerful React framework that makes building web applications easier.",
      category: "Technology",
      tags: ["Next.js", "React", "Web Development"],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ]

  private static nextId = 2

  static async getAllPosts(searchTerm?: string): Promise<BlogPost[]> {
    let filteredPosts = this.posts

    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filteredPosts = this.posts.filter(
        (post) =>
          post.title.toLowerCase().includes(term) ||
          post.content.toLowerCase().includes(term) ||
          post.category.toLowerCase().includes(term),
      )
    }

    return filteredPosts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }

  static async getPostById(id: number): Promise<BlogPost | null> {
    return this.posts.find((post) => post.id === id) || null
  }

  static async createPost(data: Omit<BlogPost, "id" | "createdAt" | "updatedAt">): Promise<BlogPost> {
    const newPost: BlogPost = {
      id: this.nextId++,
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    this.posts.push(newPost)
    return newPost
  }

  static async updatePost(
    id: number,
    data: Partial<Omit<BlogPost, "id" | "createdAt" | "updatedAt">>,
  ): Promise<BlogPost | null> {
    const index = this.posts.findIndex((post) => post.id === id)

    if (index === -1) {
      return null
    }

    this.posts[index] = {
      ...this.posts[index],
      ...data,
      updatedAt: new Date().toISOString(),
    }

    return this.posts[index]
  }

  static async deletePost(id: number): Promise<boolean> {
    const index = this.posts.findIndex((post) => post.id === id)

    if (index === -1) {
      return false
    }

    this.posts.splice(index, 1)
    return true
  }
}

// Validation utilities
export function validateBlogPost(data: any): string[] {
  const errors: string[] = []

  if (!data.title || typeof data.title !== "string" || data.title.trim().length === 0) {
    errors.push("Title is required and must be a non-empty string")
  }

  if (data.title && data.title.length > 255) {
    errors.push("Title must be less than 255 characters")
  }

  if (!data.content || typeof data.content !== "string" || data.content.trim().length === 0) {
    errors.push("Content is required and must be a non-empty string")
  }

  if (!data.category || typeof data.category !== "string" || data.category.trim().length === 0) {
    errors.push("Category is required and must be a non-empty string")
  }

  if (data.category && data.category.length > 100) {
    errors.push("Category must be less than 100 characters")
  }

  if (data.tags && !Array.isArray(data.tags)) {
    errors.push("Tags must be an array")
  }

  if (data.tags && data.tags.some((tag: any) => typeof tag !== "string")) {
    errors.push("All tags must be strings")
  }

  return errors
}
