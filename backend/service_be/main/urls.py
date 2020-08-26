from django.urls import path

from main.views import RootView, UserList, UserDetail, JobsList, JobsDetail, ProposalsList, ProposalsDetail

urlpatterns = [
    path('', RootView.as_view(), name='root-view'),
    path('users', UserList.as_view(), name='user-list'),
    path('users', UserDetail.as_view(), name='user-detail'),
    path('jobs', JobsList.as_view(), name='jobs-list'),
    path('jobs', JobsDetail.as_view(), name='jobs-detail'),
    path('proposals', ProposalsList.as_view(), name='proposals-list'),
    path('proposals', ProposalsDetail.as_view(), name='proposals-detail'),
]