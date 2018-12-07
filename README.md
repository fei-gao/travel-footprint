# Focus 
1. implement flash message
2. save tags to mongoDB
3. geolocation - move autocomplete() function to a separate file
4. create ejs for /place/:id page
5. Need error handler when retrieving non-existing id from database on both ```/places/:id``` and ```/places/:id/edit``` page
6. Make place card a separate component
7. Add active class when clicking nav tab

# Dependencies
### User Authentication
- md5
- validator
- mongoose-mongodb-errors
- passport-local-mongoose
- express-validator
- es6-promisify (downgrade to 5.0.0)
- passport

# References
1. Autocomplete address [https://www.youtube.com/watch?v=9Qzmri1WaaE](https://www.youtube.com/watch?v=9Qzmri1WaaE)
2. Autocomplete search-box  [https://www.codexworld.com/autocomplete-location-search-box-google-maps-javascript-api-jquery-ui/]
 (https://www.codexworld.com/autocomplete-location-search-box-google-maps-javascript-api-jquery-ui/)
3. Image uploading with multer [https://www.youtube.com/watch?v=9Qzmri1WaaE](https://www.youtube.com/watch?v=9Qzmri1WaaE)
4. Crop image css [https://stackoverflow.com/questions/2623603/crop-an-image-instead-of-stretching-it]
(https://stackoverflow.com/questions/2623603/crop-an-image-instead-of-stretching-it)
5. MongoDB castError: Cast to ObjectId failed for value at path "_id"      [https://stackoverflow.com/questions/14940660/whats-mongoose-error-cast-to-objectid-failed-for-value-xxx-at-path-id](https://stackoverflow.com/questions/14940660/whats-mongoose-error-cast-to-objectid-failed-for-value-xxx-at-path-id)
6. Secure API key in res.locals.helpers [https://stackoverflow.com/questions/33451053/req-locals-vs-res-locals-vs-res-data-vs-req-data-vs-app-locals-in-express-mi](https://stackoverflow.com/questions/33451053/req-locals-vs-res-locals-vs-res-data-vs-req-data-vs-app-locals-in-express-mi)
7. MongoDB aggregation [https://docs.mongodb.com/manual/aggregation/#aggregation-framework](https://docs.mongodb.com/manual/aggregation/#aggregation-framework)
[https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline/](https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline/)
8. Toggle active class in nav bar in jquery[https://stackoverflow.com/questions/6459581/toggle-active-class-in-nav-bar-with-jquery](https://stackoverflow.com/questions/6459581/toggle-active-class-in-nav-bar-with-jquery)
[https://stackoverflow.com/questions/35539434/active-navbar-item-not-staying-active-after-click]
(https://stackoverflow.com/questions/35539434/active-navbar-item-not-staying-active-after-click)
9. mongoose-mongodb-errors package [https://www.npmjs.com/package/mongoose-mongodb-errors](https://www.npmjs.com/package/mongoose-mongodb-errors)
10. express-validator package [https://express-validator.github.io/docs/sanitization.html](https://express-validator.github.io/docs/sanitization.html)
