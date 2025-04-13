import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

// For static export, we need to handle this differently
export const dynamic = 'force-dynamic'

interface PostData {
  title: string
  slug: string
  date: string
  tags: string[]
  authors: string[]
  draft: boolean
  summary: string
  content: string
}

export async function POST(request: NextRequest) {
  try {
    const postData: PostData = await request.json()

    // Validate required fields
    if (!postData.title || !postData.slug || !postData.date) {
      return NextResponse.json(
        { success: false, message: 'Title, slug, and date are required' },
        { status: 400 }
      )
    }

    // Create the file path with hyphenated filename
    const blogDir = path.join(process.cwd(), 'data', 'blog')
    const hyphenatedSlug = postData.slug.replace(/ /g, '-')
    const filePath = path.join(blogDir, `${hyphenatedSlug}.mdx`)

    // Check if file already exists
    try {
      await fs.access(filePath)
      return NextResponse.json(
        { success: false, message: 'A post with this slug already exists' },
        { status: 409 }
      )
    } catch (error) {
      // File doesn't exist, which is what we want
    }

    // Format the frontmatter
    const frontmatter = [
      '---',
      `title: '${postData.title}'`,
      `date: '${postData.date}'`,
      `slug: '${postData.slug}'`,
      postData.tags && postData.tags.length > 0
        ? `tags: [${postData.tags.map((tag) => `'${tag.trim()}'`).join(', ')}]`
        : null,
      postData.authors && postData.authors.length > 0
        ? `authors: [${postData.authors.map((author) => `'${author.trim()}'`).join(', ')}]`
        : null,
      postData.draft ? 'draft: true' : null,
      `summary: ${postData.summary}`,
      '---',
      '',
      postData.content || '# New Post\n\nStart writing your post here.',
    ]
      .filter(Boolean)
      .join('\\n')

    // Write the file
    await fs.writeFile(filePath, frontmatter.replace(/\\n/g, '\n'))

    return NextResponse.json({ success: true, slug: postData.slug })
  } catch (error: unknown) {
    console.error('Error creating post:', error)
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : 'An error occurred while creating the post',
      },
      { status: 500 }
    )
  }
}
