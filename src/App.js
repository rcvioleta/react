import React, { Component } from 'react';
import './App.css';
import Radium, { StyleRoot } from 'radium';
import Person from './Person/Person';

class App extends Component {
  state = {
    persons: [
      { id: 'adas1', name: 'Norman', age: 24 },
      { id: 'dfga1', name: 'Eunice', age: 24 },
      { id: 'wera1', name: 'Kenneth', age: 25 }
    ],
    showPersons: false
  }

  deletePersonsHandler = (personIndex) => {
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({ persons: persons });
  }

  nameChangeHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    }); 

    const person = {
      ...this.state.persons[personIndex]
    }

    person.name = event.target.value;
    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({ persons: persons });
  }

  togglePersonsHandler = () => {
    const show = this.state.showPersons;
    this.setState({ showPersons: !show });
  } 

  render() {
    const buttonStyles = {
      backgroundColor: 'green',
      color: '#fff',
      border: '1px solid blue',
      padding: '1rem',
      ':hover': {
        backgroundColor: '#0eb70e',
        cursor: 'pointer'
      }
    }

    let persons = null;

    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map(person => {
              return <Person 
                      key={person.id}
                      click={this.deletePersonsHandler.bind(this, person.id)} 
                      name={person.name} 
                      age={person.age}
                      changed={(event) => this.nameChangeHandler(event, person.id)} />
            })}
        </div> 
      );

      buttonStyles.backgroundColor = 'red';
      buttonStyles[':hover'] = {
        backgroundColor: 'salmon',
        cursor: 'pointer'
      }
    }

    const classes = [];
    if (this.state.persons.length <= 1) {
      classes.push('bold');
    }

    if (this.state.persons.length <= 2) {
      classes.push('red');
    }

    return (
      <StyleRoot>
        <div className="App">
          <h1>My React App</h1>
          <p className={classes.join(' ')}>This is working as expected</p>
          <button 
            style={buttonStyles} 
            onClick={this.togglePersonsHandler}>Toggle Persons</button> 
          { persons }
        </div>
      </StyleRoot>
    ); 
  }
}

export default Radium(App);
