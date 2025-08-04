import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Personal Blogging Platform API</h1>
          <p className="text-xl text-gray-600 mb-8">A comprehensive RESTful API with full CRUD operations</p>
          <Link href="/dashboard">
            <Button size="lg" className="mr-4">
              View Dashboard
            </Button>
          </Link>
          <Link href="/api-docs">
            <Button variant="outline" size="lg">
              API Documentation
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">📝 Blog Management</CardTitle>
              <CardDescription>Create, read, update, and delete blog posts with full validation</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Create new blog posts</li>
                <li>• Update existing posts</li>
                <li>• Delete posts</li>
                <li>• Search and filter posts</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">🔧 RESTful API</CardTitle>
              <CardDescription>Standard HTTP methods with proper status codes</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• GET /api/posts - Get all posts</li>
                <li>• POST /api/posts - Create post</li>
                <li>• PUT /api/posts/[id] - Update post</li>
                <li>• DELETE /api/posts/[id] - Delete post</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>API Endpoints Overview</CardTitle>
            <CardDescription>Complete CRUD operations for blog post management</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="bg-green-50 p-3 rounded-lg">
                  <div className="font-semibold text-green-800">GET /api/posts</div>
                  <div className="text-green-600">Retrieve all blog posts</div>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="font-semibold text-blue-800">POST /api/posts</div>
                  <div className="text-blue-600">Create a new blog post</div>
                </div>
                <div className="bg-yellow-50 p-3 rounded-lg">
                  <div className="font-semibold text-yellow-800">PUT /api/posts/[id]</div>
                  <div className="text-yellow-600">Update existing post</div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="bg-purple-50 p-3 rounded-lg">
                  <div className="font-semibold text-purple-800">GET /api/posts/[id]</div>
                  <div className="text-purple-600">Get single blog post</div>
                </div>
                <div className="bg-red-50 p-3 rounded-lg">
                  <div className="font-semibold text-red-800">DELETE /api/posts/[id]</div>
                  <div className="text-red-600">Delete blog post</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
