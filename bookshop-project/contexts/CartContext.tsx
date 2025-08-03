"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { Book } from "@/types"

interface CartContextType {
  cartItems: Book[]
  addToCart: (book: Book) => void
  removeFromCart: (id: string) => void
  isInCart: (id: string) => boolean
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<Book[]>([])

  useEffect(() => {
    const savedCart = localStorage.getItem("bookshop-cart")
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart))
      } catch (error) {
        console.error("Error loading cart from localStorage:", error)
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("bookshop-cart", JSON.stringify(cartItems))
  }, [cartItems])

  const addToCart = (book: Book) => {
    setCartItems((prev) => [...prev, book])
  }

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  const isInCart = (id: string) => {
    return cartItems.some((item) => item.id === id)
  }

  const clearCart = () => {
    setCartItems([])
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        isInCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
