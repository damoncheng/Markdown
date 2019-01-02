import sys
import time
import pika

"""
direct exchange : the routing algorithm behind a direct exchange is simple

- a message goes to the queues whose `binding key` exactly matches the `routing key` of the message.

direct exchange + binding key filter message to queue

channel.queue_bind(exchange=exchange_name,
                   queue=queue_name)


channel.queue_bind(exchange=exchange_name,
                   queue=queue_name,
                   routing_key='black')
"""

connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
channel = connection.channel()

channel.exchange_declare(exchange='direct_logs',
                         exchange_type='direct')

result = channel.queue_declare(exclusive=True)
queue_name = result.method.queue

severities = sys.argv[1:]
if not severities:
    sys.stderr.write("Usage: %s [info] [warning] [error]\n" % sys.argv[0])
    sys.exit(1)

for severity in severities:
    channel.queue_bind(exchange='direct_logs',
                       queue=queue_name,
                       routing_key=severity)

print(' [*] Waiting for logs. To exit press CTRL+C')

def callback(ch, method, properties, body):
    print(" [x] %r:%r" % (method.routing_key, body))

channel.basic_consume(callback,
                      queue=queue_name,
                      no_ack=True)

channel.start_consuming()
