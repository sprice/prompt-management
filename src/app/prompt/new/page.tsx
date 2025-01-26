'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function NewPrompt() {
  const [name, setName] = useState('')
  const [prompt, setPrompt] = useState('')
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement prompt creation
  }
  
  return (
    <main className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8">Create New Prompt</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
        <div className="space-y-2">
          <Label htmlFor="name">Prompt Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter prompt name"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="prompt">Prompt Content</Label>
          <Textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your prompt here..."
            className="min-h-[200px]"
            required
          />
        </div>
        
        <Button type="submit">Create Prompt</Button>
      </form>
    </main>
  )
} 