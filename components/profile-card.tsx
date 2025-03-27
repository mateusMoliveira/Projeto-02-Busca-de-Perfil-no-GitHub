"use client"

import Image from "next/image"
import { ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

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

interface ProfileCardProps {
  user: GitHubUser
}

export default function ProfileCard({ user }: ProfileCardProps) {
  return (
    <div className="bg-gray-700 rounded-lg overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-[1.01]">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-24 relative">
        <div className="absolute -bottom-12 left-6">
          <div className="rounded-full border-4 border-gray-700 overflow-hidden h-24 w-24">
            <Image
              src={user.avatar_url || "/placeholder.svg"}
              alt={`${user.name || user.login}'s profile`}
              width={96}
              height={96}
              className="object-cover"
            />
          </div>
        </div>
      </div>

      <div className="pt-14 px-6 pb-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-xl font-bold text-white">{user.name || user.login}</h2>
            <p className="text-blue-400">@{user.login}</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="text-blue-400 border-blue-400 hover:bg-blue-400/10"
            onClick={() => window.open(user.html_url, "_blank")}
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Ver Perfil
          </Button>
        </div>

        {user.bio && <p className="text-gray-300 mb-6">{user.bio}</p>}

        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-gray-800 p-3 rounded-lg">
            <p className="text-gray-400 text-sm mb-1">Repositórios</p>
            <p className="text-white font-bold">{user.public_repos}</p>
          </div>
          <div className="bg-gray-800 p-3 rounded-lg">
            <p className="text-gray-400 text-sm mb-1">Seguidores</p>
            <p className="text-white font-bold">{user.followers}</p>
          </div>
          <div className="bg-gray-800 p-3 rounded-lg">
            <p className="text-gray-400 text-sm mb-1">Seguindo</p>
            <p className="text-white font-bold">{user.following}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

