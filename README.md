# bSports
## CS 35L Project

### Description
bSports is a client-server web application built on a MERN stack where
users can create an account in order to post pick-up games at UCLA and
view listings of other pick-up games, as well as RSVP to them.

## IMPORTANT NOTE BEFORE BUILDING APPLICATION:
Running the bSports application requires access to a MongoDB database.
To link an already-existing MongoDB database to the application, one
should create a config.js stored in the backend folder, which contains
the following:
```
const config = {
    "url": "insert unique MongoDB URL here"
}
  
module.exports = config;
```


### Build Instructions
1. Install `npm` on your local machine.
2. Install Node via `npm`.
3. Use `git clone https://github.com/maxdalton01/bSports.git` to clone 
   the repository.
4. Inside of the frontend folder, run `npm install`.
5. Inside of the backend folder, run `npm install`.
6. Run `npm start` from the backend directory.
7. In a separate shell, run `npm start` from the frontend directory.
8. This should automatically open your browser to the homepage, but if
   not, you should be able to manually open your browser and go to
   `http://localhost:3000/`.

