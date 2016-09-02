from django.shortcuts import render
from .models import Classifier


def index(request):
    return render(request, 'classy/index.html', context={})


def classifier(request, pk):
    classifier = Classifier.objects.get(pk=pk)
    corpus = classifier.corpus_set.all()
    labels = {corpi.category for corpi in corpus}
    context = {'classifier': classifier, 'labels': labels}

    return render(request, 'classy/classifier.html', context)
