import base64

client_id = "OSC0M9NUz9ccQbBG5IbJi36gmFPEuHBpJ3WGQpor"
client_secret = "LgOy0EjrasUE1ZnXLV7t6nJvFaboWc9tejNeuykp7iuKjshqFLJPw4hNe49iUpRMlA2c80QD9sy26gUiCIhP1EsZoVQgVFO5MQhRGQ5l1oWYLbTYMh0kVkf5GwDE6Q6l"
client_auth = "%s:%s" % (client_id, client_secret)

result = base64.b64encode(client_auth.encode()).decode()
print(result)
print(base64.b64decode(result.encode()).decode())


