# Notes

command to generate csv file of collection from terminal

```BASH
 mongoexport --db=shriproperty --collection=users --type=csv --fields=\_id,name,email,phone,password --out=user.csv
```
