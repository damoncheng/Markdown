# Use an official Python runtime as a parent image
FROM jenkins/jenkins:lts

# Set the working directory to /app
WORKDIR /home/damoncheng/Git/Markdown/Docker/Jenkins

# Copy the current directory contents into the container at /app
ADD . /home/damoncheng/Git/Markdown/Docker/Jenkins

# Install any needed packages specified in requirements.txt
# RUN pip install --trusted-host pypi.python.org -r requirements.txt

# Make port 80 available to the world outside this container
EXPOSE 36093 50000

# Define environment variable
ENV JENKINS_OPTS --httpPort=8080
ENV JENKINS_SLAVE_AGENT_PORT 36093

# Run app.py when the container launches
# CMD ["python", "app.py"]

