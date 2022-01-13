FROM tomcat:8.0-jre8

LABEL maintainer="Kyle Crowley"

ADD target/GlobeRushed.war /usr/local/tomcat/webapps/

EXPOSE 8080

CMD ["catalina.sh", "run"]
