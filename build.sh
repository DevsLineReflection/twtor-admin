docker build -t twtor-admin .
docker tag twtor-admin gcr.io/twtor-402210/twtor-admin
docker push gcr.io/twtor-402210/twtor-admin