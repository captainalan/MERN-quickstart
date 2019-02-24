# MongoDB, Express, React, Node (MERN) Stack Quickstart

[Alan L. Wong](https://captainalan.github.io)  
Last updated: February 2018  
Version 0.0.2  

One of the hardest parts about getting started with web development is to figure out which technologies to learn. In this tutorial, we will use the MERN stack (**MongoDB** **Express** **React** **Node**) to build a web app. Each of these technologies will be discussed further below.

![Screenshot](client-screenshot.png)

This tutorial borrows heavily from ["Let's build a full stack of MongoDB, React, Node, and Express (MERN) app"](https://medium.com/javascript-in-plain-english/full-stack-mongodb-react-node-js-express-js-in-one-simple-app-6cc8ed6de274) by [jelo rivera](https://medium.com/@jelorivera08). Here, I add more explanations than that tutorial provides for a less experienced web developer (that is, what I've learned working through bugs 🙃).

## Prerequisites

Basic working knowledge of HTML, CSS, and vanilla JavaScript is presumed. Also, you should have **MongoDB**, **Node**, and **`create-react-app`** installed. (Other things can be installed via `npm`). Some basic knowledge of React will help with the front end stuff, which I won't explain in great detail.

Finally, I will assume familiarity with common actions like navigating directories, creating new files, etc. This tutorial was made on Windows (10), but the approach here should work on Linux, MacOS, or wherever else Node can be found.

## 1. First Steps

Make a new directory for your project. From the command line within that directory, initialize a Node repository.

```cmd
> npm init
```

Follow the instructions that come up as Node instructs you to.

Let's install one tool to help us in the development process. `nodemon` automatically monitors files for change and refreshes your development server so you can see changes as you edit your files.

```bash
npm install nodemon --save-dev
```
Create a file called `server.js` in the root directory.

Open `package.json` and add the line that begins with "dev" under "scripts"

    ...
    "scripts": {
      "dev": "nodemon server.js",
    ...

## 2. Routing With Express

(INCOMPLETE)

Other things we'll install with `npm`

- express
- body-parser
- mongodb
- morgan (logging)
- cors (temporary fix for cross origin req blocking)

## 3. MongoDB

(INCOMPLETE)

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

Data is put into the "datas" collection (by default?).

```mongo
> db["datas"].find()
```

## 4. React

We'll add React by using `create-react-app` (links to how to install that and stuff).

```cmd
create-react-app client && cd client
```

## 5. Putting everything together

You need three servers running.

1. MongoDB (`mongod`)
2. Express Server (`node server.js` from the root directory)
3. Client (run `npm start` from the `/client` subdirectory)

Interacting with the React SPA, you should be able to do basic CRUD operations, which will be saved in whatever MongoDB you are connected to.


## References

- [Creating a Simple CRUD Application with Express and MongoDB](https://zellwk.com/blog/crud-express-mongodb/) (Zell 2016)
- [Let's build a full stack MongoDB, React, Node and Express (MERN) app](https://medium.com/javascript-in-plain-english/full-stack-mongodb-react-node-js-express-js-in-one-simple-app-6cc8ed6de274) (jelo rivera 2018)

Additionally, I made use of the official docs for all of the technologies used in this tutorial (Node, Express, React, MongoDB, etc.).