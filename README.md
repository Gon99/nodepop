#Nodepop

Nodepop is a web server application that allows the user to create, edit, remove and get all the advertisements that are created.

##Installation

Use the package manager npm to run this application

```
npm start
```
Basic way to run the project

```
npm run dev
```
Run the project with nodemon as a development environment

```
npm run install-db
```
Create a connection with mongo, using the ORM mongoose also initialize the database with some products loaded from ./advertisements/advertisements.json file.

##API
http:localhost:3000/api/advertisements
Path: ./routes/api/advertisements
This api basically contains a CRUD, allows the user to create, read, update and delete advertisements in the application.
Query example (PUT, DELETE action):
```
http:localhost:3000/api/advertisements/productID
```
###API TAGS
http:localhost:3000/api/tags
Path: ./routes/api/tags
Display all the differents tags that the advertisements have.

##INDEX
Path: ./routes/index.js
This is the main page of the application.
Loads all the advertisements from mongo to the browser and display them customized, you can add query string in the URL to filter them.
Example:
```
http:localhost:3000/?precio=-50&venta=true&name=i&limit=5
```
