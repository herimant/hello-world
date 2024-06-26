from django.contrib.auth.models import User
from django.core.mail import EmailMultiAlternatives
from django.db.models.signals import m2m_changed
from django.dispatch import receiver

from django.conf import settings

from .models import Post

@receiver(m2m_changed, sender=Post.postCategory.through)
def notify_about_new_post(sender, instance, **kwargs):
    if kwargs['action'] == 'post_add':
        categories = instance.category.all()
        emails = User.objects.filter(
                subscriptions__category__in=instance.category.all()
            ).values_list('email', flat=True)

        print(f'Список email подписчиков: {emails}')

        subject = f'Новая публикация в категории: {", ".join(categories.values_list("name", flat=True))}'
        text_content = (
                f'Заголовок: {instance.title}\n'
                f'Ссылка на публикацию: http://127.0.0.1:8000{instance.get_absolute_url()}'
            )
        html_content = (
                f'Заголовок: {instance.title}<br>'
                f'<a href="http://127.0.0.1{instance.get_absolute_url()}">'
                f'Ссылка на публикацию</a>'
            )

        for email in emails:
            msg = EmailMultiAlternatives(subject, text_content, settings.DEFAULT_FROM_EMAIL, [email])
            msg.attach_alternative(html_content, "text/html")
            msg.send()