### exchange ###

the producer can only send messages to an exchange. An exchange is a very simple thing. On one side it recieves messages from producers and the other side it pushes them to queues.

- exchange types : `direct`(default when exchange=""), `topic`, `headers`, `fanout`

- declare an exchange

        channel.exchange_declare(exchange='logs',
                         exchange_type='fanout')


       #list exchnage : sudo rabbitmqctl list_exchanges

- Temporary queues : random named and deleted when consumer connections is closed

        #create a random named queue
        result = channel.queue_declare()
        
        #create a random named queue and delete it when consumer connection is closed
        result = channel.queue_declare(exclusive=True)
        

- Bind exchange and queue

        channel.queue_bind(exchange='logs',
                   queue=result.method.queue)
                   

        #list binding : rabbitmqctl list_bindings

