"use client"

import { useState, useEffect } from "react"
import BookCard from "./BookCard"
import { fetchBooks } from "@/lib/api"
import type { Book } from "@/types"

interface BookGridProps {
  category: string
}

export default function BookGrid({ category }: BookGridProps) {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(false)
  const [startIndex, setStartIndex] = useState(0)
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    loadBooks(true)
  }, [category])

  const loadBooks = async (reset = false) => {
    setLoading(true)
    try {
      const newStartIndex = reset ? 0 : startIndex
      const result = await fetchBooks(category, newStartIndex)

      if (reset) {
        setBooks(result.books)
        setStartIndex(6)
      } else {
        setBooks((prev) => [...prev, ...result.books])
        setStartIndex((prev) => prev + 6)
      }

      setHasMore(result.totalItems > newStartIndex + 6)
    } catch (error) {
      console.error("Error loading books:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex-1 p-8 pl-[40px] pt-[45px]">
      <div className="grid grid-cols-2 gap-x-[75px] gap-y-[90px]">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>

      {loading && (
        <div className="flex justify-center mt-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#4c3db2]"></div>
        </div>
      )}

      {hasMore && !loading && (
        <div className="flex justify-center mt-[60px]">
          <button
            onClick={() => loadBooks(false)}
            className="w-[176px] h-[45px] border border-[#4c3db2] text-[#4c3db2] text-[8px] font-bold uppercase flex items-center justify-center"
          >
            Load more
          </button>
        </div>
      )}
    </div>
  )
}
