# In Progress

# Focus 
1. implement flash message
2. save tags to mongoDB
3. geolocation - move autocomplete() function to a separate file
4. create ejs for /place/:id page
5. Need error handler when retrieving non-existing id from database on both ```/places/:id``` and ```/places/:id/edit``` page
6. Make place card a separate component
7. Add active class when clicking nav tab
8. Delete place

# Screenshots
![Screenshot of create-lake-louise](https://github.com/fei-gao/travel-footprint/blob/master/docs/create-lake-louise.png)
![Screenshot of show-lake-louise](https://github.com/fei-gao/travel-footprint/blob/master/docs/show-lake-louise.png)
![Screenshot of places](https://github.com/fei-gao/travel-footprint/blob/master/docs/places.png)
![Screenshot of natural-tag](https://github.com/fei-gao/travel-footprint/blob/master/docs/natural-tag.png)
![Screenshot of restaurant](https://github.com/fei-gao/travel-footprint/blob/master/docs/restaurant.png)
![Screenshot of log in](https://github.com/fei-gao/travel-footprint/blob/master/docs/log-in.png)

# Setup
- Clone the repo
- Run ```npm install``` to install the dependencies
- Create a ```./variables.env``` file in the root directory, and include the following:
  ```
  DATABASE=mongodb://localhost:27017/travel-footprint
  mapKey=Your Google Map API Key
  ```
- Run ```npm run server``` to start Express Server
- App will then be accessible at localhost:4001

# Dependencies

### 1. User Authentication
- md5
- validator
- mongoose-mongodb-errors
- passport
- passport-local-mongoose
- express-validator
- es6-promisify (downgrade to 5.0.0)

### 2. Flash Message
- connect-flash
- express-session

### 3. Image Upload and Resizing
- multer
- jimp
- uuid

### 4. Express
- body-parser
- dotenv
- ejs
- express

### 5. Sending Emails
- nodemailer
- juice
- html-to-text
- es6-promisify

# Dev Dependency

- nodemon

# References
1. [Learn Node Course](https://learnnode.com/)
2. [Autocomplete address](https://developers.google.com/maps/documentation/javascript/examples/places-autocomplete-addressform)
3. [Autocomplete search-box](https://www.codexworld.com/autocomplete-location-search-box-google-maps-javascript-api-jquery-ui/)
4. [Image uploading with multer](https://www.youtube.com/watch?v=9Qzmri1WaaE)
5. [CSS for cropping image](https://stackoverflow.com/questions/2623603/crop-an-image-instead-of-stretching-it)
6. [MongoDB castError: Cast to ObjectId failed for value at path "_id"](https://stackoverflow.com/questions/14940660/whats-mongoose-error-cast-to-objectid-failed-for-value-xxx-at-path-id)
7. [Secure API key in res.locals.helpers](https://stackoverflow.com/questions/33451053/req-locals-vs-res-locals-vs-res-data-vs-req-data-vs-app-locals-in-express-mi)
8. MongoDB aggregation [https://docs.mongodb.com/manual/aggregation/#aggregation-framework](https://docs.mongodb.com/manual/aggregation/#aggregation-framework)
[https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline/](https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline/)
9. Toggle active class in nav bar in jquery[https://stackoverflow.com/questions/6459581/toggle-active-class-in-nav-bar-with-jquery](https://stackoverflow.com/questions/6459581/toggle-active-class-in-nav-bar-with-jquery)
[https://stackoverflow.com/questions/35539434/active-navbar-item-not-staying-active-after-click]
(https://stackoverflow.com/questions/35539434/active-navbar-item-not-staying-active-after-click)
10. [mongoose-mongodb-errors package](https://www.npmjs.com/package/mongoose-mongodb-errors)
11. [express-validator package](https://express-validator.github.io/docs/sanitization.html)
12. Send html as email content[https://stackoverflow.com/questions/9970053/can-express-with-ejs-render-html-to-a-variable-so-i-can-send-as-e-mail](https://stackoverflow.com/questions/9970053/can-express-with-ejs-render-html-to-a-variable-so-i-can-send-as-e-mail) [https://stackoverflow.com/questions/9732580/has-anyone-gotten-html-emails-working-with-twitter-bootstrap](https://stackoverflow.com/questions/9732580/has-anyone-gotten-html-emails-working-with-twitter-bootstrap)
