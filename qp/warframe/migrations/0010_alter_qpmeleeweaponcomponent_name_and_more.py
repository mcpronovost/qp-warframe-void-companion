# Generated by Django 4.1.4 on 2022-12-21 21:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('warframe', '0009_qpmeleeweaponcomponent_quantity_count_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='qpmeleeweaponcomponent',
            name='name',
            field=models.CharField(choices=[('blueprint', 'Blueprint'), ('barrel', 'Barrel'), ('blade', 'Blade'), ('blades', 'Blades'), ('chain', 'Chain'), ('gauntlet', 'Gauntlet'), ('grip', 'Grip'), ('guard', 'Guard'), ('handle', 'Handle'), ('head', 'Head'), ('hilt', 'Hilt'), ('link', 'Link'), ('lowerlimb', 'Lower Limb'), ('ornament', 'Ornament'), ('pouch', 'Pouch'), ('receiver', 'Receiver'), ('stars', 'Stars'), ('stock', 'Stock'), ('string', 'String'), ('upperlimb', 'Upper Limb')], max_length=32, verbose_name='Name'),
        ),
        migrations.AlterField(
            model_name='qpprimaryweaponcomponent',
            name='name',
            field=models.CharField(choices=[('blueprint', 'Blueprint'), ('barrel', 'Barrel'), ('blade', 'Blade'), ('blades', 'Blades'), ('chain', 'Chain'), ('gauntlet', 'Gauntlet'), ('grip', 'Grip'), ('guard', 'Guard'), ('handle', 'Handle'), ('head', 'Head'), ('hilt', 'Hilt'), ('link', 'Link'), ('lowerlimb', 'Lower Limb'), ('ornament', 'Ornament'), ('pouch', 'Pouch'), ('receiver', 'Receiver'), ('stars', 'Stars'), ('stock', 'Stock'), ('string', 'String'), ('upperlimb', 'Upper Limb')], max_length=32, verbose_name='Name'),
        ),
        migrations.AlterField(
            model_name='qpsecondaryweaponcomponent',
            name='name',
            field=models.CharField(choices=[('blueprint', 'Blueprint'), ('barrel', 'Barrel'), ('blade', 'Blade'), ('blades', 'Blades'), ('chain', 'Chain'), ('gauntlet', 'Gauntlet'), ('grip', 'Grip'), ('guard', 'Guard'), ('handle', 'Handle'), ('head', 'Head'), ('hilt', 'Hilt'), ('link', 'Link'), ('lowerlimb', 'Lower Limb'), ('ornament', 'Ornament'), ('pouch', 'Pouch'), ('receiver', 'Receiver'), ('stars', 'Stars'), ('stock', 'Stock'), ('string', 'String'), ('upperlimb', 'Upper Limb')], max_length=32, verbose_name='Name'),
        ),
    ]
