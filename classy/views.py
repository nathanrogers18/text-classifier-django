from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponseRedirect
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User

# from .forms import UserCreateForm
from .models import Classifier


def index(request):
    return render(request, 'classy/index.html', context={})


def classifier(request, pk):
    classifier = Classifier.objects.get(pk=pk)
    corpus = classifier.corpus_set.all()
    labels = {corpi.category for corpi in corpus}
    context = {'classifier': classifier, 'labels': labels}

    return render(request, 'classy/classifier.html', context)


def signin(request):
    if request.POST:
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(username=username, password=password)
        if user is not None:
            login(request, user)
            return HttpResponseRedirect("/profile/{}".format(user.id))
    else:
        return render(request, 'registration/login.html')


def signout(request):
    logout(request)
    return render(request, 'registration/logout.html')


def register(request):
    if request.method == 'POST':
        user = UserCreationForm(request.POST)
        print(user)
        if user.is_valid():
            user.save()
            if user is not None:
                print(user)
                new_user = authenticate(username=user.cleaned_data['username'],
                                        password=user.cleaned_data['password1'])
                login(request, new_user)
                return HttpResponseRedirect("/profile/{}".format(new_user.id))

        else:
            user = UserCreationForm()
    context = {'form': UserCreationForm()}
    return render(request, 'registration/register.html', context)


def profile(request):
    user_prof = User.objects.get(pk=request.user.id)
    context = {'user': user_prof}
    return render(request, 'classy/profile.html', context)
