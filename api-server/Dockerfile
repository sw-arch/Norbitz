FROM python:3
LABEL maintainer = "JacobAMason <jacob@jacobmason.net>"

WORKDIR /app
COPY requirements.txt /app
RUN pip install -r requirements.txt
COPY app /app
EXPOSE 80
ENTRYPOINT ["python", "server.py"]
