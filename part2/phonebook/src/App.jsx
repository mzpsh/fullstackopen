import axios from 'axios'
import { useEffect, useState } from 'react'
import personsService from './services/persons.js'; 

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '0800-11112222', id: "0"}
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)

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

  const setMessageAndTimeout = (message) => {
    setMessage(message);
    setTimeout(() => {
      setMessage(null)
    }, 5000);
  }

  const setErrorAndTimeout = (message) => {
    setError(message);
    setTimeout(() => {
      setMessage(null)
    }, 5000);
  }

  const handleOnSubmit = (event) => {
    event.preventDefault()
    const newPerson = {name: newName, number: newNumber};

    if(persons.map(e => e.name).includes(newName)) {
      const existingPerson = persons.find(person => person.name === newName);
      const { id } = existingPerson;
      if(confirm(`${newName} is already on the phonebook, update the phone number?`)) {
        personsService.update(id, newPerson).then(data => {
          setPersons(persons.map(person => person.id !== id ? person : data));
          setNewName('')  
          setNewNumber('')
          setMessageAndTimeout(`${newName} updated`)
        })
      }
    } else {
      personsService.create(newPerson).then(data => {
          setPersons(persons.concat(data));
          setNewName('')
          setNewNumber('')  
          setMessageAndTimeout(`${newName} added`)
        })
    }
  }

  const handleOnDelete = (id) => {
    const toBeDeletedName = persons.find(person => person.id === id).name;
    console.log(toBeDeletedName)
    if(window.confirm(`Delete ${toBeDeletedName}?`)) {
      personsService.remove(id).then(reponse => {
        setPersons(
          persons.filter(person => person.id !== id)
        )
        setMessageAndTimeout(`${toBeDeletedName} deleted`)
      }).catch(error => {
        setPersons(
          persons.filter(person => person.id !== id)
        )
        setErrorAndTimeout(`${toBeDeletedName} is already deleted.`)
      });
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
      <Notification {...{message}}/> 
      <Error {...{error}}/> 
      <PersonForm {...{handleOnSubmit, newName, handleNewName, newNumber, handleNewNumber}}/>
      <h2>Numbers</h2>
      <FilterForm {...{filter, handleFilter}}/>
      <PersonList filteredPersons={filteredPersons()} handleOnDelete={handleOnDelete}/>
    </div>
  )
}

const Notification = ({message}) => (message ?? null) === null ? null : <div className="notification">
  {message}
</div>

const Error = ({error}) => (error ?? null) === null ? null : <div className="notification-error">
  {error}
</div>

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