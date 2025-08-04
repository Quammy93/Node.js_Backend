import { type NextRequest, NextResponse } from "next/server"

// In-memory storage for demo purposes
// In production, you would use a real database
const posts: any[] = [
  {
    id: 1,
    title: "Getting Started with Next.js",
    content:
      "Next.js is a powerful React framework that makes building web applications easier. It provides features like server-side rendering, static site generation, and API routes out of the box.",
    category: "Technology",
    tags: ["Next.js", "React", "Web Development"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 2,
    title: "Understanding RESTful APIs",
    content:
      "REST (Representational State Transfer) is an architectural style for designing networked applications. It relies on a stateless, client-server communication protocol.",
    category: "Programming",
    tags: ["API", "REST", "Backend"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

let nextId = 3

// Validation function
function validatePost(data: any) {
  const errors: string[] = []

  if (!data.title || typeof data.title !== "string" || data.title.trim().length === 0) {
    errors.push("Title is required and must be a non-empty string")
  }

  if (!data.content || typeof data.content !== "string" || data.content.trim().length === 0) {
    errors.push("Content is required and must be a non-empty string")
  }

  if (!data.category || typeof data.category !== "string" || data.category.trim().length === 0) {
    errors.push("Category is required and must be a non-empty string")
  }

  if (data.tags && !Array.isArray(data.tags)) {
    errors.push("Tags must be an array")
  }

  return errors
}

// GET /api/posts - Get all posts with optional search
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const term = searchParams.get("term")

    let filteredPosts = posts

    if (term) {
      const searchTerm = term.toLowerCase()
      filteredPosts = posts.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm) ||
          post.content.toLowerCase().includes(searchTerm) ||
          post.category.toLowerCase().includes(searchTerm),
      )
    }

    return NextResponse.json(filteredPosts)
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

// POST /api/posts - Create a new post
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate the request body
    const errors = validatePost(body)
    if (errors.length > 0) {
      return NextResponse.json({ message: "Validation failed", errors }, { status: 400 })
    }

    // Create new post
    const newPost = {
      id: nextId++,
      title: body.title.trim(),
      content: body.content.trim(),
      category: body.category.trim(),
      tags: body.tags || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    posts.push(newPost)

    return NextResponse.json(newPost, { status: 201 })
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
