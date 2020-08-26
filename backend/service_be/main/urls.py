from django.urls import path

from main.views import RootView, UserList, UserDetail, JobsList, JobsDetail, ProposalsList, ProposalsDetail, ProposalsCreate

urlpatterns = [
    path('', RootView.as_view(), name='root-view'),
    path('users', UserList.as_view(), name='user-list'),
    path('users/<str:pk>', UserDetail.as_view(), name='user-detail'),
    path('jobs', JobsList.as_view(), name='jobs-list'),
    path('jobs/<str:pk>', JobsDetail.as_view(), name='jobs-detail'),
    path('proposals/<str:pk>', ProposalsList.as_view(), name='proposals-list'),
    path('proposals', ProposalsCreate.as_view(), name='proposals-create'),
    path('proposals/<str:pk>', ProposalsDetail.as_view(), name='proposals-detail'),
]