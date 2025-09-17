from django.db import migrations, models

class Migration(migrations.Migration):

    dependencies = [
        ('main', '0007_alter_product_views'),  # Ganti dengan migrasi terakhir yang benar
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='thumbnail',
            field=models.URLField(blank=True, null=True),
        ),
    ]