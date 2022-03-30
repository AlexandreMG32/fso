import React from "react";

const Filter = ({ filter, changeFilter }) => {
  return (
    <div>
      filter show with <input value={filter} onChange={changeFilter} />
    </div>
  );
};

export default Filter;
