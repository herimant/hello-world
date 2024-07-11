from django.contrib import admin
from .models import Author, Category, Post, PostCategory, Comment

class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name',)
    list_filter = ('name',)
    search_fields = ('name',)

class AuthorAdmin(admin.ModelAdmin):
    list_display = ('authorUser', 'ratingAuthor')
    list_filter = ('authorUser', 'ratingAuthor')
    search_fields = ('authorUser', 'ratingAuthor')

class PostAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'rating', 'categoryType')
    list_filter = ('author', 'rating', 'categoryType')
    search_fields = ('title', 'author', 'rating', 'categoryType')

class PostCategoryAdmin(admin.ModelAdmin):
    list_display = ('postThrough', 'categoryThrough')
    list_filter = ('postThrough', 'categoryThrough')
    search_fields = ('postThrough', 'categoryThrough')

class CommentAdmin(admin.ModelAdmin):
    list_display = ('commentUser', 'dataCreation', 'rating')
    list_filter = ('commentUser', 'dataCreation', 'rating')
    search_fields = ('commentUser', 'dataCreation', 'rating')

admin.site.register(Category, CategoryAdmin)
admin.site.register(Author, AuthorAdmin)
admin.site.register(Post, PostAdmin)
admin.site.register(PostCategory, PostCategoryAdmin)
admin.site.register(Comment, CommentAdmin)
