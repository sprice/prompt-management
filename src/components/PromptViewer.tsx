'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Copy } from "lucide-react"
import { Message } from 'promptl-ai'
import { extractUserPrompt } from "@/lib/utils"

interface PromptViewerProps {
  content: string;
  renderedContent: Message[];
  executePrompt: () => Promise<string>;
}

export function PromptViewer({ content, renderedContent, executePrompt }: PromptViewerProps) {
  const [result, setResult] = useState<string>("")
  const [isExecuting, setIsExecuting] = useState(false)

  const filledTemplate = renderedContent
    .map(msg => `<${msg.role}>${typeof msg.content === 'object' ? JSON.stringify(msg.content, null, 2) : msg.content}</${msg.role}>`)
    .join('\n\n')

  return (
    <Tabs defaultValue="template">
      <TabsList>
        <TabsTrigger value="template">Template</TabsTrigger>
        <TabsTrigger value="filled">Filled Template</TabsTrigger>
        <TabsTrigger value="execute">Execute</TabsTrigger>
      </TabsList>

      <TabsContent value="template">
        <div className="relative">
          <Button
            variant="outline"
            size="sm"
            className="absolute right-4 top-4"
            onClick={() => {
              navigator.clipboard.writeText(content)

            }}
          >
            <Copy className="h-4 w-4" />
          </Button>
          <pre className="whitespace-pre-wrap p-4 rounded bg-muted">{content}</pre>
        </div>
      </TabsContent>

      <TabsContent value="filled">
        <div className="relative">
          <div className="absolute right-4 top-4 flex flex-col gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                navigator.clipboard.writeText(filledTemplate)
              }}
            >
              <Copy className="h-4 w-4" />
            </Button>
            
            {extractUserPrompt(filledTemplate) && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const userPrompt = extractUserPrompt(filledTemplate)
                  if (userPrompt) {
                    navigator.clipboard.writeText(userPrompt)
                  }
                }}
              >
                <div className="flex items-center gap-2">
                  <Copy className="h-4 w-4" />
                  <span className="text-xs">User</span>
                </div>
              </Button>
            )}
          </div>
          <pre className="whitespace-pre-wrap p-4 rounded bg-muted">{filledTemplate}</pre>
        </div>
      </TabsContent>

      <TabsContent value="execute">
        <div className="space-y-4">
          <Button 
            onClick={async () => {
              setIsExecuting(true)
              try {
                const result = await executePrompt()
                setResult(result)
              } finally {
                setIsExecuting(false)
              }
            }}
            disabled={isExecuting}
          >
            {isExecuting ? "Executing..." : "Execute Prompt"}
          </Button>
          
          {result && (
            <div className="relative">
              <Button
                variant="outline"
                size="sm"
                className="absolute right-4 top-4"
                onClick={() => {
                  navigator.clipboard.writeText(result)
                }}
              >
                <Copy className="h-4 w-4" />
              </Button>
              <pre className="whitespace-pre-wrap p-4 rounded bg-muted">{result}</pre>
            </div>
          )}
        </div>
      </TabsContent>
    </Tabs>
  )
} 