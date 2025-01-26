'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Play, Loader2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function ExecutePrompt({ 
  executePrompt 
}: { 
  executePrompt: () => Promise<string> 
}) {
  const [result, setResult] = useState<string | null>(null)
  const [isExecuting, setIsExecuting] = useState(false)

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
    <div className="space-y-4">
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

      {result && (
        <Card>
          <CardContent className="pt-6">
            <pre className="whitespace-pre-wrap">{result}</pre>
          </CardContent>
        </Card>
      )}
    </div>
  )
} 