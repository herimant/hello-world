"use client"

import { useCart } from "@/contexts/CartContext"
import { Search, User, ShoppingBag } from "lucide-react"

export default function Header() {
  const { cartItems } = useCart()
  const cartCount = cartItems.length

  return (
    <header className="fixed top-0 left-0 right-0 bg-white z-50 h-[116px] border-b border-gray-100">
      <div className="max-w-[1440px] mx-auto px-4 h-full flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <h1 className="text-2xl font-bold text-[#1c2a39]">Bookshop</h1>
          <nav className="hidden md:flex space-x-6">
            <a href="#" className="text-[10px] font-black uppercase text-[#1c2a39]">
              Books
            </a>
            <a href="#" className="text-[10px] font-bold uppercase text-[#5c6a79]">
              Audiobooks
            </a>
            <a href="#" className="text-[10px] font-bold uppercase text-[#5c6a79]">
              Stationery & Gifts
            </a>
            <a href="#" className="text-[10px] font-bold uppercase text-[#5c6a79]">
              Blog
            </a>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <button className="p-2 text-[#1c2a39]">
            <User size={18} />
          </button>
          <button className="p-2 text-[#1c2a39]">
            <Search size={18} />
          </button>
          <button className="p-2 text-[#1c2a39] relative">
            <ShoppingBag size={18} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#756ad3] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  )
}
