import { useState } from "react";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const addGood = () => {
    setGood(good + 1);
  };

  const addBad = () => {
    setBad(bad + 1);
  };

  const addNeutral = () => {
    setNeutral(neutral + 1);
  };

  return (
    <div>
      <Title title="give feedback" />
      <Button text="good" handleClick={addGood} />
      <Button text="bad" handleClick={addBad} />
      <Button text="neutral" handleClick={addNeutral} />
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  );
};

const Title = ({ title }) => {
  return <h1>{title}</h1>;
};

const Button = ({ text, handleClick }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const Statistics = ({ good, bad, neutral }) => {
  const all = good + bad + neutral;
  const average = (good - bad) / all;
  const positive = good / all;

  return (
    <div>
      <h2>statistics</h2>
      <StatisticsLine text="good" value={good} />
      <StatisticsLine text="neutral" value={neutral} />
      <StatisticsLine text="bad" value={bad} />
      <StatisticsLine text="all" value={all} />
      <StatisticsLine text="average" value={average} />
      <StatisticsLine text="positive" value={positive} />
    </div>
  );
};

const StatisticsLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

export default App;
