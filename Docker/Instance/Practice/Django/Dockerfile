# Use an official Python runtime as a parent image
FROM python:2.7-slim

# Set the working directory to /app
WORKDIR /home/damoncheng/Git/Markdown/Docker/Practice/Django

# Copy the current directory contents into the container at /app
ADD . /home/damoncheng/Git/Markdown/Docker/Practice/Django

# Install any needed packages specified in requirements.txt
RUN pip install --trusted-host pypi.python.org -r requirements.txt

# Make port 80 available to the world outside this container
EXPOSE 80

# Define environment variable
ENV NAME World

# Run app.py when the container launches
CMD ["python", "hello/manage.py", "runserver", "0.0.0.0:8000"]

