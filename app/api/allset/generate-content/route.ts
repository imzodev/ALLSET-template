import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'
import { llmService } from '@/lib/llm'
import { LandingContent } from '@/lib/llm/types'
import siteMetadata from '@/data/siteMetadata'
import { generateImagesForLandingContent } from '@/lib/llm/generateLandingImages'

// For static export, we need to handle this differently
export const dynamic = 'error'

// Path to the landing content file
const landingContentFilePath = path.join(process.cwd(), 'data', 'landingContent.json')

export async function POST(request: NextRequest) {
  try {
    // Get the business description and page type from the request
    const { description, pageType } = await request.json()

    if (!description || typeof description !== 'string') {
      return NextResponse.json(
        { success: false, message: 'Business description is required' },
        { status: 400 }
      )
    }

    // Accept pageType as either a string or { type: string }
    let normalizedPageType: string | undefined = undefined
    if (pageType) {
      if (typeof pageType === 'string') {
        normalizedPageType = pageType
      } else if (typeof pageType === 'object' && typeof pageType.type === 'string') {
        normalizedPageType = pageType.type
      } else {
        return NextResponse.json(
          { success: false, message: 'Invalid page type format' },
          { status: 400 }
        )
      }
    }

    // Use the site's language setting
    const contentLanguage = siteMetadata.language
    console.log(`API: Generating landing content in site language: ${contentLanguage}`)

    // Generate landing content using the LLM service with the site language and page type
    const result = await llmService.generateLandingContent(
      description,
      contentLanguage,
      normalizedPageType
    )

    if (result.error) {
      return NextResponse.json({ success: false, message: result.error }, { status: 500 })
    }

    // Parse the generated content
    let contentJson: LandingContent
    try {
      contentJson = JSON.parse(result.content) as LandingContent
    } catch (error) {
      console.error('Error parsing generated content:', error)
      return NextResponse.json(
        { success: false, message: 'Failed to parse generated content' },
        { status: 500 }
      )
    }

    await generateImagesForLandingContent(contentJson)

    // Save the updated content to the file
    await fs.writeFile(landingContentFilePath, JSON.stringify(contentJson, null, 2), 'utf-8')

    return NextResponse.json({
      success: true,
      content: contentJson,
    })
  } catch (error: unknown) {
    console.error('Error generating landing content:', error)
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : 'An error occurred while generating landing content',
      },
      { status: 500 }
    )
  }
}
