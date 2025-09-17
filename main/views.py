from django.shortcuts import render, redirect, get_object_or_404
from django.core import serializers
from django.http import HttpResponse
from main.forms import ProductForm
from main.models import Product
from django.db.models import F
from django.contrib import messages


def show_main(request):
    products = Product.objects.all()
    context = {
        'npm': '2406437306',
        'name': 'Ghalen Cakra Permana',
        'class': 'PBP B',
        'product_list': products
    }
    return render(request, "main.html", context)

def create_product(request):
    form = ProductForm(request.POST or None)
    if form.is_valid() and request.method == "POST":
        form.save()
        return redirect('main:show_main')

    return render(request, "create_product.html", {'form': form})

def show_product(request, id):
    product = get_object_or_404(Product, pk=id)
    Product.objects.filter(pk=product.pk).update(views=F('views') + 1)
    product.refresh_from_db()

    return render(request, "product_detail.html", {"product": product})

def delete_product(request, id):
    product = get_object_or_404(Product, id=id)
    product.delete()
    return redirect('main:show_main') 

def show_xml(request):
    products = Product.objects.all()
    xml_data = serializers.serialize("xml", products)
    return HttpResponse(xml_data, content_type="application/xml")

def show_json(request):
    products = Product.objects.all()
    json_data = serializers.serialize("json", products)
    return HttpResponse(json_data, content_type="application/json")

def show_xml_by_id(request, product_id):
    product = Product.objects.filter(pk=product_id)
    if not product.exists():
        return HttpResponse(status=404)
    xml_data = serializers.serialize("xml", product)
    return HttpResponse(xml_data, content_type="application/xml")

def show_json_by_id(request, product_id):
    try:
        product = Product.objects.get(pk=product_id)
    except Product.DoesNotExist:
        return HttpResponse(status=404)
    json_data = serializers.serialize("json", [product])
    return HttpResponse(json_data, content_type="application/json")
