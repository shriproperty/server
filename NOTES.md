# Notes

command to generate csv file of collection from terminal

```bash
 mongoexport --db=shriproperty --collection=users --type=csv --fields=\_id,name,email,phone,password --out=user.csv
```

command to upload data to collection with csv file

```bash
mongoimport --type csv -d database -c collection --headerline --drop index2020.csv
```

ngnix website config path

```bash
sudo nano /etc/nginx/sites-available/default
```

ngnix config file

```bash
sudo nano /etc/nginx/nginx.conf
```

ngnix error log file

```bash
sudo cat /var/log/nginx/error.log
```

start nginx

```bash
sudo systemctl start nginx
```

stop nginx

```bash
sudo systemctl stop nginx
```

restart nginx
```bash
sudo systemctl restart nginx
```

start mongodb

```bash
sudo systemctl start mongod
```

stop mongodb

```bash
sudo systemctl stop mongod
```

restart mongodb

```bash
sudo systemctl restart mongod
```

check status of mongod

```bash
sudo systemctl status mongod
```
