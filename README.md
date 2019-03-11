# MongoDB, Express, React, Node (MERN) Stack Quickstart

[Alan L. Wong](https://captainalan.github.io)  
Last updated: March 2019  
Version 0.0.4  

One of the hardest parts about getting started with web development is to figure out which technologies to learn. In this tutorial, we will use the **MERN** stack (**MongoDB** **Express** **React** **Node**) to build a web app. Each of these technologies will be discussed further below. This tutorial is not an in depth dive into any one of these technologies. Rather, it is a relatively high-level overview of how each of these components fit together to make a more complete picture.

The particulars of how things are set up may change as software is updated, new tools are added, and so on. This document will therefore focus on *what* is being done (conceptually) and *why* that particular approach is being taken rather than the detailed ins and outs of each operation, which are best left to the official documentations of those specific technologies.

![Screenshot](https://github.com/captainalan/MERN-quickstart/blob/master/client-screenshot.PNG)

The code in this tutorial borrows heavily from ["Let's build a full stack of MongoDB, React, Node, and Express (MERN) app"](https://medium.com/javascript-in-plain-english/full-stack-mongodb-react-node-js-express-js-in-one-simple-app-6cc8ed6de274) by [jelo rivera](https://medium.com/@jelorivera08). My contribution is to add more explanations for a less experienced web developer (that is, insights I've come across through building this repo 🙃).

## Prerequisites

Basic working knowledge of HTML, CSS, and vanilla JavaScript is assumed. Also, you should have **MongoDB**, **Node**, and **`create-react-app`** installed. We'll also install some other things via `npm` along the way. Some basic knowledge of React will help with the front end stuff. As this is not mainly a React tutorial, I won't go into those things in great detail.

Finally, I will assume familiarity with common actions like navigating directories, creating new files, etc. This tutorial was made on Windows (10), but the approach here should work on Linux, MacOS, or wherever else Node can be found.

## 1. First Steps

Node allows us to run JavaScript outside the browser so that we can use the same programming language on both the *client* and *server* sides of things.

Make a new directory for your project. From the command line within that directory, initialize a Node repository.

```cmd
> npm init
```

Follow the instructions that come up as Node instructs you to.

Let's install one tool to help us in the development process. `nodemon` automatically monitors files for change and refreshes your development server so you can see changes as you edit your files.

```bash
npm install nodemon --save-dev
```

In the command above, notice the flag `--save-dev`. We are installinga nd using `nodemon` for the *development* process, but in *production* (when we publish/use our app) it is no longer necessary. On the other hand, some other things we will be installing (e.g. Express) we will need both in development and production.

Next, create a file called `server.js` in the root directory. (DESCRIBE THE PURPOSE OF THIS FILE).

Now we will write a (very short) script to make development easier. Open `package.json` and add the line that begins with "dev" under "scripts"

    ...
    "scripts": {
      "dev": "nodemon server.js",
    ...

After you type some code into `server.js` you can run a developer server via `npm run dev`. Note that `package.json` is just an ordinary `json` file and that our script ammounts to typing a string that you would type into a terminal. Not even that bad!

Okay, let's go update `server.js` now.

## 2. Routing With Express

(Introduce [HTTP Requests](https://www.google.com/search?q=http+requests&rlz=1C1CHBF_enUS818US818&oq=http+requests&aqs=chrome..69i57j0l5.8664j0j7&sourceid=chrome&ie=UTF-8); high level introduction of what we are doing with Express)

Express describes itself as a "web application framework for Node.js". What does that mean? In short, Express makes doing many tasks that can be done with plain Node.js code easier. You can do more with fewer lines of code using Express.

In the file `server.js`, we will write some code to handle some HTTP requests.

```javascript
// Code for adding express things here
```

(Some remarks on callback functions, "javascriptisms")

### More Middlewares

(Introduce the concept of "Middleware" in Express)

Just as we were able to install Express using one `require` statement, other tools are easily installed as well.

Other things we'll install with `npm`

- body-parser
- morgan (logging)
- cors (temporary fix for cross origin req blocking)

- mongodb

## 3. MongoDB

(Introduce databases)

So far, we've been doing everything with just one server. One might say we did a bit of "server side programming". Now, we are going to add another server to the mix. This time, it is a database. Rather than use an already online database, we'll go through the steps for making a local database in which we can store persistent data.

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

We'll make a *client* using React. This means the stuff a user sees and clicks on in order to interact with our Node/Express server and MongoDB database.

Here's where HTML/CSS knowledge come in too.

We'll add React by using `create-react-app` (links to how to install that and stuff).

```cmd
create-react-app client && cd client
```

## 5. Putting everything together

Altogether, you will need three servers running.

1. MongoDB (`mongod`)
2. Express Server (`node server.js` from the root directory)
3. Client (run `npm start` from the `/client` subdirectory)

Interacting with the React SPA, you should be able to do basic CRUD operations, which will be saved in whatever MongoDB you are connected to.

## References

- [Creating a Simple CRUD Application with Express and MongoDB](https://zellwk.com/blog/crud-express-mongodb/) (Zell 2016)
- [Let's build a full stack MongoDB, React, Node and Express (MERN) app](https://medium.com/javascript-in-plain-english/full-stack-mongodb-react-node-js-express-js-in-one-simple-app-6cc8ed6de274) (jelo rivera 2018)

Additionally, I made use of the official docs for all of the technologies used in this tutorial (Node, Express, React, MongoDB, etc.).
