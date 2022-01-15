# Notes

command to generate csv file of collection from terminal

```bash
 mongoexport --db=shriproperty --collection=users --type=csv --fields=\_id,name,email,phone,password --out=user.csv
```

command to upload data to collection with csv file

```bash
mongoimport --type csv -d database -c collection --headerline --drop index2020.csv
```
