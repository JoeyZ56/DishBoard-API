### Structure

The API is structured in MVC framework separating the Models, Controllers, and Routes. Desired outcome is to to have a functioning backend that focuses on C.R.U.D. logic for users and recipes. Along with Firebase authentication with "email/password sign up/login and google sign in feature.

### Setup Instructions:

1.  Fork Repository into your own Github

2.  Copy SSH clone Key and git clone into desired directory in the terminal:

        git clone git@github.com:JoeyZ56/DishBoard-API.git

3.  Install dependencies

        npm i all

### Environment

MONGODB_URI="YOUR_MONGO_URI"
PORT=5003
CLIENT_URL=http://localhost:5002

### Database

MongoDB:
https://www.mongodb.com/docs/

### Middleware

Multer:
A framework using multi-party to upload images
https://www.npmjs.com/package/multer?activeTab=readme

Firebase:
A framework solely used as the authentication of the application
https://firebase.google.com/docs/auth/

### Future Development

1. Backend logic for profiles for users to personalize their own page.
2. Backend logic for Search by key-terms for recipes
3. Backend logic for commenting/liking recipes
