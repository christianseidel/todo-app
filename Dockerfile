FROM openjdk:17-jdk-alpine
MAINTAINER  Christian Seidel <christian@parameter5.de>

ADD backend/target/todo-app-backend-0.0.1-SNAPSHOT.jar app.jar

CMD [ "sh", "-c", "java -jar /app.jar" ]