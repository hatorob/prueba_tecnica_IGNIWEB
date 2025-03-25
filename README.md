# Correr proyecto
php artisan serve

## XAMP
Se uso xamp para la creación de la BD crypto_test, por favor crear la BD
```
CREATE DATABASE crypto_investment CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
```
Se crearon las siguientes tablas por el momento
```
CREATE TABLE crypto_coins (
	id INT AUTO_INCREMENT PRIMARY KEY,
    symbol VARCHAR(10) NOT NULL UNIQUE,
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
Por el momento sin cambios
```
Configuracion .env para BD
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=crypto_test
DB_USERNAME=root
DB_PASSWORD=
```

## Para que tome los cambios de BD
ejecutar los siguientes comandos
```
php artisan config:clear
php artisan config:cache
```

obtener cypto
https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest
