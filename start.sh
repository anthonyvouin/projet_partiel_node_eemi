#!/bin/bash

# Démarrage des services
service ssh start
service nginx start
service mongod start

# Vérification que MongoDB est bien démarré
until mongo --eval "print(\"waited for connection\")"
do
    sleep 1
done

# Garder le conteneur en vie
tail -f /dev/null 