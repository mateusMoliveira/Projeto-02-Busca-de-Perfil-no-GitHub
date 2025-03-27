"use client"

import { X } from "lucide-react"

interface MobileMenuProps {
  onClose: () => void
}

export default function MobileMenu({ onClose }: MobileMenuProps) {
  return (
    <div className="fixed inset-0 bg-primary z-50 md:hidden">
      <div className="flex justify-end p-4">
        <button onClick={onClose} className="text-white">
          <X className="h-6 w-6" />
        </button>
      </div>
      <nav className="flex flex-col items-center space-y-6 mt-16 text-white text-xl">
        <a href="#" className="hover:text-gray-200">
          Home
        </a>
        <a href="#" className="hover:text-gray-200">
          Cursos
        </a>
        <a href="#" className="hover:text-gray-200">
          Sobre
        </a>
        <a href="#" className="hover:text-gray-200">
          Contato
        </a>
      </nav>
    </div>
  )
}

