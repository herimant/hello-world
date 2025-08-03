"use client"

interface CategoriesProps {
  categories: string[]
  activeCategory: string
  onSelectCategory: (category: string) => void
}

export default function Categories({ categories, activeCategory, onSelectCategory }: CategoriesProps) {
  return (
    <div className="w-[416px] bg-[#efeef6] min-h-[710px] pt-[45px] pl-[138px]">
      <ul className="space-y-[38px]">
        {categories.map((category) => (
          <li key={category}>
            <button
              onClick={() => onSelectCategory(category)}
              className={`text-left flex items-center ${
                activeCategory === category
                  ? "font-bold text-[16px] text-[#1c2a39]"
                  : "font-medium text-[12px] text-[#5c6a79]"
              }`}
            >
              {activeCategory === category && <span className="w-[6px] h-[6px] bg-[#756ad3] rounded-full mr-[14px]" />}
              {category}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
