# Notes

## Add new field in property

1.  -   [ ] Add field in property schema - [property.model.js](./models/property.model.js)
1.  -   [ ] Add field in listing schema - [listing.model.js](./models/listing.model.js)
1.  -   [ ] Implement logic for that field in property controller - [property.controller.js](./controllers/property.controller.js)
1.  -   [ ] Implement logic for that field in listing controller - [listing.controller.js](./controllers/listing.controller.js)
1.  -   [ ] Add new text/dropdown field or update existing one in Admin Add property form - [Form.jsx](./client/src/components/pages/admin/property/form/Form.jsx)
1.  -   [ ] Add new text/dropdown field or update existing one in Admin Update property form - [Update.jsx](./client/src/components/pages/admin/property/update/Update.jsx)
1.  -   [ ] Add new text/dropdown field or update existing one in User Listing Page - [Listing.jsx](./client/src/components/pages/listing/Listing.jsx)
1.  -   [ ] Add new text/dropdown field or update existing one in Admin Listing Page - [Listing.jsx](./client/src/components/pages/admin/listing/Listing.jsx)
1.  -   [ ] Add new text/dropdown field or update existing one in User Update Listing Page - [UpdatePendingListing.jsx](./client/src/components/pages/updatePendingListings/UpdatePendingListing.jsx)
1.  -   [ ] Add new text/dropdown field or update existing one in User Update Property Page - [UpdateProperty.jsx](./client/src/components/pages/updateProperty/UpdateProperty.jsx)

---

## deploy to ec2

```bash
pm2 stop Server
cd shriproperty/
git pull
cd client/
yarn build
pm2 start Server
```

## command to generate csv file of collection from terminal

```bash
 mongoexport --db=shriproperty --collection=users --type=csv --fields=\_id,name,email,phone,password --out=user.csv
```

## command to upload data to collection with csv file

```bash
mongoimport --type csv -d database -c collection --headerline --drop index2020.csv
```

## ngnix website config path

```bash
sudo nano /etc/nginx/sites-available/default
```

## ngnix config file

```bash
sudo nano /etc/nginx/nginx.conf
```

## ngnix error log file

```bash
sudo cat /var/log/nginx/error.log
```

## start nginx

```bash
sudo systemctl start nginx
```

## stop nginx

```bash
sudo systemctl stop nginx
```

## restart nginx

```bash
sudo systemctl restart nginx
```

## start mongodb

```bash
sudo systemctl start mongod
```

## stop mongodb

```bash
sudo systemctl stop mongod
```

## restart mongodb

```bash
sudo systemctl restart mongod
```

## check status of mongod

```bash
sudo systemctl status mongod
```

## PM2 Start for first time

```bash
pm2 start "yarn start" --name Server
```

## PM2 Start

```bash
pm2 start Server
```

## PM2 Stop

```bash
pm2 stop Server
```

## PM2 Restart

```bash
pm2 restart Server
```

## PM2 Logs

```bash
pm2 logs
```
