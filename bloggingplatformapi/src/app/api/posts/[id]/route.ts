import { type NextRequest, NextResponse } from "next/server"

// In-memory storage for demo purposes
// This would be shared with the main posts route in a real application
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

// GET /api/posts/[id] - Get a single post
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)

    if (isNaN(id)) {
      return NextResponse.json({ message: "Invalid post ID" }, { status: 400 })
    }

    const post = posts.find((p) => p.id === id)

    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 })
    }

    return NextResponse.json(post)
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

// PUT /api/posts/[id] - Update a post
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)

    if (isNaN(id)) {
      return NextResponse.json({ message: "Invalid post ID" }, { status: 400 })
    }

    const body = await request.json()

    // Validate the request body
    const errors = validatePost(body)
    if (errors.length > 0) {
      return NextResponse.json({ message: "Validation failed", errors }, { status: 400 })
    }

    const postIndex = posts.findIndex((p) => p.id === id)

    if (postIndex === -1) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 })
    }

    // Update the post
    const updatedPost = {
      ...posts[postIndex],
      title: body.title.trim(),
      content: body.content.trim(),
      category: body.category.trim(),
      tags: body.tags || [],
      updatedAt: new Date().toISOString(),
    }

    posts[postIndex] = updatedPost

    return NextResponse.json(updatedPost)
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

// DELETE /api/posts/[id] - Delete a post
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)

    if (isNaN(id)) {
      return NextResponse.json({ message: "Invalid post ID" }, { status: 400 })
    }

    const postIndex = posts.findIndex((p) => p.id === id)

    if (postIndex === -1) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 })
    }

    // Remove the post
    posts.splice(postIndex, 1)

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
