from django.contrib import admin
from .models import Quiz , Quiz_groups , Question , User_Group_Details , Summary

# Register your models here.
admin.site.register(Quiz)
admin.site.register(Quiz_groups)
admin.site.register(Question)
admin.site.register(User_Group_Details)
admin.site.register(Summary)
