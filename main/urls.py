from django.urls import path
from main import views
from main.views import register
from main.views import login_user
from main.views import logout_user
from main.views import edit_product
from main.views import delete_product

app_name = 'main'

urlpatterns = [
    path('', views.show_main, name='show_main'),
    path('create/', views.create_product, name='create_product'),
    path('product/<uuid:id>/delete/', views.delete_product, name='delete_product'),
    path('<uuid:id>/', views.show_product, name='show_product'),
    path('xml/', views.show_xml, name='show_xml'),
    path('json/', views.show_json, name='show_json'),
    path('xml/<uuid:product_id>/', views.show_xml_by_id, name='show_xml_by_id'),
    path('json/<uuid:product_id>/', views.show_json_by_id, name='show_json_by_id'),
    path('register/', register, name='register'),
    path('login/', login_user, name='login'),
    path('logout/', logout_user, name='logout'),
    path('product/<uuid:id>/edit/', edit_product, name='edit_product'),
]
