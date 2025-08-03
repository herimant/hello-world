"use client"

import { useCart } from "@/contexts/CartContext"
import type { Book } from "@/types"
import { Star } from "lucide-react"
import Image from "next/image"

interface BookCardProps {
  book: Book
}

export default function BookCard({ book }: BookCardProps) {
  const { addToCart, removeFromCart, isInCart } = useCart()
  const inCart = isInCart(book.id)

  const handleCartAction = () => {
    if (inCart) {
      removeFromCart(book.id)
    } else {
      addToCart(book)
    }
  }

  const renderStars = (rating: number) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} className="w-[12px] h-[12px] fill-[#F2C94C] text-[#F2C94C]" />)
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <div key={i} className="relative">
            <Star className="w-[12px] h-[12px] text-[#EEEDF5]" />
            <div className="absolute inset-0 overflow-hidden w-1/2">
              <Star className="w-[12px] h-[12px] fill-[#F2C94C] text-[#F2C94C]" />
            </div>
          </div>,
        )
      } else {
        stars.push(<Star key={i} className="w-[12px] h-[12px] text-[#EEEDF5]" />)
      }
    }
    return stars
  }

  return (
    <div className="flex gap-8">
      {/* Обложка книги */}
      <div className="w-[212px] h-[300px] bg-[#eeecec] relative shadow-md">
        <Image
          src={book.imageLinks?.thumbnail || "/placeholder.svg?height=300&width=212"}
          alt={book.title}
          fill
          className="object-cover"
        />
      </div>

      {/* Информация о книге */}
      <div className="flex-1">
        {/* Автор */}
        <p className="text-[10px] text-[#5c6a79] font-normal mb-[4px]">
          {book.authors?.join(", ") || "Unknown Author"}
        </p>

        {/* Название */}
        <h3 className="text-[16px] font-bold text-[#1c2a39] mb-[4px]">{book.title}</h3>

        {/* Рейтинг */}
        {book.averageRating && (
          <div className="flex items-center mb-[15px]">
            <div className="flex space-x-[1px] mr-[6px]">{renderStars(book.averageRating)}</div>
            <span className="text-[10px] text-[#5c6a79]">
              {book.ratingsCount ? `${book.ratingsCount} review${book.ratingsCount !== 1 ? "s" : ""}` : ""}
            </span>
          </div>
        )}

        {/* Описание */}
        <p className="text-[10px] text-[#5c6a79] mb-[16px] max-w-[300px]">
          {book.description ? book.description.substring(0, 100) + "..." : ""}
        </p>

        {/* Цена */}
        {book.saleInfo?.listPrice && (
          <p className="text-[13px] font-bold text-[#1c2a39] uppercase mb-[16px]">
            ${book.saleInfo.listPrice.amount.toFixed(2)}
          </p>
        )}

        {/* Кнопка */}
        <button
          onClick={handleCartAction}
          className={`w-[176px] h-[45px] border flex items-center justify-center text-[8px] font-bold uppercase ${
            inCart ? "border-[#eeedf5] text-[#5c6a79]" : "border-[#4c3db2] text-[#4c3db2]"
          }`}
        >
          {inCart ? "In the cart" : "Buy now"}
        </button>
      </div>
    </div>
  )
}
