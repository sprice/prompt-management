import { promises as fs } from 'fs'
import path from 'path'
import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

async function getPrompts() {
  try {
    const promptsDirectory = path.join(process.cwd(), 'prompts')
    
    // Check if directory exists, if not create it
    try {
      await fs.access(promptsDirectory)
    } catch {
      await fs.mkdir(promptsDirectory, { recursive: true })
      return []
    }
    
    const promptFolders = await fs.readdir(promptsDirectory)
    
    if (promptFolders.length === 0) {
      return []
    }
    
    const prompts = await Promise.all(
      promptFolders.map(async (folder) => {
        try {
          const configPath = path.join(promptsDirectory, folder, 'config.yml')
          const promptPath = path.join(promptsDirectory, folder, 'prompt.md')
          
          const [configContent, promptContent] = await Promise.all([
            fs.readFile(configPath, 'utf8'),
            fs.readFile(promptPath, 'utf8')
          ])
          
          return {
            name: folder,
            config: configContent,
            preview: promptContent.slice(0, 150) + '...'
          }
        } catch (error) {
          console.error(`Error loading prompt ${folder}:`, error)
          return null
        }
      })
    )
    
    return prompts.filter((prompt): prompt is NonNullable<typeof prompt> => prompt !== null)
  } catch (error) {
    console.error('Error loading prompts:', error)
    return []
  }
}

export default async function Home() {
  const prompts = await getPrompts()
  
  return (
    <main className="container mx-auto py-8">

      
      {prompts.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-4">No prompts found</h2>
          <p className="text-muted-foreground mb-8">
            Get started by creating your first prompt
          </p>
          <Button asChild>
            <Link href="/prompt/new">
              <PlusCircle className="mr-2 h-4 w-4" />
              Create First Prompt
            </Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {prompts.map((prompt) => (
            <Link href={`/prompt/${prompt.name}`} key={prompt.name}>
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>{prompt.name}</CardTitle>
                  <CardDescription>{prompt.preview}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </main>
  )
}
