import Part from "./Part";

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((p) => (
        <Part key={p.id} exercises={p.exercises} part={p.name} />
      ))}
    </div>
  );
};

export default Content;
