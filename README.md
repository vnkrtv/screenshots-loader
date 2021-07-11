# screenshots-loader

## Description

Comming soon

## Deployment
Download Python 3.x and add it to PATH.

Install:
```bash
git clone git@gitlab.com:vnkrtv/screenshots-loader.git
cd screenshots-loader
python -m venv venv
. venv/bin/activate # for Windows - .\venv\Scripts\activate
python -m pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
```
Run:
```bash
python app/manage.py runserver 0.0.0.0:8000
```