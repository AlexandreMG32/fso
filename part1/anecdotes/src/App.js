import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(7).fill(0));
  const mostVotes = Math.max(...votes);
  const mostVoted = anecdotes[votes.indexOf(mostVotes)];
  console.log(mostVoted);
  console.log(mostVotes);

  const generateValue = () => {
    const value = Math.floor(Math.random() * (anecdotes.length - 0));
    setSelected(value);
  };

  const voteFor = () => {
    const copy = [...votes];
    copy[selected] += 1;
    setVotes(copy);
  };

  return (
    <div>
      <Title title="Anecdote of the day" />
      <Anecdote anecdote={anecdotes[selected]} />
      <button onClick={voteFor}>vote</button>
      <button onClick={generateValue}>next anecdote</button>
      <Title title="Anecdote with most votes" />
      <Anecdote anecdote={mostVoted} />
      <div>has {mostVotes}</div>
    </div>
  );
};

const Title = ({ title }) => {
  return <h1>{title}</h1>;
};

const Anecdote = ({ anecdote }) => {
  return <div>{anecdote}</div>;
};

export default App;
