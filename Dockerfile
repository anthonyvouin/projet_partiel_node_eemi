FROM ubuntu:22.04

ENV DEBIAN_FRONTEND=noninteractive

# Installation des dépendances nécessaires
RUN apt-get update && apt-get install -y \
    openssh-server \
    python3 \
    curl \
    git \
    nginx \
    gnupg \
    && rm -rf /var/lib/apt/lists/*

# Configuration de Node.js 18.x pour correspondre à Ansible
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs

# Installation de MongoDB 6.0
RUN curl -fsSL https://pgp.mongodb.com/server-6.0.asc | gpg -o /usr/share/keyrings/mongodb-server-6.0.gpg --dearmor \
    && echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-6.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/6.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-6.0.list \
    && apt-get update \
    && apt-get install -y mongodb-org

# Configuration SSH
RUN mkdir /var/run/sshd
RUN echo 'root:password' | chpasswd
RUN sed -i 's/#PermitRootLogin prohibit-password/PermitRootLogin yes/' /etc/ssh/sshd_config

# Création des répertoires nécessaires
RUN mkdir -p /data/db /var/www/node-app /var/www/vue-app

EXPOSE 22 80 3000 27017

COPY start.sh /start.sh
RUN chmod +x /start.sh

CMD ["/start.sh"] 