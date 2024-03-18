import base64
import io

from PIL import Image
from django.http import JsonResponse
from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from .models import *
from .serializers import *
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAuthenticatedOrReadOnly
from rest_framework.decorators import action
from django.contrib.auth import get_user_model
from django.db.models import Q
from .models import User_Group_Details , Quiz_groups
from accounts.serializers import registerSerializer


############# GROUP API's #################

class search_group(APIView):
    def get(self, request):
        try:
            # rec = [[g.group_id, g.group_name , g.group_privacy] for g in Quiz_groups.objects.all()]
            rec = [{"group_id": g.group_id, "group_name": g.group_name, "group_privacy": g.group_privacy} for g in
                   Quiz_groups.objects.all()]
            # response = dict()
            # for i in range(len(rec)):
            #     response[i] = rec[i]
            return Response(rec)
        except:
            return Response({"error": "Try Again Later"})


class list_group(APIView):
    def get(self, request):
        try:
            rec = [[g.group_id, g.group_name] for g in Quiz_groups.objects.all()]

            req_rec = [g.group_id.group_id for g in User_Group_Details.objects.filter(user_id=request.user).all()]
            response = dict()

            for i in rec:
                if i[0] in req_rec:
                    response[i[0]] = i[1]

            return Response(response)
        except Exception as e:
            return Response({"error": "Try Again Later", "E": f"{e}"})


class participants(APIView):
    def post(self, request):
        try:
            participants = User_Group_Details.objects.filter(group_id=request.data['group_id'], isMember="Yes")
            users = [{"user_id": u.user_id.id, "name": u.user_id.name , "group_id":request.data['group_id'] } for u in participants]
            print(users)
            return Response(users)
        except:
            return Response({"error": "Try Again Later"})


