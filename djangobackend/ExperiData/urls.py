from django.urls import path
from .views import CheckView, UploadView, UpdateRankView, UpdatePublicView, GetDataView, UnshowView

urlpatterns = [
    path('check/', CheckView.as_view()),
    path('upload/', UploadView.as_view()),
    path('updateRank/', UpdateRankView.as_view()),
    path('updatePublic/', UpdatePublicView.as_view()),
    path('getData/', GetDataView.as_view()),
    path('unshow/', UnshowView.as_view()),
]
