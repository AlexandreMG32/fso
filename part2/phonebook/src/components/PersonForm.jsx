import React from "react";

const PersonForm = ({
  newName,
  onChangeName,
  newNumber,
  onChangeNumber,
  saveContact,
}) => {
  return (
    <form>
      <div>
        name: <input value={newName} onChange={onChangeName} />
      </div>
      <div>
        number: <input value={newNumber} onChange={onChangeNumber} />
      </div>
      <div>
        <button type="submit" onClick={saveContact}>
          add
        </button>
      </div>
    </form>
  );
};

export default PersonForm;
