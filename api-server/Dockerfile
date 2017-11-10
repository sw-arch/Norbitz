FROM python:3
LABEL maintainer = "JacobAMason <jacob@jacobmason.net>"

COPY app /app
WORKDIR /app
RUN pip install -r requirements.txt
EXPOSE 80
ENTRYPOINT ["python", "server.py"]
