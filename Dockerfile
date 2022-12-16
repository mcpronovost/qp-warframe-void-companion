FROM python:3.11-alpine
ENV PYTHONDONTWRITEBYTECODE=1
RUN apk add --update gettext
RUN mkdir /code
WORKDIR /code
ADD requirements.txt /code/
RUN pip install --upgrade pip \
    pip install -r requirements.txt
ADD . /code/
RUN python manage.py makemigrations
# RUN python manage.py migrate
RUN python manage.py collectstatic --clear --noinput
EXPOSE 8000/tcp
CMD ["daphne", "-b", "0.0.0.0", "-p", "8000", "qp.asgi:application"]
# CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
