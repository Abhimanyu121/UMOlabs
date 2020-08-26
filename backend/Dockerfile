FROM python:3
ENV PYTHONUNBUFFERED 1

RUN mkdir /backend
COPY backend/service_be /backend

WORKDIR /backend/
RUN pip install -r requirements.txt