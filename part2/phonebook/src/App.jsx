import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '0800-11112222'}
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleOnSubmit = (event) => {
    event.preventDefault()
    if(persons.map(e => e.name).includes(newName)) {
      alert(`${newName} is already exist on the phonebook.`)
    } else {
      setPersons(persons.concat({name: newName, number: newNumber}));
      setNewName('')  
      setNewNumber('')  
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
      <PersonList filteredPersons={filteredPersons()}/>
    </div>
  )
}

const PersonList = ({filteredPersons}) => <>
    {
      filteredPersons.map(
        person => <p key={person.name}>{person.name} {person.number}</p>
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