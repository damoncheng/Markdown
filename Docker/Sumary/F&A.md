### docker证书环境搭建 ###

- openssl 创建证书
  
  openssl req \
  -newkey rsa:4096 -nodes -sha256 -keyout certs/domain.key \
  -x509 -days 365 -out certs/domain.crt
  
- 复制证书到docker环境

  - Linux : 
  
      Copy the domain.crt file to /etc/docker/certs.d/myregistrydomain.com:5000/ca.crt on every Docker host. You do not need to restart Docker.
  
  - Windows : 
  
    - Open Windows Explorer, right-click the domain.crt file, and choose Install certificate. When prompted, select the following options:
    
    - Click Browser and select Trusted Root Certificate Authorities.
    
    - Click Finish. Restart Docker.
    
  - Docker for Mac :
  
    Follow the instructions on Adding custom CA certificates. Restart Docker.
  
  - Docker for Windows:
  
    Follow the instructions on Adding custom CA certificates. Restart Docker.
    
### 清空默认iptables规则 ###

  /etc/sysconfig/iptables

