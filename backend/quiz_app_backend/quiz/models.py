from django.db import models
from django.conf import settings

# Create your models here.

class Quiz_groups(models.Model):

    privacy_types = (
        ("Public","Public"),
        ("Private","Private")
    )

    group_id = models.AutoField(primary_key=True)
    group_name = models.CharField(max_length=100, null=False, blank=False)
    group_desc = models.TextField(default="This is a group")
    group_privacy = models.CharField(choices=privacy_types,max_length=10,default="Public")
    group_creater = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)


class Quiz(models.Model):
    quiz_id = models.AutoField(primary_key=True)
    quiz_title = models.CharField(max_length=100, null=False, blank=False)
    quiz_desc = models.TextField(default="This is a Quiz")
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    password = models.CharField(max_length=10, null=False, blank=False)
    group = models.ForeignKey(Quiz_groups, on_delete=models.CASCADE,null=True)
    quiz_creater = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    status = models.CharField(max_length=10, default="Draft")

class Summary(models.Model):
    summary_id = models.AutoField(primary_key=True)
    Total_questions = models.IntegerField(default=0)
    wrong_questions = models.IntegerField(default=0)
    Correct_questions = models.IntegerField(default=0)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    percentage = models.IntegerField(default=0)
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE ,null=True)
    status = models.CharField(max_length=10,default="N/A",null=True,blank=True)




class Question(models.Model):

    ques_id = models.AutoField(primary_key=True)
    question = models.CharField(max_length=100, null=False, blank=False)
    option_a = models.CharField(max_length=20, null=False, blank=False)
    option_b = models.CharField(max_length=20, null=False, blank=False)
    option_c = models.CharField(max_length=20, null=False, blank=False)
    option_d = models.CharField(max_length=20, null=False, blank=False)
    hint_a = models.CharField (null=True, blank=True)
    hint_b = models.CharField(null=True, blank=True)
    answer = models.CharField(max_length=20, null=False, blank=False)
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE ,null=True)



# class Quiz_groups(models.Model):
#
#     privacy_types = (
#         ("Public","Public"),
#         ("Private","Private")
#     )
#
#     group_id = models.AutoField(primary_key=True)
#     group_name = models.CharField(max_length=100, null=False, blank=False)
#     group_desc = models.TextField(default="This is a group")
#     group_privacy = models.CharField(choices=privacy_types,max_length=10,default="Public")
#     group_creater = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)



class User_Quiz_Details(models.Model):
    user_id = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    quiz_id = models.ForeignKey(Quiz, on_delete=models.CASCADE)
    submission_time = models.DateField()
    class Meta:
        unique_together = (('user_id', 'quiz_id'),)


class User_Group_Details(models.Model):
    role = (
        ("Admin","Admin"),
        ("Participant","Participant")
    )
    choice = (
        ("Yes","Yes"),
        ("No","No")
    )
    user_id = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    group_id = models.ForeignKey(Quiz_groups, on_delete=models.CASCADE)
    role = models.CharField(choices=role,max_length=20,null=True,blank=True,default="Participant")
    isMember = models.CharField(choices=choice, null=True,blank=True , max_length=5,default="No")
    class Meta:
        unique_together = (('user_id', 'group_id'),)




class Quiz_Group_Details(models.Model):
    group_id = models.ForeignKey(Quiz_groups, on_delete=models.CASCADE)
    quiz_id = models.ForeignKey(Quiz, on_delete=models.CASCADE)
    class Meta:
        unique_together = (('quiz_id', 'group_id'),)


class User_Quiz_Question_Details(models.Model):
    # options = (
    #     ("A","A"),
    #     ("B","B"),
    #     ("C","C"),
    #     ("D","D")
    # )
    
    user_id = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    quiz_id = models.ForeignKey(Quiz, on_delete=models.CASCADE)
    ques_id = models.ForeignKey(Question, on_delete=models.CASCADE)
    answer = models.CharField(max_length=20, null=False, blank=False)
    class Meta:
        unique_together = (('user_id', 'quiz_id', 'ques_id'),)


class Quiz_Question_Details(models.Model):
    quiz_id = models.ForeignKey(Quiz, on_delete=models.CASCADE)
    ques_id = models.ForeignKey(Question, on_delete=models.CASCADE)
    class Meta:
        unique_together = (('quiz_id', 'ques_id'),)