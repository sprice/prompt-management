'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Copy } from "lucide-react"
import { Message, MessageContent } from 'promptl-ai'
import { extractUserPrompt } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

interface PromptViewerProps {
  content: string;
  renderedContent: Message[];
  executePrompt: () => Promise<string>;
}

export function PromptViewer({ content, renderedContent, executePrompt }: PromptViewerProps) {
  const [result, setResult] = useState<string>("")
  const [isExecuting, setIsExecuting] = useState(false)
  const { toast } = useToast()

  const filledTemplate = renderedContent
    .map(msg => {
      let messageContent: string = '';
      const content = msg.content;
      
      if (Array.isArray(content)) {
        messageContent = content
          .filter((block: MessageContent) => 
            'type' in block && block.type === 'text' && 'text' in block)
          .map(block => (block as { text: string }).text)
          .join('');
      } else if (typeof content === 'string') {
        messageContent = content;
      } else if (typeof content === 'object') {
        messageContent = JSON.stringify(content, null, 2);
      }

      return `<${msg.role}>${messageContent}</${msg.role}>`;
    })
    .join('\n\n')

  const handleCopy = (text: string, description: string) => {
    navigator.clipboard.writeText(text)
    toast({
      description: `${description} copied to clipboard`,
      duration: 2000,
    })
  }

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
            onClick={() => handleCopy(content, "Template")}
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
              onClick={() => handleCopy(filledTemplate, "Full template")}
            >
              <Copy className="h-4 w-4" />
              <span className="text-xs">All Text</span>
            </Button>
            
            {extractUserPrompt(filledTemplate) && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const userPrompt = extractUserPrompt(filledTemplate)
                  if (userPrompt) {
                    handleCopy(userPrompt, "User prompt")
                  }
                }}
              >
                <div className="flex items-center gap-2">
                  <Copy className="h-4 w-4" />
                  <span className="text-xs">User Prompt</span>
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
                onClick={() => handleCopy(result, "Result")}
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