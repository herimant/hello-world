export interface Book {
  id: string
  title: string
  authors?: string[]
  description?: string
  imageLinks?: {
    thumbnail?: string
    smallThumbnail?: string
  }
  averageRating?: number
  ratingsCount?: number
  saleInfo?: {
    listPrice?: {
      amount: number
      currencyCode: string
    }
  }
}
