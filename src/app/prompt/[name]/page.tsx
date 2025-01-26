import { promises as fs } from 'fs'
import path from 'path'
import yaml from 'js-yaml'
import { notFound } from 'next/navigation'
import { Message, render } from 'promptl-ai'
import { PromptViewer } from '@/components/PromptViewer'
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { generateText } from 'ai'
import { openai } from '@ai-sdk/openai'
import { Message as AIMessage } from 'ai'

interface PromptConfig {
  provider: string;
  model: string;
  temperature?: number;
  system_message?: string;
  user_message?: string;
  variables?: Record<string, string>;
  [key: string]: unknown;
}

async function getPromptData(name: string) {
  try {
    const promptDir = path.join(process.cwd(), 'prompts', name)
    const [configContent, promptContent] = await Promise.all([
      fs.readFile(path.join(promptDir, 'config.yml'), 'utf8'),
      fs.readFile(path.join(promptDir, 'prompt.md'), 'utf8')
    ])

    console.log('foo', promptContent)
    
    const config = yaml.load(configContent) as PromptConfig
    const { messages } = await render({ 
      prompt: promptContent,
      parameters: config
    })
    
    return {
      name,
      config,
      promptContent,
      renderedContent: messages
    }
  } catch (error) {
    console.error('Error loading prompt:', error)
    return null
  }
}

async function executePromptAction(model: string, messages: Message[], temperature?: number) {
  'use server'
  
  const { text } = await generateText({
    model: openai(model),
    messages: messages.map(msg => ({
      role: msg.role.toLowerCase() as AIMessage['role'],
      content: typeof msg.content === 'string' 
        ? msg.content 
        : msg.content.map(c => 'text' in c ? c.text : '').join('')
    })),
    temperature,
  })
  return text
}

export default async function PromptPage({
  params,
}: {
  params: { name: string }
}) {
  const { name } = await params
  const promptData = await getPromptData(name)
  
  if (!promptData) {
    notFound()
  }

  const boundExecuteAction = executePromptAction.bind(
    null,
    promptData.config.model,
    promptData.renderedContent,
    promptData.config.temperature
  )

  return (
    <main className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8">{promptData.name}</h1>
      
      <Card className="mb-8">
        <CardHeader>
          <h2 className="text-2xl font-semibold">Configuration</h2>
        </CardHeader>
        <CardContent>
          <pre className="bg-muted p-4 rounded-lg overflow-auto">
            {JSON.stringify(promptData.config, null, 2)}
          </pre>
        </CardContent>
      </Card>
      
      <PromptViewer 
        content={promptData.promptContent}
        renderedContent={promptData.renderedContent}
        executePrompt={boundExecuteAction}
      />
    </main>
  )
} 