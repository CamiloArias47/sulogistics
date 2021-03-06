# Generated by Django 4.0.2 on 2022-02-23 18:15

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserProfile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('name', models.CharField(max_length=50)),
                ('lastname', models.CharField(max_length=30)),
                ('lastname2', models.CharField(max_length=30)),
                ('national_id', models.IntegerField()),
                ('birthday', models.DateTimeField(verbose_name='date of birthday')),
                ('gender', models.CharField(choices=[('M', 'masculino'), ('F', 'femenino')], max_length=1)),
                ('start_date', models.DateTimeField(verbose_name='start work date')),
                ('employee_id', models.IntegerField()),
                ('position', models.CharField(max_length=50)),
                ('boss', models.IntegerField()),
                ('zone', models.CharField(max_length=10)),
                ('city', models.CharField(max_length=50)),
                ('department', models.CharField(max_length=50)),
                ('sales', models.IntegerField()),
                ('email', models.EmailField(max_length=220, unique=True)),
                ('picture', models.CharField(max_length=200)),
                ('phone', models.CharField(max_length=20)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.Group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.Permission', verbose_name='user permissions')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
