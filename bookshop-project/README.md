# Bookshop Project

Интернет-магазин книг с интеграцией Google Books API.

## Установка

1. Скачайте проект
2. Установите зависимости:
\`\`\`bash
npm install
\`\`\`

3. Создайте папку `public/images/` и добавьте изображения:
   - `slider-people.png` - для основного слайда "BLACK FRIDAY SALE"
   - `entrepreneurs.png` - для баннера "top 10 books FOR ENTREPRENEURS"
   - `leaves.png` - для баннера "CHECK OUT OUR COZY BOOKS SELECTION"

4. Запустите проект:
\`\`\`bash
npm run dev
\`\`\`

## Структура проекта

- `app/` - основные страницы
- `components/` - React компоненты
- `contexts/` - контексты для управления состоянием
- `lib/` - API функции
- `types/` - TypeScript типы
- `public/images/` - изображения для баннеров

## Функциональность

- Слайдер с тремя баннерами
- Категории книг
- Интеграция с Google Books API
- Корзина покупок с localStorage
- Адаптивный дизайн

## API ключ

API ключ Google Books уже настроен в `.env.local`
