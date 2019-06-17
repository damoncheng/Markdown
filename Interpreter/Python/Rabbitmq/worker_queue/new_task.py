import sys
import pika

host = sys.argv[1]
user = sys.argv[2]
password = sys.argv[3]
queue = sys.argv[4]

print("host : ", host)
print("user : ", user)
print("password : ", password)
print("queue : ", queue)

credentials = pika.PlainCredentials(user, password)
connection = pika.BlockingConnection(pika.ConnectionParameters(host, credentials=credentials))
channel = connection.channel()

#no durable
#channel.queue_declare(queue='hello')

"""
message = ' '.join(sys.argv[1:]) or "Hello World!"
channel.basic_publish(exchange='',
                      routing_key='hello',
                      body=message)
"""


#durable
channel.queue_declare(queue=queue, durable=True, arguments={"x-max-priority" : 10})
#channel.queue_declare(queue='task_queue1', passive=True)


message = "Hello World!"
priority = 0

"""
if arg_len == 1:
    message = "Hello World!"
    priority = 0
elif arg_len == 2:
    message = sys.argv[1]
    priority = 0
else:
    message = sys.argv[1]
    priority = int(sys.argv[2])
"""

channel.basic_publish(exchange='',
                      routing_key=queue,
                      body=message, 
		      properties=pika.BasicProperties(
                         delivery_mode=2,
                         expiration="60000",
                         priority=priority,
                      ))


print(" [x] Sent %r" % message)

connection.close()
