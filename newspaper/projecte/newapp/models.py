from django.db import models
from django.contrib.auth.models import User
from django.db.models import Sum
from django.urls import reverse
from django.utils import timezone


class Author (models.Model):
    authorUser = models.OneToOneField(User, on_delete = models.CASCADE)
    ratingAuthor = models.SmallIntegerField(default=0)

    def update_rating(self):
        postRat = self.post_set.aggregate(postRating=Sum('rating'))
        pRat = 0
        print(postRat, pRat)
        pRat += postRat.get('postRating')

        commentRat = self.authorUser.comment_set.aggregate(commentRating=Sum('rating'))
        cRat = 0
        print(commentRat, cRat)
        cRat += commentRat.get('commentRating')

        self.ratingAuthor = pRat * 3 + cRat
        self.save()

    def __str__(self):
        return f'{self.authorUser.username}'

    class Meta:
        verbose_name = 'Автор'
        verbose_name_plural = 'Авторы'


class Category (models.Model):
    name = models.CharField(max_length=64, unique=True)
    discription = models.TextField(default='Default description', verbose_name='Описание категории')
    subscribers = models.ManyToManyField(User, blank=True, related_name='categories', verbose_name='Подписчики', through='Subscriber')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Категория'
        verbose_name_plural = 'Категории'


class Post (models.Model):
    NEWS = 'NW'
    ARTICLE = 'AR'
    CATEGORY_CHOICES =[
        (NEWS, 'Новость'),
        (ARTICLE, 'Статья'),
    ]
    categoryType = models.CharField(max_length=2, choices=CATEGORY_CHOICES, default=ARTICLE, verbose_name='Тип публикации')
    dataCreation = models.DateTimeField(auto_now_add=True, verbose_name='Дата и время создания публикации')
    postCategory = models.ManyToManyField(Category, through='PostCategory', verbose_name='Категория публикации')
    title = models.CharField(max_length=128, verbose_name='Заголовок публикации')
    text = models.TextField(verbose_name='Текст публикации')
    rating = models.SmallIntegerField(default=0, verbose_name='Рейтинг публикации')
    author = models.ForeignKey(Author, on_delete=models.CASCADE, verbose_name='Автор публикации')


    def Like(self):
        self.rating += 1
        self.save()

    def Dislike(self):
        self.rating -= 1
        self.save()

    def Preview(self):
        return self.text[0:123]+'...'

    def __str__(self):
        return f'{self.title.title()}'

    def get_absolute_url(self):
        return reverse('post_detail', args=[str(self.id)])

    class Meta:
        ordering = ['-dataCreation',]
        verbose_name = 'Публикация'
        verbose_name_plural = 'Публикации'


class PostCategory (models.Model):
    postThrough = models.ForeignKey(Post, on_delete=models.CASCADE)
    categoryThrough = models.ForeignKey(Category, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.postThrough.title}: {self.categoryThrough.name}'

    class Meta:
        verbose_name = 'Категория публикации'
        verbose_name_plural = 'Категории публикаций'


class Comment (models.Model):
    commentPost = models.ForeignKey(Post, on_delete=models.CASCADE)
    commentUser = models.ForeignKey(User, on_delete=models.CASCADE)
    text = models.TextField()
    dataCreation = models.DateTimeField (auto_now_add=True)
    rating = models.SmallIntegerField(default=0)

    def Like(self):
        self.rating +=1
        self.save()

    def Dislike(self):
        self.rating -= 1
        self.save()

    def __str__(self):
        return f'{self.text}'

    class Meta:
        verbose_name = 'Комментарий'
        verbose_name_plural = 'Комментарии'


class Subscriber(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='subscriptions',)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='subscriptions',)