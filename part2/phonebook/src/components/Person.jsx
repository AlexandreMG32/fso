import React from "react";

const Person = ({ person, deletePerson }) => {
  return (
    <div>
      <div>
        {person.name} {person.number} &emsp;
        <button onClick={deletePerson}>delete</button>
      </div>
    </div>
  );
};

export default Person;
