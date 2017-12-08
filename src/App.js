import React, { Component } from "react";
import { Route } from "react-router-dom";
import ListContacts from "./components/ListContacts";
import CreateContact from "./components/CreateContact";
import * as ContactsAPI from "./utils/ContactsAPI";

class App extends Component {
  state = {
    contacts: []
  };

  removeContact = contact => {
    ContactsAPI.remove(contact).then(contact => {
      this.setState({
        contacts: this.state.contacts.filter(c => c.id !== contact.id)
      });
    });
  };

  createContact = contact => {
    ContactsAPI.create(contact).then(contact => {
      this.setState(state => ({
        contacts: state.contacts.concat([ contact ])
      }))
    })
  }

  componentDidMount() {
    ContactsAPI.getAll()
      .then(contacts => {
        this.setState({ contacts });
      })
  }

  render() {
    let { contacts } = this.state;

    return (
      <div className="App">
        <Route
          exact path="/"
          render={() => (
            <ListContacts
              contacts={contacts}
              onDeleteContact={this.removeContact} 
              />
          )}
        />
        <Route path="/create" render={({ history }) => (
          <CreateContact 
            onCreateContact={(contact) => {
              this.createContact(contact)
              history.push('/')
            }}
          />
        )} />
      </div>
    );
  }
}

export default App;
