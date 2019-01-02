# Use an official Python runtime as a parent image
FROM debian:jessie

# Set the working directory to /app
WORKDIR /build

# Copy the current directory contents into the container at /app
#ADD . /build

# Install any needed packages specified in requirements.txt
# RUN pip install --trusted-host pypi.python.org -r requirements.txt
RUN apt-get update
RUN apt-get install -y build-essential
RUN apt-get install -y libc6-dev
RUN apt-get install -y wget
RUN apt-get clean

# Make port 80 available to the world outside this container
# EXPOSE 36093 50000

# Define environment variable
# ENV JENKINS_OPTS --httpPort=8080
# ENV JENKINS_SLAVE_AGENT_PORT 36093

# Run app.py when the container launches
CMD ["make", "clean"]
CMD ["make"]

