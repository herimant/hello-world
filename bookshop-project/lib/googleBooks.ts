import type { Book } from "./Book" // Assuming Book interface is defined in another file

export interface GoogleBook {
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
    publishedDate?: string
    categories?: string[]
  }
  saleInfo?: {
    listPrice?: {
      amount: number
      currencyCode: string
    }
  }
}

export interface SearchResult {
  books: Book[]
  totalItems: number
}

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY || "YOUR_API_KEY"

export async function searchBooks(category: string, startIndex = 0): Promise<SearchResult> {
  try {
    const query = `subject:${category.toLowerCase()}`
    const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&startIndex=${startIndex}&maxResults=6&key=${API_KEY}`

    const response = await fetch(url)
    if (!response.ok) {
      throw new Error("Failed to fetch books")
    }

    const data = await response.json()

    const books: Book[] = (data.items || []).map((item: GoogleBook) => ({
      id: item.id,
      title: item.volumeInfo.title,
      authors: item.volumeInfo.authors,
      description: item.volumeInfo.description,
      thumbnail: item.volumeInfo.imageLinks?.thumbnail?.replace("http:", "https:"),
      averageRating: item.volumeInfo.averageRating,
      ratingsCount: item.volumeInfo.ratingsCount,
      price: item.saleInfo?.listPrice?.amount
        ? Number.parseFloat(item.saleInfo.listPrice.amount.toFixed(2))
        : Math.floor(Math.random() * 20) + 5, // Случайная цена если нет данных
      categories: item.volumeInfo.categories,
    }))

    return {
      books,
      totalItems: data.totalItems || 0,
    }
  } catch (error) {
    console.error("Error searching books:", error)
    return { books: [], totalItems: 0 }
  }
}
