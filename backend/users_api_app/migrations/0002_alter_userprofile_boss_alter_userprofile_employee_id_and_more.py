# Generated by Django 4.0.2 on 2022-02-23 18:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users_api_app', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='boss',
            field=models.IntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='employee_id',
            field=models.IntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='national_id',
            field=models.IntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='sales',
            field=models.IntegerField(null=True),
        ),
    ]