class create_group(APIView):
    def post(self, request):
        serializer = GroupSerializer(data=request.data)
        data = {}
        if serializer.is_valid(raise_exception=True):
            groupdata = serializer.save(request)
            data['response'] = 'successfully created'
            data['group_name'] = groupdata.group_name
            data['group_id'] = groupdata.group_id
            return Response(data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class delete_group(APIView):
    def post(self, request):
        group = Quiz_groups.objects.filter(group_id=request.data['group_id']).first()
        if group and group.group_creater==request.user:
            group.delete()
            data = dict()
            data['response'] = 'successfully deleted group'
            return Response(data, status=status.HTTP_201_CREATED)
        else:
            return Response( status=status.HTTP_400_BAD_REQUEST)


class delete_quiz(APIView):
    def post(self, request):
        quiz = Quiz.objects.filter(group_id=request.data['quiz_id']).first()
        group = Quiz_groups.objects.filter(group_id=request.data['group_id']).first()
        if quiz and group.group_creater==request.user:
            quiz.delete()
            data = dict()
            data['response'] = 'successfully deleted quiz'
            return Response(data, status=status.HTTP_201_CREATED)
        else:
            return Response( status=status.HTTP_400_BAD_REQUEST)


class leave_group(APIView):
    def post(self, request):
        group = Quiz_groups.objects.filter(group_id=request.data['group_id']).first()
        q_u = User_Group_Details.objects.filter(group_id=group).filter(user_id=request.user).first()
        if q_u:
            if q_u.role == "Admin":
                q_u = None
                group.delete()
            else:
                q_u.delete()
            return Response({"message": "Left Successfully"})
        return Response({"error": "Some Error Occured"})


class join_group(APIView):
    def post(self, request):
        group = Quiz_groups.objects.filter(group_id=request.data['group_id']).first()
        if group:
            q_u = User_Group_Details(group_id=group, user_id=request.user, role="Participant", isMember="Yes")
            q_u.save()
            return Response({"message": "Joined Successfully"})
        return Response({"error": "Some Error Occured"})


class quiz_activity(APIView):
    def get(self, request):
        group = Quiz_groups.objects.filter(group_id=request.data['group_id']).first()
        quizzes = Quiz_Group_Details.objects.filter(group_id=group).all()
        response = dict()
        for i in quizzes:
            quiz = Quiz.objects.filter(quiz_id=i).all()
            response[i.quiz_id] = {
                "quiz_title": quiz.quiz_title,
                "start_timee": quiz.start_time,
                "end_time": quiz.end_time,
            }
        return Response(response)


class create_quiz(APIView):
    def post(self, request):
        serializer = QuizSerializer(data=request.data)
        data = {}
        if serializer.is_valid(raise_exception=True):
            quizdata = serializer.save(request)
            data['response'] = 'successfully created'
            data['quiz_name'] = quizdata.quiz_title
            data['quiz_id'] = quizdata.quiz_id
            data['group_id']=request.data['group_id']
            return Response(data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class create_question(APIView):
    def post(self, request):
        serializer = questionSerializer(data=request.data)
        data = {}
        if serializer.is_valid(raise_exception=True):
            quesdata = serializer.save(request)
            data['response'] = 'successfully created'
            data['question'] = quesdata.question
            data['ques_id'] = quesdata.ques_id
            data['quiz_id']=request.data['quiz_id']
            return Response(data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


################ QUIZ API's ###############

class get_all_quiz(APIView):
    def get(self, request):
        try:
            rec = [[Q.quiz_id, Q.quiz_title] for Q in Quiz.objects.filter(group_id=request.data['group_id']).all()]
            response = dict()
            for i in range(len(rec)):
                response[i] = rec[i]
            return Response(response)
        except:
            return Response({"error": "Try Again Later"})


class global_groups(APIView):
    def get(self, request):
        try:
            joinded_groups_ids = [g.group_id.group_id for g in User_Group_Details.objects.filter(user_id=request.user).all()]
            rec = [{"group_id": g.group_id, "group_name": g.group_name, "group_privacy": g.group_privacy} for g in
                   Quiz_groups.objects.exclude(Q(group_id__in=joinded_groups_ids) | Q(group_creater_id=request.user.id)).all()]

            return Response(rec)
        except Exception as e:
            return Response({"error": f"Try Again Later   {e}"})


class joined_groups(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            joinded_groups_ids = [g.group_id.group_id for g in User_Group_Details.objects.filter(user_id=request.user.id,isMember="Yes").all()]
            rec = [{"group_id": g.group_id, "group_name": g.group_name, "group_privacy": g.group_privacy} for g in
                   Quiz_groups.objects.filter(group_id__in=joinded_groups_ids).all()]

            return Response(rec)
        except Exception as e:
            return Response({"error": f"Try Again Later {e}"})


class created_groups(APIView):
    def get(self, request):
        try:
            rec = [{"group_id": g.group_id, "group_name": g.group_name, "group_privacy": g.group_privacy} for g in
                   Quiz_groups.objects.filter(group_creater_id=request.user.id).all()]

            return Response(rec)
        except Exception as e:
            return Response({"error": f"Try Again Later {e}"})

class get_quiz(APIView):
    def post(self,request):
        try:
            rec = [{"quiz_id": q.quiz_id, "quiz_title": q.quiz_title, "quiz_desc": q.quiz_desc} for q in
               Quiz.objects.filter(group_id=request.data['group_id']).all()]
            quiz_count = len(Quiz.objects.filter(group=request.data['group_id']).all())
            member_count = len(User_Group_Details.objects.filter(group_id=request.data['group_id'],isMember="Yes").all())
            data = {"quiz_count": quiz_count, "member_count":member_count, "quiz_details":rec}
            return Response(data)
        except Exception as e:
            return Response({"error": f"Try Again Later {e}"})



#### quiz ke questiion aur saari hint
class get_quiz_data(APIView):
    def get(self, request):
        try:
            quiz = Quiz.objects.filter(quiz_id=request.GET.get('quiz_id')).first()
            rec = [{"ques_id":q.ques_id,"question":q.question,"option_a":q.option_a,"option_b":q.option_b,"option_c":q.option_c,"option_d":q.option_d,"hint_a":q.hint_a,"hint_b":q.hint_b,"answer":q.answer,"quiz_id":q.quiz.quiz_id} for q in Question.objects.filter(quiz=quiz).all()]
            data = list()
            x = dict()
            options = list()
            hints = list()
            for q in rec:
                x['ques_id'] = q['ques_id']
                x['question'] = q['question']
                x['answer'] = q['answer']
                x['quiz_id'] = q['quiz_id']
                options.append(q['option_a'])
                options.append(q['option_b'])
                options.append(q['option_c'])
                options.append(q['option_d'])
                x['options'] = options
                options = list()
                hints.append(q['hint_a'])
                hints.append(q['hint_b'])
                x['hints'] = hints
                hints = list()
                data.append(x)
                x = dict()
            print(data)
            return Response(data)

        except Exception as e:
            return Response({"error": f"Try Again Later {e}"})



class delete_quiz(APIView):
    def post(self, request):
        quiz = Quiz.objects.filter(quiz_id=request.data['quiz_id']).first()
        if quiz:
            quiz.delete()
            return Response({"message": "Left Successfully"})
        return Response({"error": "Some Error Occured"})



class finish_quiz(APIView):
    def post(self, request):
        serializer = SummarySerializer(data=request.data)
        data = {}
        if serializer.is_valid(raise_exception=True):
            serializer.save(request)
            data['response'] = 'successfully saved summary'

            return Response(data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class send_invite(APIView):
    def post(self, request):
        group = Quiz_groups.objects.filter(group_id=request.data['group_id']).first()

        if request.user and group:
            invite = User_Group_Details(group_id=group, user_id=request.user,isMember="No")
            invite.save()
            print(invite)
            data = dict()
            data['response'] = 'successfully request sent invite'
            return Response(data, status=status.HTTP_201_CREATED)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class get_all_invite(APIView):
    def post(self, request):
        invites = [{"member_id": i.user_id.id, "group_id": i.group_id.group_id, "name":i.user_id.name}for i in User_Group_Details.objects.filter(group_id=request.data['group_id'], isMember="No").all()]

        if invites:
            return Response(invites, status=status.HTTP_201_CREATED)
        else:
            return Response([], status=status.HTTP_400_BAD_REQUEST)


class accept_invite(APIView):
    def post(self, request):
        group = Quiz_groups.objects.filter(group_id=request.data['group_id']).first()
        User = get_user_model()
        user = User.objects.get(pk=request.data['member_id'])

        if  user and group:
            invite = User_Group_Details.objects.filter(group_id=group, user_id=user).first()
            invite.isMember = "Yes"
            invite.save()
            data = dict()
            data['response'] = 'successfully accepted the invite'
            return Response(data, status=status.HTTP_201_CREATED)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)
class reject_invite(APIView):
    def post(self, request):
        group = Quiz_groups.objects.filter(group_id=request.data['group_id']).first()
        User = get_user_model()
        user = User.objects.get(pk=request.data['member_id'])

        if  user and group:
            invite = User_Group_Details.objects.filter(group_id=group, user_id=user).first()
            invite.delete()
            data = dict()
            data['response'] = 'successfully leaved or reject the invite'
            return Response(data, status=status.HTTP_201_CREATED)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class createquizwithquestion(APIView):
    def post(self, request):
        print(request.data)
        quiz_data = request.data['quiz_data']
        question_data = request.data['question_data']
        quiz_data['group_id'] = request.data['group_id']
        quizserializer=QuizSerializer(data=quiz_data);
        if(quizserializer.is_valid(raise_exception=True)):
            quiz = quizserializer.save(request)
            if quiz:
                request.data['quiz_id'] = quiz.quiz_id
                for q in question_data:
                    questionserializer = questionSerializer(data=q['question'])
                    if questionserializer.is_valid(raise_exception=True):
                        question = questionserializer.save(request)
                    else:
                        quiz.delete()
                        return Response({"question_error" : questionserializer.error , "error" : "error in making question"}, status=status.HTTP_400_BAD_REQUEST)
                return Response({"message":"quiz and questions successfully created"}, status=status.HTTP_201_CREATED)
            else:
                return Response({"message":"error in creating quiz"},status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response("quiz not created", status=status.HTTP_400_BAD_REQUEST)


class getStatistics(APIView):
    def post(self,request):
        user = request.user
        scores = Summary.objects.filter(user=user).all();
        rec = [{"quiz_title":x.quiz.quiz_title,"status":x.status,"wrong_questions":x.wrong_questions,"correct_questions":x.Correct_questions} for x in scores]
        return Response(rec)

class getUserData(APIView):
    def post(self,request):
        User = get_user_model()
        if request.data.get('user_id') is not None:
            user = User.objects.get(pk=request.data['user_id'])
        else:
            user = User.objects.get(pk=request.user.id)
        image = Image.open(io.BytesIO(user.image.read()))
        with io.BytesIO() as buffer:
            image.save(buffer, format="JPEG")
            image_bytes = buffer.getvalue()
        encoded_image = base64.b64encode(image_bytes)

        return Response({"name":user.name,"email":user.email,"image":encoded_image})


