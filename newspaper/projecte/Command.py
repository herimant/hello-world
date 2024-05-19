'Список всех команд запускаемых в Django Shell.'

from newapp.models import *

'1.Создать двух пользователей.'
u1 = User.objects.create_user('Liza')
u2 = User.objects.create_user('Bob')

'2.Создать два объекта модели Author, связанные с пользователями.'
at1=Author.objects.create(authorUser=u1)
at2=Author.objects.create(authorUser=u2)

'3.Добавить 4 категории в модель Category.'
Category.objects.create(name='News')
Category.objects.create(name='Games')
Category.objects.create(name='IT')
Category.objects.create(name='Films')

'4.Добавить 2 статьи и 1 новость.'
Post.objects.create(author=at1, categoryType="NW", title="titleNews", text="somebigtext")
Post.objects.create(author=at1, categoryType="AR", title="titleART1", text="somebigtext")
Post.objects.create(author=at2, categoryType="AR", title="titleART2", text="somebigtext")

'5.Присвоить им категории (как минимум в одной статье/новости должно быть не меньше 2 категорий).'
Post.objects.get(id=1).postCategory.add(Category.objects.get(id=1))
Post.objects.get(id=1).postCategory.add(Category.objects.get(id=2))
Post.objects.get(id=2).postCategory.add(Category.objects.get(id=2))
Post.objects.get(id=2).postCategory.add(Category.objects.get(id=3))
Post.objects.get(id=3).postCategory.add(Category.objects.get(id=3))
Post.objects.get(id=3).postCategory.add(Category.objects.get(id=4))

'6.Создать как минимум 4 комментария к разным объектам модели Post \
 (в каждом объекте должен быть как минимум один комментарий).'
Comment.objects.create(commentPost=Post.objects.get(id=1), commentUser=Author.objects.get(id=1).authorUser, text='sometext')
Comment.objects.create(commentPost=Post.objects.get(id=2), commentUser=Author.objects.get(id=1).authorUser, text='sometext')
Comment.objects.create(commentPost=Post.objects.get(id=3), commentUser=Author.objects.get(id=2).authorUser, text='sometext')
Comment.objects.create(commentPost=Post.objects.get(id=1), commentUser=Author.objects.get(id=2).authorUser, text='sometext')

'7.Применяя функции like() и dislike() к статьям/новостям и комментариям, скорректировать рейтинги этих объектов.'
Comment.objects.get(id=1).Like()
Comment.objects.get(id=2).Like()
Comment.objects.get(id=3).Like()
Comment.objects.get(id=3).Like()
Comment.objects.get(id=4).Like()
Comment.objects.get(id=2).Dislike()
Comment.objects.get(id=4).Dislike()
Post.objects.get(id=1).Like()
Post.objects.get(id=1).Like()
Post.objects.get(id=2).Like()
Post.objects.get(id=3).Like()
Post.objects.get(id=3).Like()
Post.objects.get(id=1).Dislike()
Post.objects.get(id=2).Dislike()

'8.Обновить рейтинги пользователей.'
Author.objects.get(id=1).update_rating()
Author.objects.get(id=2).update_rating()

'9.Вывести username и рейтинг лучшего пользователя (применяя сортировку и возвращая поля первого объекта).'
Author.objects.order_by('-ratingAuthor').values('authorUser__username','ratingAuthor')[0]

'10.Вывести дату добавления, username автора, рейтинг, заголовок и превью лучшей статьи,\
 основываясь на лайках/дислайках к этой статье.'
Post.objects.order_by('-rating').values('dataCreation','author__authorUser__username','rating','title')[0]
Post.objects.order_by('-rating').first().Preview()

'11.Вывести все комментарии (дата, пользователь, рейтинг, текст) к этой статье.'
best_post=Post.objects.order_by('-rating').first()
best_post.comment_set.all()
best_post.comment_set.values('dataCreation', 'user__username', 'rating', 'text')