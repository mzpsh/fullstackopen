import axios from 'axios'
import { useEffect, useState } from 'react'
import personsService from './services/persons.js'; 

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '0800-11112222', id: "0"}
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  
  const hook = () => {
    personsService.getAll().then(data => setPersons(data))
  }

  useEffect(hook, [])

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleOnSubmit = (event) => {
    event.preventDefault()
    const newPerson = {name: newName, number: newNumber};

    if(persons.map(e => e.name).includes(newName)) {
      const existingPerson = persons.find(person => person.name === newName);
      const { id } = existingPerson;
      if(confirm(`${newName} is already on the phonebook, update the phone number?`)) {
        personsService.update(id, newPerson).then(data => {
          setPersons(data);
          setNewName('')  
          setNewNumber('')  
        })
      }
    } else {
      personsService.create(newPerson).then(data => {
          setPersons(persons.concat(data));
          setNewName('')  
          setNewNumber('')  
        })
    }
  }

  const handleOnDelete = (id) => {
    if(window.confirm(`Delete ${persons.find(person => person.id === id).name}?`)) {
      personsService.remove(id).then(reponse => {
        setPersons(
          persons.filter(person => person.id !== id)
        )
      })
    }
  }

  const [filter, setFilter] = useState('')
  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  const filteredPersons = () => filter === ''
    ? persons
    : persons.filter((e) => e.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <PersonForm {...{handleOnSubmit, newName, handleNewName, newNumber, handleNewNumber}}/>
      <h2>Numbers</h2>
      <FilterForm {...{filter, handleFilter}}/>
      <PersonList filteredPersons={filteredPersons()} handleOnDelete={handleOnDelete}/>
    </div>
  )
}

const PersonList = ({filteredPersons, handleOnDelete}) => <>
    {
      filteredPersons.map(
        person => <p key={person.name}>{person.name} {person.number} <button onClick={() => handleOnDelete(person.id)}>Delete</button></p>
      )
    }
  </>

const FilterForm = ({filter, handleFilter}) => <>filter: <input type={filter} onChange={handleFilter} /></>

const PersonForm = ({handleOnSubmit, newName, handleNewName, newNumber, handleNewNumber}) => {
  return (
    <form onSubmit={handleOnSubmit}>
      <div>
        name: <input value={newName} onChange={handleNewName} /><br />
        number: <input value={newNumber} onChange={handleNewNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default App