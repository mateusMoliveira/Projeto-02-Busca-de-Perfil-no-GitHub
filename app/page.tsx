"use client"

import type React from "react"

import { useState } from "react"
import { Search, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import ProfileCard from "@/components/profile-card"
import LoadingSpinner from "@/components/loading-spinner"

interface GitHubUser {
  login: string
  name: string
  avatar_url: string
  bio: string
  html_url: string
  public_repos: number
  followers: number
  following: number
}

export default function Home() {
  const [username, setUsername] = useState("")
  const [user, setUser] = useState<GitHubUser | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const searchUser = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!username.trim()) {
      setError("Por favor, digite um nome de usuário")
      return
    }

    setIsLoading(true)
    setError(null)
    setUser(null)

    try {
      const response = await fetch(`https://api.github.com/users/${username}`)

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Usuário não encontrado")
        }
        throw new Error("Erro ao buscar usuário")
      }

      const userData = await response.json()
      setUser(userData)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ocorreu um erro inesperado")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">GitHub Profile Finder</h1>
          <p className="text-gray-300">Digite um nome de usuário do GitHub para ver seu perfil</p>
        </div>

        <Card className="bg-gray-800 border-gray-700 shadow-xl">
          <CardContent className="p-6">
            <form onSubmit={searchUser} className="flex gap-2 mb-6">
              <Input
                type="text"
                placeholder="Digite o nome de usuário do GitHub"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus-visible:ring-blue-500"
              />
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white" disabled={isLoading}>
                {isLoading ? <LoadingSpinner size="sm" /> : <Search className="h-5 w-5" />}
              </Button>
            </form>

            {error && (
              <Alert variant="destructive" className="bg-red-900/50 border-red-800 text-white mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {isLoading && (
              <div className="flex justify-center py-12">
                <LoadingSpinner size="lg" />
              </div>
            )}

            {user && !isLoading && <ProfileCard user={user} />}
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

