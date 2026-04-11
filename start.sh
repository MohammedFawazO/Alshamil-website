#!/usr/bin/env bash

python manage.py migrate
gunicorn alshamil.wsgi:application