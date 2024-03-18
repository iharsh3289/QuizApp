from django.urls import path,include
from . import views
from rest_framework import routers
from django.conf import settings
from django.conf.urls.static import static

router=routers.DefaultRouter()

urlpatterns=[
    path('search_group', views.search_group.as_view(), name="search_group"),
    path('list_group', views.list_group.as_view(), name="list_group"),
    path('participants', views.participants.as_view(), name="participants"),
    path('create_group', views.create_group.as_view(), name="create_group"),
    path('leave_group', views.leave_group.as_view(), name="leave_group"),
    path('join_group', views.join_group.as_view(), name="join_group"),
    path('global_groups', views.global_groups.as_view(), name="global_groups"),
    # path('get_quiz_count_in_group', views.get_quiz_count_in_group.as_view(), name="get_quiz_count_in_group"),
    # path('get_member_count_in_group', views.get_member_count_in_group.as_view(), name="get_member_count_in_group"),
    path('created_groups', views.created_groups.as_view(), name="created_groups"),
    path('joined_groups', views.joined_groups.as_view(), name="joined_groups"),
    path('delete_group', views.delete_group.as_view(), name="delete_group"),

    path('create_quiz', views.create_quiz.as_view(), name="create_quiz"),
    path('delete_quiz', views.delete_quiz.as_view(), name="delete_quiz"),

    path('quiz_activity', views.quiz_activity.as_view(), name="quiz_activity"),
    path('create_question', views.create_question.as_view(), name="create_question"),
    path('get_quiz', views.get_quiz.as_view(), name="get_quiz"),
    path('get_quiz_data', views.get_quiz_data.as_view(), name="get_quiz_data"),
    path('send_invite', views.send_invite.as_view(), name="send_invite"),
    path('get_all_invite', views.get_all_invite.as_view(), name="get_all_invite"),
    path('accept_invite', views.accept_invite.as_view(), name="accept_invite"),
    path('reject_invite', views.reject_invite.as_view(), name="reject_invite"),
    path('createquizwithquestion', views.createquizwithquestion.as_view(), name="createquizwithquestion"),
    path('getStatistics', views.getStatistics.as_view(), name="getStatistics"),
    path('finish_quiz', views.finish_quiz.as_view(), name="finish_quiz"),
    path('getUserData', views.getUserData.as_view(), name="getUserData")

]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)