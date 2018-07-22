### To Run Application

### Install Software

* Latest Node JS : from https://nodejs.org/en/
* Git Client : https://git-scm.com/downloads
* Postgres : https://www.postgresql.org/download/

* open the command line

### Clone the Application

* git clone https://github.com/sumitkumar2019/stockexchange.git
* go to the directory stockexchange: add command to the command line : CD stockexchange


### Install Dependencies

```
npm install
```

### Install DB

* Run below command to create tables
 knex --knexfile=./config/dbConfig.js migrate:latest

* Run below command to create rows
 knex --knexfile=./config/dbConfig.js seed:run

### Run the Application

```
npm start
```

Now Run api at [`localhost:3000'].

### Test the Application

```
npm test
```

## Heroku Production Deployment url

https://stockexchanges.herokuapp.com/stocks?country=IN&category=Automobile&baseBid=20

Note: Code is already documented. How-ever End to End Process are documented under doc file:
End-To-End-Process-Stock Exchange.

Thank You