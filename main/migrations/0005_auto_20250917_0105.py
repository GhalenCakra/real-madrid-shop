from django.db import migrations, models

class Migration(migrations.Migration):

    dependencies = [
        ('main', '0004_auto_20250917_0105'),   
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='thumbnail',
            field=models.URLField(blank=True, null=True),
        ),
    ]
