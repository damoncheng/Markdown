### uwsgi特性 ###

- The core :  impletement configuration, process management, sockets creation, monitoring, logging, shared memory area, ipc, cluster membership, uwsgi subscription server. 

- Request Plugins :implement applicaton server interface for various languages and platforms : WSGI, PSGI, Rack, Lua WSAPI, CGI, PHP, Go.

- Gateways :implementation load balance, and routers.

- Emporer : implements massive instance management and monitoring.

- Loop engines : implements events and concurrency, component can be run in preforked, threaded. asynchoronous/evented and green thead/coroutine modes. 
Various technologeies are supported. including uGreen, Greelet, Stackless, Gevent, Coro::AnyEvent, Tornado, Goroutines and Fibers.

