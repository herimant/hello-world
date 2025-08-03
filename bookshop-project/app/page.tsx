"use client"

import { useState } from "react"
import Header from "@/components/Header"
import MainSlider from "@/components/MainSlider"
import Categories from "@/components/Categories"
import BookGrid from "@/components/BookGrid"
import { CartProvider } from "@/contexts/CartContext"

const categories = [
  "Architecture",
  "Art & Fashion",
  "Biography",
  "Business",
  "Crafts & Hobbies",
  "Drama",
  "Fiction",
  "Food & Drink",
  "Health & Wellbeing",
  "History & Politics",
  "Humor",
  "Poetry",
  "Psychology",
  "Science",
  "Technology",
  "Travel & Maps",
]

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("Architecture")

  return (
    <CartProvider>
      <div className="min-h-screen bg-white">
        <Header />

        <div className="pt-[116px]">
          {/* Основной слайдер с промо-блоками */}
          <MainSlider />

          {/* Категории и книги */}
          <div className="flex">
            <Categories categories={categories} activeCategory={activeCategory} onSelectCategory={setActiveCategory} />
            <BookGrid category={activeCategory} />
          </div>
        </div>
      </div>
    </CartProvider>
  )
}
