# Generated by Django 4.1.4 on 2022-12-20 20:57

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('warframe', '0002_qpmeleeweapon_qpprimaryweapon_qpsecondaryweapon'),
    ]

    operations = [
        migrations.CreateModel(
            name='qpPrimaryWeaponComponent',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(choices=[('blueprint', 'Blueprint'), ('barrel', 'Barrel'), ('blade', 'Blade'), ('grip', 'Grip'), ('handle', 'Handle'), ('lowerlimb', 'Lower Limb'), ('receiver', 'Receiver'), ('stock', 'Stock'), ('string', 'String'), ('upperlimb', 'Upper Limb')], max_length=32, verbose_name='Name')),
                ('weapon', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='components', to='warframe.qpprimaryweapon', verbose_name='Weapon')),
            ],
            options={
                'verbose_name': 'Primary Weapon Component',
                'verbose_name_plural': 'Primary Weapon Components',
                'ordering': ['weapon', 'name'],
            },
        ),
    ]