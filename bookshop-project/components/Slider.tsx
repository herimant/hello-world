"use client"

import { useState, useEffect } from "react"

const slides = [
  {
    id: 1,
    title: "Black Friday Sale",
    subtitle: "up to 60%",
    background: "bg-gradient-to-r from-pink-100 to-pink-200",
  },
  {
    id: 2,
    title: "New Arrivals",
    subtitle: "Discover",
    background: "bg-gradient-to-r from-purple-100 to-purple-200",
  },
  {
    id: 3,
    title: "Best Sellers",
    subtitle: "Top 100",
    background: "bg-gradient-to-r from-blue-100 to-blue-200",
  },
]

export default function Slider() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative h-96 overflow-hidden">
      <div
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className={`min-w-full h-full ${slide.background} flex items-center justify-center relative`}
          >
            <div className="text-center">
              <h2 className="text-6xl font-black uppercase text-purple-600 mb-4">{slide.subtitle}</h2>
              <p className="text-2xl font-semibold uppercase text-gray-900">{slide.title}</p>
            </div>

            {/* Промо блоки справа */}
            <div className="absolute right-8 top-1/2 transform -translate-y-1/2 space-y-4">
              <div className="bg-purple-400 p-6 rounded-lg text-white">
                <h3 className="font-bold text-lg uppercase">
                  Change
                  <br />
                  old book
                  <br />
                  on new
                </h3>
                <div className="mt-2">→</div>
              </div>
              <div className="bg-pink-400 p-6 rounded-lg text-white">
                <h3 className="font-bold text-lg uppercase">
                  Top
                  <br />
                  100
                  <br />
                  books
                  <br />
                  2022
                </h3>
                <div className="mt-2">→</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Точки навигации */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? "bg-purple-600" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  )
}
