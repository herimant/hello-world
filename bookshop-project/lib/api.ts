import type { Book } from "@/types"

interface GoogleBooksResponse {
  items?: {
    id: string
    volumeInfo: {
      title: string
      authors?: string[]
      description?: string
      imageLinks?: {
        thumbnail?: string
        smallThumbnail?: string
      }
      averageRating?: number
      ratingsCount?: number
    }
    saleInfo?: {
      listPrice?: {
        amount: number
        currencyCode: string
      }
    }
  }[]
  totalItems: number
}

interface BooksResult {
  books: Book[]
  totalItems: number
}

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY || ""

export async function fetchBooks(category: string, startIndex = 0): Promise<BooksResult> {
  try {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=subject:${encodeURIComponent(
        category,
      )}&startIndex=${startIndex}&maxResults=6&key=${API_KEY}`,
    )

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    const data: GoogleBooksResponse = await response.json()

    const books: Book[] = (data.items || []).map((item) => ({
      id: item.id,
      title: item.volumeInfo.title,
      authors: item.volumeInfo.authors,
      description: item.volumeInfo.description,
      imageLinks: item.volumeInfo.imageLinks,
      averageRating: item.volumeInfo.averageRating,
      ratingsCount: item.volumeInfo.ratingsCount,
      saleInfo: item.saleInfo,
    }))

    return {
      books,
      totalItems: data.totalItems,
    }
  } catch (error) {
    console.error("Error fetching books:", error)
    return {
      books: [],
      totalItems: 0,
    }
  }
}
