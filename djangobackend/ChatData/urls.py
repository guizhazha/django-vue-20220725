from django.urls import path
from .views import SendMessageView, GetMessageView, ReadView

urlpatterns = [
    path('sendMessage/', SendMessageView.as_view()),
    path('getMessage/', GetMessageView.as_view()),
    path('read/', ReadView.as_view()),
]
