from django.urls import path
from . import views as v
urlpatterns= [
    path ('',v.home,name="home"),
    path ('about/',v.about,name="about"),
    path ('services/',v.services,name="services"),
    path('contact/', v.contact, name='contact'),
    path('privacy-policy/', v.privacy, name='privacy_policy'),
    path('terms-and-conditions/', v.terms, name='terms_and_conditions'),
    path('api/contact/', v.contact_submit, name='contact_submit'),
]
