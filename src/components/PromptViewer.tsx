'use client'

import { useState, useTransition } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Play, Copy } from "lucide-react"
import { Message } from 'promptl-ai'

interface PromptViewerProps {
  content: string;
  renderedContent: Message[];
  executePrompt: () => Promise<string>;
}

export function PromptViewer({ content, renderedContent, executePrompt }: PromptViewerProps) {
  const [copied, setCopied] = useState<'raw' | 'filled' | null>(null)
  const [isPending, startTransition] = useTransition()
  const [result, setResult] = useState<string | null>(null)
  const [isExecuting, setIsExecuting] = useState(false)

  const filledContent = renderedContent
    .map(msg => `<${msg.role}>\n${typeof msg.content === 'string' 
      ? msg.content 
      : msg.content.map(c => 'text' in c ? c.text : '').join('')}\n</${msg.role}>`)
    .join('\n\n')

  const copyToClipboard = async (text: string, type: 'raw' | 'filled') => {
    startTransition(async () => {
      await navigator.clipboard.writeText(text)
      setCopied(type)
      setTimeout(() => setCopied(null), 2000)
    })
  }

  const handleExecute = async () => {
    setIsExecuting(true)
    try {
      const response = await executePrompt()
      setResult(response)
    } catch (error) {
      console.error('Error executing prompt:', error)
    } finally {
      setIsExecuting(false)
    }
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="raw" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="raw">Raw Template</TabsTrigger>
          <TabsTrigger value="filled">Filled Template</TabsTrigger>
          <TabsTrigger value="execute">Execute</TabsTrigger>
        </TabsList>
        
        <TabsContent value="raw">
          <div className="relative">
            <Textarea
              value={content}
              readOnly
              className="min-h-[400px] font-mono"
            />
            <Button
              className="absolute top-2 right-2"
              onClick={() => copyToClipboard(content, 'raw')}
              disabled={isPending}
            >
              {isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Copy className="mr-2 h-4 w-4" />
              )}
              {copied === 'raw' ? 'Copied!' : 'Copy'}
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="filled">
          <div className="relative">
            <Textarea
              value={filledContent}
              readOnly
              className="min-h-[400px] font-mono"
            />
            <Button
              className="absolute top-2 right-2"
              onClick={() => copyToClipboard(filledContent, 'filled')}
              disabled={isPending}
            >
              {isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Copy className="mr-2 h-4 w-4" />
              )}
              {copied === 'filled' ? 'Copied!' : 'Copy'}
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="execute">
          <div className="space-y-4">
            <div className="flex justify-end">
              <Button 
                onClick={handleExecute} 
                disabled={isExecuting}
              >
                {isExecuting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Play className="mr-2 h-4 w-4" />
                )}
                Execute
              </Button>
            </div>

            {result && (
              <Textarea
                value={result}
                readOnly
                className="min-h-[400px] font-mono"
              />
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
} 