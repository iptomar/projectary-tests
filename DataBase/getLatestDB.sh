wget "https://raw.githubusercontent.com/iptomar/projectary-bd/master/projectary-bd-dump.sql" -O latestDB.sql
mysql -u $1 -p < latestDB.sql
