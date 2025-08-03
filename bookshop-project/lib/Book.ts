export interface Book {
  id: string
  title: string
  authors?: string[]
  description?: string
  thumbnail?: string
  averageRating?: number
  ratingsCount?: number
  price?: number
  categories?: string[]
}
