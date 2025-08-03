"use client"

import Image from "next/image"

export default function AdditionalBanners() {
  return (
    <div className="flex justify-center gap-4 mt-8 px-4">
      {/* Баннер "top 10 books" */}
      <div className="w-[1121px] h-[702px] bg-[#B0E4E5] rounded-md flex items-center justify-center relative overflow-hidden">
        <div className="absolute left-8 top-8 text-white">
          <h2 className="text-6xl font-bold">top</h2>
          <h2 className="text-8xl font-bold">10</h2>
          <h2 className="text-4xl font-bold">books</h2>
          <p className="mt-4 text-sm">FOR ENTREPRENEURS</p>
        </div>

        {/* Изображение людей на кубах */}
        <div className="absolute right-0 bottom-0 w-3/4 h-3/4">
          <Image src="/images/entrepreneurs.png" alt="Entrepreneurs" fill className="object-contain" />
        </div>
      </div>

      {/* Баннер "COZY BOOKS" */}
      <div className="w-[1121px] h-[702px] bg-[#FFE0E2] rounded-md flex items-center justify-center relative overflow-hidden">
        <div className="text-center text-white">
          <h2 className="text-6xl font-bold">CHECK OUT</h2>
          <h2 className="text-6xl font-bold">OUR</h2>
          <h2 className="text-6xl font-bold">COZY BOOKS</h2>
          <h2 className="text-6xl font-bold">SELECTION</h2>
        </div>

        {/* Изображения листьев */}
        <div className="absolute inset-0">
          <Image src="/images/leaves.png" alt="Leaves" fill className="object-cover" />
        </div>
      </div>
    </div>
  )
}
