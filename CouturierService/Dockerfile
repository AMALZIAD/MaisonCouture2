ARG MAVEN_VERSION=3.8.7-eclipse-temurin-19

#With multi-stage builds, we use multiple FROM statements in our Dockerfile. 
#Each FROM instruction can use a different base and each of them begins a new stage of the build
#we selectively copy artifacts from one stage to another, leaving behind everything we don’t want in the final image <"openjdk">

#
# Build stage
#

FROM maven:${MAVEN_VERSION} AS build

WORKDIR /app

COPY src /app/src
COPY pom.xml /app

RUN mkdir -p /root/.m2 \
    && mkdir /root/.m2/repository

#COPY settings.xml /root/.m2

RUN mvn clean package

#
# Package stage
#

# FROM openjdk:11-jre-slim
FROM maven:${MAVEN_VERSION} AS prod

COPY --from=build /app/target/CouturierService-*-SNAPSHOT.jar /usr/local/lib/CouturierService.jar
# COPY  src/main/resources/exports  /usr/local/lib/

EXPOSE 8081
ENTRYPOINT ["java","-jar","/usr/local/lib/CouturierService.jar"]