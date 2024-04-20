import asyncio

import logging
import sys

import aiogram
from aiogram import Bot, Dispatcher, types
from aiogram.enums import ParseMode
from aiogram.filters import CommandStart
from aiogram.types import Message
from aiogram import F
from aiogram.utils.formatting import (
   Bold, as_list, as_marked_section
)

from config import TOKEN

from comands import router, animal, photo_animal

bot = aiogram.Bot(TOKEN)
dp = Dispatcher()
dp.include_router(router)

@dp.message(CommandStart())
async def command_start_handler(message: Message) -> None:
    kb = [
        [
            types.KeyboardButton(text="Команды"),
            types.KeyboardButton(text="Описание бота"),
        ],
    ]
    keyboard = types.ReplyKeyboardMarkup(
        keyboard=kb,
        resize_keyboard=True,
    )
    await message.answer(f"Здравствуй, {message.from_user.full_name}! "
                         f"С чего начнем?", reply_markup=keyboard)

@dp.message(F.text.lower() == "команды")
async def commands(message: types.Message):
    response = as_list(
        as_marked_section(
            Bold("Команды:"),
            "/quiz- начать викторину тотемного животного\n",
            marker="✅ ",
        ),
    )
    await message.answer(
        **response.as_kwargs()
    )

@dp.message(F.text.lower() == "написать сотруднику по опеке над животным")
async def tell(message: types.Message):
    chat_id = '583478595' #chatid сотрудника
    sotrudnik = '@dofermin'
    chat_user = message.chat.username
    from comands import animal
    await bot.send_message(chat_id, f"@{chat_user} прошёл викторину, "
                                    f"его результат: {animal[message.chat.username]}")
    await message.answer(f'Сотрудник {sotrudnik} скоро свяжется с вами. '
                         f'Можете написать ему интересующий вас вопрос.')

@dp.message(F.text.lower() == "поделиться результатами в соцсети")
async def tell(message: types.Message):
    #Условная функция
    chat_id = '583478595'
    from comands import animal, photo_animal
    await bot.send_photo(chat_id, photo=f'{photo_animal[message.chat.username]}',
                            caption=f'Моё тотемное животное - {animal[message.chat.username]}!\n\n'
                                    f'Ты тоже можешь узнать: @Skillfactory_MF_MoscowZoo_bot')


@dp.message(F.text.lower() == "описание бота")
async def description(message: types.Message):
    await message.answer("Я помогаю определить ваше тотемное животное")

async def main() -> None:
   bot = Bot(TOKEN)
   await dp.start_polling(bot)

if __name__ == "__main__":
   logging.basicConfig(level=logging.INFO, stream=sys.stdout)
   asyncio.run(main())