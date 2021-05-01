## Monitorización de la API Rest
Para monitorizar la API Rest desplegada, lo primero que tenemos que hacer es desplegar los contenedores Docker con los servidores Grafana y Prometheus:
```bash
cd restapi/monitoring
docker-compose up --build
```
Una vez hecho esto, podemos acceder a las siguientes URLs:
-   Servidor Prometheus - http://localhost:9090
-   Servidor Grafana - http://localhost:9091

Desde el servidor Prometheus podemos hacer consultas sobre los datos de monitorización desplegados. Desde el servidor Grafana podemos visualizar una Dashboard con los más importantes de monitorización, o crear una personalizada. La Dashboard principal se encuentra en General > Vista general.