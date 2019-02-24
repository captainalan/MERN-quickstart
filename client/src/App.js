import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {

  // initialize our state
  state = {
    data: [],
    id: 0,
    name: null,
    title: null,
    quibble: null,
    intervalIsSet: false,
    idToDelete: null,
    idToUpdate: null,
  };

  // when component mounts, first fetch all existing data in our db
  // then use polling to see if our db has changed and then refresh our UI
  // if appropriate
  componentDidMount() {
    this.getDataFromDb();
    if (!this.state.intervalIsSet) {
      let interval = setInterval(this.getDataFromDb, 1000);
      this.setState({ intervalIsSet: interval });
    }
  }

  // never let a process live forever
  // always kill a process everytime we are done using it
  componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.IntervalIsSet);
      this.setState({ intervalIsSet: null });
    }
  }

  // Note: in the front end, we use the id key of our data object in order to
  // identify which we want to update or delete.
  // For our back end, we use the object id assigned by MongoDB to modify
  // database entries.

  // our first get method that uses our backend api to
  // fetch data from our database
  getDataFromDb = () => {
    fetch("http://localhost:2999/api/getData")
      .then(data => data.json())
      .then(res => this.setState({ data: res.data }));
  };

  // our put method that uses our backend api
  // to create new query into our database
  postDataToDB = newItem => {
    let currentIds = this.state.data.map(data => data.id);
    let idToBeAdded = 0;
    while (currentIds.includes(idToBeAdded)) {
      ++idToBeAdded;
    }

    axios.post("http://localhost:2999/api/postData", {
      id: idToBeAdded,
      name: newItem.name,
      title: newItem.title,
      quibble: newItem.quibble
    });
  };

  // our delete method that uses our backend api
  // to remove existing database information
  deleteFromDB = idToDelete => {
    let objIdToDelete = null;
    this.state.data.forEach(dat => {
      if (String(dat.id) === idToDelete) {
        objIdToDelete = dat.__dirname;
      }
    });

    axios.delete("http://localhost:2999/api/deleteData", {
      data: {
        id: objIdToDelete
      }
    });
  };

  // our update method that uses our backend api
  // to overwrite existing database information
  updateDB = (idToUpdate, updateToApply) => {
    let objIdToUpdate = null;
    this.state.data.forEach(dat => {
      if (String(dat.id) === idToUpdate) {
        objIdToUpdate = dat._id;
      }
    });

    axios.put("http://localhost:2999/api/updateData", {
      id: objIdToUpdate,
      update: updateToApply
    });
  };

  render() {
    // const { data } = this.state;
    return (
      <div className="App container-fluid">
        {/* Display the stuff in our MongoDB */}

        <div className="row">
          <div className="col-12">
            <MyHeader />
          </div>
        </div>
        <div className="row">
          <div className="EditControlBox col-5">
            <h2>Edit stuff</h2>
            <p>Here you can add/delete/update things.</p>

            <h3>Add a Quibble</h3>
            <input
              type="text"
              onChange={e => this.setState({ title: e.target.value })}
              placeholder="Title"
            /> <br />
            <input
              type="text"
              onChange={e => this.setState({ name: e.target.value })}
              placeholder="Name"
            /> <br />
            <input
              type="text"
              onChange={e => this.setState({ quibble: e.target.value })}
              placeholder="What do you have to complain about?"
            /> <br />
            <button onClick={() => this.postDataToDB(
              {
                title: this.state.title,
                name: this.state.name,
                quibble: this.state.quibble
              }
            )}>
              Submit
            </button>

            <h3>Update a Quibble (by ID)</h3>
            <input
              type="text"
              onChange={e => this.setState({ idToUpdate: e.target.value})}
              placeholder="ID of item to update here"
            /> <br />
            <input
              type="text"
              onChange={e => this.setState({ quibble: e.target.value })}
              placeholder="What do you have to complain about?"
            /> <br />
            <button onClick={() =>
                this.updateDB(this.state.idToUpdate, 
                  { quibble: this.state.quibble })}>
              Update
            </button>

            <h3>Delete Quibble by ID</h3>
            <input
              type="text"
              onChange={e => this.setState({ idToDelete: e.target.value })}
              placeholder="Enter id of item to delete here"
            /> <br />
            <button onClick={() => this.deleteFromDB(this.state.idToDelete)}>
              Delete
            </button>
          </div>
          <div className="col-7">
            <Quibbles data={this.state.data}/>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
          <hr />
            <p>February 2019</p>
          </div>
        </div>
      </div>
    );
  }
}

const Quibbles = props =>
  <div className="Quibbles">
    <h2>Quibbles</h2>
    <p>What are people quibbling about these days?</p>
    {props.data.length <= 0
    ? "No DB entries yet!"
    : props.data.map(dat => (
      <Quibble 
        id={dat.id}
        title={dat.title} 
        name={dat.name} 
        quibble={dat.quibble} 
        key={dat.title}
      />
    ))
    }
  </div>

const Quibble = props =>
  <div className="Quibble">
    <h3>{props.title}</h3>
    {props.name} says:
    <p>{props.quibble}</p>
    <hr />
    (id: {props.id})
  </div>

const MyHeader = props =>
  <div className="MyHeader">
    <h1>MERN Stack Test</h1>

    <p>
      By default, the back end is running on port 2999, this front end is running on port 3000.
    </p>

  </div>

export default App;
