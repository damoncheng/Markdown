import urllib

proxies = {'http': 'http://xxxxx'}
fd = urllib.urlopen("http://xxxxx/release/cgi-bin/test/hello.py", proxies=proxies)
# Don't use any proxies
#fd = urllib.urlopen("http://xxxxx/cgi-bin/hello.py", proxies={})

print fd.read()
