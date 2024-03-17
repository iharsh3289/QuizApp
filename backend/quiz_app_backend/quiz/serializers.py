from rest_framework import serializers
from django.conf import settings
from .models import Quiz_groups, User_Group_Details, Quiz, Quiz_Group_Details, Question, Summary
from django.contrib import auth
from django.contrib.auth import get_user
from datetime import datetime, timedelta



class GroupSerializer(serializers.ModelSerializer):
    privacy = (
        ("Public","Public"),
        ("Private","Private")
    )
    group_name = serializers.CharField(max_length=100)
    group_desc = serializers.CharField(default="This is a group", required=False)
    group_privacy = serializers.ChoiceField(choices=privacy)

    class Meta:
        model = Quiz_groups
        fields = ['group_name','group_desc','group_privacy']

    def save(self, request):
        group_name = self.validated_data['group_name']
        group_desc = self.validated_data['group_desc']
        group_privacy = self.validated_data['group_privacy']

        try:
            print(group_name, group_privacy)
            group = Quiz_groups(group_name=group_name, group_desc=group_desc, group_privacy=group_privacy, group_creater=request.user)
            group.save()

            try:
                u_q = User_Group_Details(group_id=group, user_id=request.user, role="Admin" , isMember="Yes")
                u_q.save()
            except:
                group.delete()
                raise serializers.ValidationError({"error":"Group can't be created."})
            return group
        except Exception as e:
            raise serializers.ValidationError({"error":"Group can't be created","E":f"{e}"})


class QuizSerializer(serializers.ModelSerializer):

    def three_hours_from_now():
        return (datetime.now()+ timedelta(hours=3)).strftime("%Y-%m-%d %H:%M:%S")


    quiz_title = serializers.CharField(max_length=100)
    quiz_desc = serializers.CharField(default="This is a quiz", required=False)
    start_time = serializers.DateTimeField(required=False, default=datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
    end_time = serializers.DateTimeField(required=False, default=three_hours_from_now)
    password = serializers.CharField(max_length=10, required=False)
    group_id = serializers.CharField()
    status = serializers.CharField(max_length=10, required=False)



    class Meta:
        model = Quiz
        fields = ['quiz_title','quiz_desc','start_time','end_time', 'password', 'group_id', 'status']

    def save(self, request):
        quiz_title = self.validated_data['quiz_title']
        if 'quiz_desc' in self.validated_data.keys():
            quiz_desc = self.validated_data['quiz_desc']
        else:
            quiz_desc = "This is a quiz"
        if 'start_time' in self.validated_data.keys():
            start_time = self.validated_data['start_time']
        else:
            start_time = ""
        if 'end_time' in self.validated_data.keys():
            end_time = self.validated_data['end_time']
        else:
            end_time = ""
        if 'password' in self.validated_data.keys():
            password = self.validated_data['password']
        else:
            password = ""
        if 'status' in self.validated_data.keys():
            status = "Published" if self.validated_data['status']=="Published" else "Draft"
        else:
            status = "Draft"

        try:
            user = request.user
            print(user)
            group = Quiz_groups.objects.filter(group_id=request.data['group_id']).first()
            quiz = Quiz(quiz_title=quiz_title, quiz_desc=quiz_desc, start_time=start_time, end_time=end_time, password=password, quiz_creater=user, status=status , group=group)
            quiz.save()

            try:
                group = Quiz_groups.objects.filter(group_id=request.data['group_id']).first()

                if not group:
                    raise Exception("Enter valid group_id")
                
                if not User_Group_Details.objects.filter(user_id=user, group_id=group).first().role == "Admin":
                    raise Exception("User must be Admin")

                g_q = Quiz_Group_Details(group_id = group, quiz_id=quiz)
                g_q.save()
                
            except Exception as ex:
                quiz.delete()
                raise serializers.ValidationError({"error":"firstttttt Quiz can't be created.","E":f"{ex}"})
            return quiz
        except Exception as e:
            raise serializers.ValidationError({"error":"Quiz can't be created","E":f"{e}"})


class questionSerializer(serializers.ModelSerializer):
    question = serializers.CharField(max_length=100,required=True)
    option_a = serializers.CharField(max_length=20, required=True)
    option_b = serializers.CharField(max_length=20, required=False)
    option_c = serializers.CharField(max_length=20, required=False)
    option_d = serializers.CharField(max_length=20, required=False)
    hint_a = serializers.CharField(required=False)
    hint_b = serializers.CharField(required=False)
    answer = serializers.CharField(max_length=20,required=True)

    class Meta:
        model = Question
        fields = ['question','option_a','option_b','option_c','option_d','hint_a','hint_b','answer']


    def save(self, request):
        question = self.validated_data['question']
        answer = self.validated_data['answer']
        if 'option_a' in self.validated_data.keys():
            option_a = self.validated_data['option_a']
        else:
            option_a = ""
        if 'option_b' in self.validated_data.keys():
            option_b = self.validated_data['option_b']
        else:
            option_b = ""
        if 'option_c' in self.validated_data.keys():
            option_c = self.validated_data['option_c']
        else:
            option_c = ""
        if 'option_d' in self.validated_data.keys():
            option_d = self.validated_data['option_d']
        else:
            option_d = ""
        if 'hint_a' in self.validated_data.keys():
            hint_a = self.validated_data['hint_a']
        else:
            hint_a = ""
        if 'hint_b' in self.validated_data.keys():
            hint_b = self.validated_data['hint_b']
        else:
            hint_b = ""

        try:
            quiz = Quiz.objects.filter(quiz_id=request.data['quiz_id']).first()
            question = Question(question=question, option_a=option_a, option_b=option_b, option_c=option_c, option_d=option_d, answer=answer,hint_a=hint_a , hint_b=hint_b , quiz=quiz)
            question.save()
            return question

        except Exception as e:
            raise serializers.ValidationError({"error":"Question can't be created","E":f"{e}"})

class SummarySerializer(serializers.ModelSerializer):
    Total_questions = serializers.IntegerField(default=0)
    wrong_questions = serializers.IntegerField(default=0)
    Correct_questions = serializers.IntegerField(default=0)
    percentage = serializers.IntegerField(default=0)  # Adding percentage field
    status = serializers.CharField(default="N/A")

    class Meta:
        model = Summary
        fields = ['Total_questions', 'wrong_questions', 'Correct_questions', 'percentage', 'status']

    def save(self, request):
        Total_questions = self.validated_data['Total_questions']
        wrong_questions = self.validated_data['wrong_questions']
        Correct_questions = self.validated_data['Correct_questions']
        percentage = self.validated_data['percentage']
        if(percentage <= 50):
            status = "Loss"
        else:
            status = "Won"

        try:
            quiz = Quiz.objects.filter(quiz_id=request.data['quiz_id']).first()
            summary = Summary(Total_questions=Total_questions, wrong_questions=wrong_questions,
                              Correct_questions=Correct_questions, percentage=percentage , quiz=quiz , user=request.user , status=status)
            summary.save()
        except Exception as e:
            raise serializers.ValidationError({"error": "Summary can't be created", "E": f"{e}"})
