# MERN Quickstart

One of the hardest parts about getting started with web development is to figure out which technologies to learn.

In this tutorial, we will use the MERN stack (**MongoDB** **Express** **React** **Node**) to build a web app.

(Note on what a "technology stack" is)

## Prerequisites

### HTML & CSS

HTML tells the browser *what* content to display. CSS tells the browser *how* to display that content.

### Things to have installed

- Node

### JavaScript

On the client side, JavaScript adds interactivity.

## First Steps with `npm`

Make a new directory for your project.

(Folder hierarchy here)

```bash
npm install nodemon --save-dev
```

## Routing With Express

Other things we'll install with `npm`

- express
- body-parser
- mongodb

## MongoDB

We'll make a local database.

Set up MongoDB according to the official instructions (I'll be doing this on [Windows](https://docs.mongodb.com/v3.2/tutorial/install-mongodb-on-windows/)).

```cmd
md \data\db
```

Start MongoDB (check where MongoDB is installed on your computer; also you might have a different version than I do installed).

```cmd
"C:\Program Files\MongoDB\Server\4.0\bin\mongod.exe"
```

When I did this, MongoDB gave me this message

```mongo
2019-02-22T22:08:15.655-0800 I CONTROL  [initandlisten] MongoDB starting : pid=26908 port=27017 dbpath=C:\data\db\ 64-bit host=FOOBARBAZ
```

Here, take note of `port=27017` (this may be different on your machine). We'll need this to connect to our (local) MongoDB server later. Try opening a browser and navigating to [http://localhost:27017/](http://localhost:27017/). You should see this message

> It looks like you are trying to access MongoDB over HTTP on the native driver port.

Great! MongoDB *senpai* noticed us!

Now with MongoDB started, we can connect to it. In another **Command Prompt**, do

```cmd
"C:\Program Files\MongoDB\Server\4.0\bin\mongo.exe"
```

Let's make a database called "quibbles".

```cmd
> use quibbles
```

Return to `server.js` and add this right after all of your `require` statments. 

```javascript
/*...other require()s*/
const MongoClient = require('mongodb').MongoClient
const app = express();

// set up MongoDB
let db;

MongoClient.connect('mongodb://localhost:27017/quibbles', (err, client) => {
    if (err) return console.log(err);
    db = client.db('quibbles') // Our DB name
})
```

(Note on moving `app.listen` statement to MongoClient connect callback)

On the `test.html` form, I entered "foo" for the *name* field and "bar" for the *quibble* field. "saved to database" was logged to the terminal running `node`.

From the mongo shell (`mongo.exe`, *not* `mongod.exe` on Windows), I can verify the entry I just made.

```mongo
> db["quibbles"].find()
```

Making this query returns an object with the values we submitted through the form.


## References

- [Creating a Simple CRUD Application with Express and MongoDB](https://zellwk.com/blog/crud-express-mongodb/) (Zell 2016)