import sys
import time
import pika

"""
topic exchange : messages sent to a topic exchange can't have an arbitrary routing_key
it must be a list of words, delimied by dots. 

	A few valid routing key examples: "stock.usd.nyse", "nyse.vmw", "quick.orange.rabbit". 

There can be as many words in the routing key as you like, up to the limit of 255 bytes.


The binding key must also be in the same form. 
The logic behind the topic exchange is similar to a direct one 

	- a message sent with a particular routing key will be delivered to all the queues that are bound with a matching binding key. 

However there are two important special cases for binding keys:

	*(star) can substitute for exactly one word.
	#(hash) can substitute for zero or more words.

example : "<celerity>.<colour>.<species>".

	The first word in the routing key will describe a celerity
	Second a colour and third a species

Tips :

	Topic exchange is powerful and can behave like other exchanges

	When a queue is bound with "#"(hash) binding key - it will receive all the messages,
	regardless of the routing key - like in fanout exchange

	When special characters "*"(star) and "#"(hash) aren't used in bindings, the topic exchange will
	behave just like a direct one.

"""

connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
channel = connection.channel()

channel.exchange_declare(exchange='topic_logs',
                         exchange_type='topic')

result = channel.queue_declare(exclusive=True)
queue_name = result.method.queue

binding_keys = sys.argv[1:]
if not binding_keys:
    sys.stderr.write("Usage: %s [binding_keys] ...\n" % sys.argv[0])
    sys.exit(1)


for binding_key in binding_keys:
    channel.queue_bind(exchange="topic_logs", 
                       queue=queue_name,
                       routing_key=binding_key)

print(' [*] Waiting for logs. To exit press CTRL+C')

def callback(ch, method, properties, body):
    print(" [x] %r:%r" % (method.routing_key, body))

channel.basic_consume(callback,
                      queue=queue_name,
                      no_ack=True)

channel.start_consuming()
