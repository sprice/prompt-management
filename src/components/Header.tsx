'use client'

import Link from 'next/link'
import { Home } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto py-4">
        <Button variant="ghost" asChild>
          <Link href="/" className="flex items-center gap-2">
            <Home className="h-4 w-4" />
            <span>Prompt Library</span>
          </Link>
        </Button>
      </div>
    </header>
  )
} 