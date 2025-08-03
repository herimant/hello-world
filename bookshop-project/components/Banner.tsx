"use client"

import { useState, useEffect } from "react"
import { ChevronRight } from "lucide-react"

export default function Banner() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const slides = [1, 2, 3]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="pt-[116px] relative">
      <div className="w-full h-[702px] relative">
        {/* Основной баннер */}
        <div className="absolute left-[160px] top-0 w-[1120px] h-[702px] bg-[#FFE0E2] overflow-hidden">
          {/* Контент баннера */}
          <div className="absolute left-[14.72%] right-[14.72%] top-[14.92%] bottom-[65.45%] flex items-center justify-center">
            <div className="text-center">
              <p className="text-[25px] font-semibold uppercase text-[#1c2a39] mb-4">Black Friday Sale</p>
              <div className="relative">
                <span className="text-[60px] font-bold text-white absolute left-[468px] top-[220px]">up to</span>
                <span className="text-[60px] font-bold text-[#534fd2] absolute left-[473px] top-[225px]">up to</span>

                <span className="text-[182px] font-black text-white absolute left-[636px] top-[192px]">60</span>
                <span className="text-[182px] font-black text-[#534fd2] absolute left-[649px] top-[205px]">60</span>

                <span className="text-[60px] font-bold text-white absolute left-[897px] top-[313px]">%</span>
                <span className="text-[60px] font-bold text-[#534fd2] absolute left-[902px] top-[318px]">%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Промо блоки справа */}
        <div className="absolute right-0 top-[195px] w-[149px] h-[204px] bg-[#9e98dc] p-6 flex flex-col justify-between">
          <h3 className="text-[18px] font-bold uppercase text-[#1c2a39] leading-tight">
            Change
            <br />
            old book
            <br />
            on new
          </h3>
          <div className="flex justify-end">
            <ChevronRight className="w-[55px] h-[12px]" />
          </div>
        </div>

        <div className="absolute right-0 top-[475px] w-[137px] h-[273px] bg-[#ff8fe6] p-6 flex flex-col justify-between">
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
            <ChevronRight className="w-[55px] h-[12px]" />
          </div>
        </div>
      </div>

      {/* Индикаторы слайдера */}
      <div className="absolute bottom-[835px] left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full ${index === currentSlide ? "bg-[#9e98dc]" : "bg-[#efeef6]"}`}
          />
        ))}
      </div>
    </div>
  )
}
