import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Person from "./components/Person";
import Info from "./components/Info";
import contactService from "./services/contacts";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterWord, setFilterWord] = useState("");
  const [infoMessage, setInfoMessage] = useState(null);
  const [infoType, setInfoType] = useState(null);

  useEffect(() => {
    contactService
      .getAll()
      .then((initialContacts) => setPersons(initialContacts));
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
    const contact = persons.filter(
      (p) => p.name.toLowerCase() === newName.toLowerCase()
    )[0];
    if (contact) {
      console.log(contact);
      if (window.confirm(`Update ${newName} ?`)) {
        contactService
          .update(contact.id, { ...contact, number: newNumber })
          .then((updatedContact) => {
            setPersons(
              persons.map((person) =>
                person.id === updatedContact.id ? updatedContact : person
              )
            );
          })
          .catch((error) => {
            setInfoMessage(error.response.data.error);
            setInfoType("error");

            setTimeout(() => {
              setInfoMessage(null);
              setInfoType(null);
            }, 3000);
          });
        return;
      } else {
        return;
      }
    }
    const newPerson = { name: newName, number: newNumber };
    contactService
      .create(newPerson)
      .then((contactCreated) => {
        setPersons(persons.concat(contactCreated));
        setInfoMessage(`Contact ${newName} was added to the list`);
        setInfoType("added");
        setNewName("");
        setNewNumber("");

        setTimeout(() => {
          setInfoMessage(null);
          setInfoType(null);
        }, 3000);
      })
      .catch((error) => {
        setInfoMessage(error.response.data.error);
        setInfoType("error");

        setTimeout(() => {
          setInfoMessage(null);
          setInfoType(null);
        }, 3000);
      });
  };

  const deleteContact = (contact) => {
    if (window.confirm(`Delete ${contact.name} ?`)) {
      contactService
        .remove(contact)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== contact.id));
        })
        .catch((err) => {
          setInfoMessage(`Contact ${newName} is already deleted from the list`);
          setInfoType("error");

          setTimeout(() => {
            setInfoMessage(null);
            setInfoType(null);
          }, 3000);
        });
    }
  };

  const filterShown = (event) => {
    setFilterWord(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Info message={infoMessage} type={infoType} />
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
      {contactsToShow.map((person) => (
        <Person
          key={person.id}
          person={person}
          deletePerson={() => deleteContact(person)}
        />
      ))}
    </div>
  );
};

export default App;
