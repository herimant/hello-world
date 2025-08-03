"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

const slides = [
  {
    id: 1,
    image: "/images/slider-people.png",
  },
  {
    id: 2,
    image: "/images/entrepreneurs.png",
  },
  {
    id: 3,
    image: "/images/leaves.png",
  },
]

export default function MainSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  const handleSlideChange = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <div className="relative w-full max-w-[1440px] mx-auto h-[702px] overflow-hidden">
      {/* Контейнер слайдера */}
      <div className="relative w-full h-full">
        {/* Основная область слайдера */}
        <div className="w-[1120px] h-full relative">
          {/* Слайды */}
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 w-full h-full transition-opacity duration-500 ease-in-out ${
                index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              {/* Только изображение на весь слайд */}
              <div className="absolute inset-0">
                <Image
                  src={slide.image || "/placeholder.svg?height=702&width=1120"}
                  alt={`Slide ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Промо-блоки справа - ИЗМЕНИЛИ z-index на более низкий */}
        <div className="absolute right-0 top-0 h-full flex flex-col justify-center gap-8 z-20">
          {/* Верхний промо-блок */}
          <div className="w-[149px] h-[204px] bg-[#9e98dc] p-6 flex flex-col justify-between shadow-lg">
            <h3 className="text-[18px] font-bold uppercase text-[#1c2a39] leading-tight">
              Change
              <br />
              old book
              <br />
              on new
            </h3>
            <div className="flex justify-end">
              <svg width="55" height="12" viewBox="0 0 55 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M54.5303 6.53033C54.8232 6.23744 54.8232 5.76256 54.5303 5.46967L49.7574 0.696699C49.4645 0.403806 48.9896 0.403806 48.6967 0.696699C48.4038 0.989593 48.4038 1.46447 48.6967 1.75736L52.9393 6L48.6967 10.2426C48.4038 10.5355 48.4038 11.0104 48.6967 11.3033C48.9896 11.5962 49.4645 11.5962 49.7574 11.3033L54.5303 6.53033ZM0 6.75H54V5.25H0V6.75Z"
                  fill="#1C2A39"
                />
              </svg>
            </div>
          </div>

          {/* Нижний промо-блок */}
          <div className="w-[137px] h-[273px] bg-[#ff8fe6] p-6 flex flex-col justify-between shadow-lg">
            <h3 className="text-[18px] font-bold uppercase text-[#1c2a39] leading-tight">
              Top
              <br />
              100
              <br />
              books
              <br />
              2022
            </h3>
            <div className="flex justify-end">
              <svg width="55" height="12" viewBox="0 0 55 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M54.5303 6.53033C54.8232 6.23744 54.8232 5.76256 54.5303 5.46967L49.7574 0.696699C49.4645 0.403806 48.9896 0.403806 48.6967 0.696699C48.4038 0.989593 48.4038 1.46447 48.6967 1.75736L52.9393 6L48.6967 10.2426C48.4038 10.5355 48.4038 11.0104 48.6967 11.3033C48.9896 11.5962 49.4645 11.5962 49.7574 11.3033L54.5303 6.53033ZM0 6.75H54V5.25H0V6.75Z"
                  fill="#1C2A39"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Индикаторы слайдера */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-40">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => handleSlideChange(index)}
            className={`w-3 h-3 rounded-full transition-colors duration-200 ${
              index === currentSlide ? "bg-[#9e98dc]" : "bg-[#efeef6]"
            }`}
          />
        ))}
      </div>
    </div>
  )
}

