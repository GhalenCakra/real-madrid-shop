from django.db import models

class Product(models.Model):
    name = models.CharField(max_length=255)
    price = models.IntegerField()
    description = models.TextField()
    thumbnail = models.URLField()
    category = models.CharField(max_length=100)
    is_featured = models.BooleanField(default=False)

    # optional tambahan
    stock = models.IntegerField(default=0)
    brand = models.CharField(max_length=100, default='Real Madrid')

    def __str__(self):
        return self.name

