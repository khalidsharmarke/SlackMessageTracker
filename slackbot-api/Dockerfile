FROM python
WORKDIR /usr/src/app
COPY ".env" .
COPY . .
RUN pip install -r requirements.txt &&\
    python manage.py migrate
CMD ["python", "manage.py runserver"]

