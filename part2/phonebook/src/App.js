import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterWord, setFilterWord] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then((response) => setPersons(response.data));
  }, []);

  const contactsToShow = persons.filter((contact) =>
    contact.name.toLowerCase().includes(filterWord.toLowerCase())
  );

  const onChangeName = (event) => {
    setNewName(event.target.value);
  };

  const onChangeNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const saveContact = (event) => {
    event.preventDefault();
    const containsName = persons.map((p) => p.name).includes(newName);
    if (containsName) {
      alert(`${newName} is already in the list`);
      return;
    }
    const newPerson = { name: newName, number: newNumber };
    setPersons(persons.concat(newPerson));
    setNewName("");
    setNewNumber("");
  };

  const filterShown = (event) => {
    setFilterWord(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filterWord} changeFilter={filterShown} />
      <h2>Add a new</h2>
      <PersonForm
        newName={newName}
        onChangeName={onChangeName}
        newNumber={newNumber}
        onChangeNumber={onChangeNumber}
        saveContact={saveContact}
      />
      <h2>Numbers</h2>
      <Persons persons={contactsToShow} />
    </div>
  );
};

export default App;
