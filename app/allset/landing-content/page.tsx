'use client'

import { useState, useEffect } from 'react'
import FormEditor from './components/FormEditor'
import { LandingContent } from './types'

export default function LandingContentPage() {
  const [content, setContent] = useState('')
  const [parsedContent, setParsedContent] = useState<LandingContent | null>(null)
  const [originalContent, setOriginalContent] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')
  const [saveMessage, setSaveMessage] = useState('')
  const [editorMode, setEditorMode] = useState<'json' | 'form'>('json')

  // Fetch the current landing content
  useEffect(() => {
    async function fetchLandingContent() {
      try {
        setIsLoading(true)
        const response = await fetch('/api/allset/landing-content')

        if (!response.ok) {
          throw new Error('Failed to fetch landing content')
        }

        const data = await response.json()
        const formattedContent = JSON.stringify(data, null, 2)
        setContent(formattedContent)
        setParsedContent(data)
        setOriginalContent(formattedContent)
      } catch (err) {
        console.error('Error fetching landing content:', err)
        setError('Failed to load landing content. Please try again.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchLandingContent()
  }, [])

  // Handle content changes
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value)

    // Try to parse the JSON to update the form editor
    try {
      const parsed = JSON.parse(e.target.value)
      setParsedContent(parsed)
    } catch (err) {
      // Don't update parsedContent if JSON is invalid
    }
  }

  // Validate JSON
  const isValidJSON = (str: string) => {
    try {
      JSON.parse(str)
      return true
    } catch (e) {
      return false
    }
  }

  // Handle form submission for JSON editor
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate JSON
    if (!isValidJSON(content)) {
      setError('Invalid JSON format. Please check your content.')
      return
    }

    await saveContent(content)
  }

  // Handle form submission for form editor
  const handleFormSubmit = async (formData: LandingContent) => {
    const formContent = JSON.stringify(formData, null, 2)
    await saveContent(formContent)
  }

  // Common save function
  const saveContent = async (contentToSave: string) => {
    setError('')
    setIsSaving(true)
    setSaveMessage('')

    try {
      const response = await fetch('/api/allset/landing-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: contentToSave,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to save landing content')
      }

      // Update both editors
      setContent(contentToSave)
      try {
        setParsedContent(JSON.parse(contentToSave))
      } catch (err) {
        console.error('Error parsing saved content:', err)
      }

      setSaveMessage('Landing content saved successfully!')
      setOriginalContent(contentToSave)

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSaveMessage('')
      }, 3000)
    } catch (err: Error | unknown) {
      console.error('Error saving landing content:', err)
      setError(
        err instanceof Error ? err.message : 'An error occurred while saving landing content'
      )
    } finally {
      setIsSaving(false)
    }
  }

  // Reset to original content
  const handleReset = () => {
    setContent(originalContent)
    setError('')
  }

  // Format JSON
  const handleFormat = () => {
    try {
      const parsed = JSON.parse(content)
      setContent(JSON.stringify(parsed, null, 2))
      setError('')
    } catch (err) {
      setError('Cannot format: Invalid JSON format. Please fix the errors first.')
    }
  }

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Landing Content Editor</h1>
        <div className="flex space-x-2">
          {editorMode === 'json' && (
            <>
              <button
                type="button"
                onClick={handleFormat}
                className="bg-primary-600 hover:bg-primary-700 focus:ring-primary-500 rounded-md px-3 py-2 text-sm font-medium text-white focus:ring-2 focus:ring-offset-2 focus:outline-none"
              >
                Format JSON
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="bg-primary-600 hover:bg-primary-700 focus:ring-primary-500 rounded-md px-3 py-2 text-sm font-medium text-white focus:ring-2 focus:ring-offset-2 focus:outline-none"
              >
                Reset Changes
              </button>
            </>
          )}
          <button
            type="button"
            onClick={() => setEditorMode(editorMode === 'json' ? 'form' : 'json')}
            className="rounded-md bg-slate-600 px-3 py-2 text-sm font-medium text-white hover:bg-slate-700 focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:outline-none"
          >
            Switch to {editorMode === 'json' ? 'Form' : 'JSON'} Editor
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center rounded-lg bg-slate-100 p-6 py-8 shadow-md dark:bg-gray-800">
          <div className="border-t-primary-500 h-8 w-8 animate-spin rounded-full border-4 border-slate-300"></div>
        </div>
      ) : (
        <>
          {error && (
            <div className="mb-4 rounded-md bg-red-50 p-4 dark:bg-red-900/30">
              <div className="flex">
                <div className="text-sm font-medium text-red-800 dark:text-red-400">{error}</div>
              </div>
            </div>
          )}

          {saveMessage && (
            <div className="mb-4 rounded-md bg-green-50 p-4 dark:bg-green-900/30">
              <div className="flex">
                <div className="text-sm font-medium text-green-800 dark:text-green-400">
                  {saveMessage}
                </div>
              </div>
            </div>
          )}

          {editorMode === 'json' ? (
            <div className="rounded-lg bg-slate-100 p-6 shadow-md dark:bg-gray-800">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">
                    Edit the JSON content of your landing page below. Be careful to maintain valid
                    JSON format.
                  </p>

                  <div className="relative mt-4">
                    <textarea
                      value={content}
                      onChange={handleContentChange}
                      rows={30}
                      className="focus:border-primary-500 focus:ring-primary-500 block w-full rounded-md border-gray-300 font-mono text-sm shadow-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      spellCheck="false"
                      data-gramm="false"
                    ></textarea>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isSaving || !isValidJSON(content)}
                    className="bg-primary-600 hover:bg-primary-700 focus:ring-primary-500 rounded-md px-4 py-2 text-sm font-medium text-white focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:opacity-70"
                  >
                    {isSaving ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            parsedContent && (
              <FormEditor content={parsedContent} onSave={handleFormSubmit} isSaving={isSaving} />
            )
          )}
        </>
      )}
    </>
  )
}
