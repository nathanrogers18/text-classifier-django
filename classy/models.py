from django.db import models
from django.contrib.auth.models import User
import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.grid_search import GridSearchCV
from sklearn.pipeline import Pipeline
from sklearn.metrics import accuracy_score
from sklearn import cross_validation


# Create your models here.
class Classifier(models.Model):
    name = models.CharField(max_length=100)
    is_visible = models.BooleanField(default=True)
    user = models.ForeignKey(User)

    def add_corpus(self, category, text):
        corp = Corpus(classifier=self, category=category.strip().lower(),
                      text=text)
        corp.save()

    def train(self):
        pipe = Pipeline([
            ('vect', CountVectorizer(
                        token_pattern=r'[a-zA-Z]+|\s+|\_+|[^\w\d\s]',
                        )),
                        # ngram_range=(1, 5)
                        # max_df=.4, 
            ('clf', MultinomialNB(0.0125)),
            ])

        corpus = self.corpus_set.all()
        text = [corp.text for corp in corpus]
        category = [corp.category for corp in corpus]

        self.trained_pipe = pipe.fit(text, category)

    def predict(self, value):
        return self.trained_pipe.predict([value])[0]


class Corpus(models.Model):
    category = models.CharField(max_length=100)
    text = models.TextField()
    classifier = models.ForeignKey(Classifier)
