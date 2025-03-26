# Autor **Hector Alejandro Toro Bernal**
**Este desafío me parece interesante ya que nunca he desarrollado usando Laravel, vamos adelante**



# Documentación de como cree el proyecto
* Voy a documentar todo lo posible como desarrolle el proyecto
## Como hacer funcionar el proyecto
1. crear base de datos, las tablas y ejecutar los alter table - estan en el apartado de más abajo
2. hacer instalación de los paquetes
```
npm i
```
3. abrir dos terminales, una para habilitar php artisian y la otra para activar el servidor de vite
```
php artisan serve
npm run dev
```
4. abrir la url dada por php artisan serve
5. Configurar variables de entorno según sus datos - agregar la llave, en el copy .env ya estan estas variables, solo poner la llave correspondiente
```
APP_KEY_COINMARKET=key-api
URL_COINMARKET_DBG=https://sandbox-api.coinmarketcap.com
URL_COINMARKET=https://pro-api.coinmarketcap.com
```

Configuracion .env para BD, en mi caso xamp lo tengo sin clave, si tiene una clave ponerla en el DB_PASSWORD

```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=crypto_test
DB_USERNAME=root
DB_PASSWORD=
```


* Importante crear las tablas y ejecutar los alter table ya que sin esto no se guardará la información de las crypto monedas.

# Correr proyecto
php artisan serve

# Documentacion BACKEND

## XAMP
Se uso xamp para la creación de la BD crypto_test, por favor crear la BD
```
CREATE DATABASE crypto_test CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
```
Se crearon las siguientes tablas por el momento
```
CREATE TABLE crypto_coins (
	id INT AUTO_INCREMENT PRIMARY KEY,
    symbol VARCHAR(60) NOT NULL UNIQUE,
    name VARCHAR(60) NOT NULL UNIQUE,
    create_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE crypto_details (
  id INT AUTO_INCREMENT PRIMARY KEY,
  crypto_id INT NOT NULL,
  price DECIMAL(18,8) NOT NULL,
  percentage_change DECIMAL(10,4) NOT NULL,
  volume VARCHAR(20) NOT NULL,
  create_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (crypto_id) REFERENCES crypto_coins(id) ON DELETE CASCADE
);
```
Puede estar sujeto a cambios. Acá dejaré los ALTER TABLE si es necesario
```
ALTER TABLE crypto_details
ADD COLUMN last_update TIMESTAMP NULL;
```

## Para que tome los cambios de BD
ejecutar los siguientes comandos
```
php artisan config:clear
php artisan config:cache
```
## Como crear modelos
```
php artisan make:model CryptoCoin -m
php artisan make:model CryptoDetail -m
```
## Como crear controladores
```
php artisan make:controller CryptoController
```

# FRONT
instalación libreria chart.js
```
npm install chart.js
```


obtener cypto
https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest
