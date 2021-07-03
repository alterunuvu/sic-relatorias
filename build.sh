#/bin/sh
echo "........................................"
echo "::: Copiando Archivo del contenedor  :::"
echo "........................................"

git reset --hard
git pull
REPO_NAME=reactbuild
docker build . -t reactbuild
#docker run --rm -it ${REPO_NAME}
id=$(docker create ${REPO_NAME})
mkdir -p artifacts
rm -rf artifacts/*
docker cp ${id}:/usr/src/app/build.zip - > artifacts/build.zip
docker rm -v ${id}
docker rmi ${REPO_NAME}
rm -rf artifacts/build
mkdir -p artifacts/build
unzip artifacts/build.zip -d artifacts/build
aws s3 cp --recursive artifacts  s3://sic-test-relatorias/

