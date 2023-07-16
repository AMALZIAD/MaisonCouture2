FROM maven:3.8.7-eclipse-temurin-19

WORKDIR /app

COPY . /app/

RUN mvn clean install

ENTRYPOINT ["java","-jar","/app/target/DiscoveryService-0.0.1-SNAPSHOT.jar"]
EXPOSE 8761

# FROM eclipse-temurin:11
# RUN mkdir /opt/app
# COPY japp.jar /opt/app
# CMD ["java", "-jar", "/opt/app/japp.jar"]