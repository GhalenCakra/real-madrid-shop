from django.urls import path
from main.views import (
    landing_page, 
    show_main, 
    create_product, 
    show_product, 
    edit_product, 
    delete_product,
    show_xml,
    show_json,
    show_xml_by_id,
    show_json_by_id,
    register,
    login_user,
    logout_user,
    add_product_entry_ajax
)

app_name = 'main'

urlpatterns = [
    path('', landing_page, name='landing'),
    path('main/', show_main, name='show_main'),
    path('create-product/', create_product, name='create_product'),
    path('product/<uuid:id>/', show_product, name='show_product'),
    path('product/<uuid:id>/edit/', edit_product, name='edit_product'),
    path('product/<uuid:id>/delete/', delete_product, name='delete_product'),
    path('xml/', show_xml, name='show_xml'),
    path('json/', show_json, name='show_json'),
    path('xml/<uuid:id>/', show_xml_by_id, name='show_xml_by_id'),
    path('json/<uuid:id>/', show_json_by_id, name='show_json_by_id'),
    path('register/', register, name='register'),
    path('login/', login_user, name='login'),
    path('logout/', logout_user, name='logout'),
    path('create-product-ajax/', add_product_entry_ajax, name='add_product_entry_ajax'),
]
