# -*- coding: utf-8 -*-
# Generated by Django 1.9 on 2015-12-14 02:58
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('worms', '0009_account_fb_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='account',
            name='fb_id',
            field=models.CharField(default='12345', max_length=200),
        ),
    ]
