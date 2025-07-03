import { useState } from "react";
import "./App.css";
// import { CounterContext, CounterProvider } from "./context/counterContext";

function Card({ title }) {
  const [hasLiked, setHasLiked] = useState(false);
  const [count, setCount] = useState(0);

  // const context = useContext(CounterContext);
  // const { count, increaseCount, decreaseCount } = context;

  return (
    <div className="px-2 py-5 bg-gray-200 text-pink-400 text-center font-bold rounded-md m-2 text-2xl w-96 mx-auto relative">
      <h2>{title}</h2>

      <button
        className="bg-pink-500 text-white py-1 rounded-lg px-2 text-lg cursor-pointer mt-5"
        onClick={() => {
          setHasLiked(!hasLiked),
            !hasLiked
              ? setCount((prevCount) => prevCount + 1)
              : setCount((prevCount) => prevCount - 1);
        }}
      >
        {hasLiked ? "❤️" : "🤍"}
      </button>

      <span className="absolute top-0 right-0 text-white bg-pink-600 rounded-full px-2 py-1 font-light text-sm">
        {count || null}
      </span>
    </div>
  );
}

function App() {
  return (
    // <CounterProvider>
    <div>
      <Card title="Star Wars" actors={[{ name: "Actors" }]} />
      <Card title="Avatar" />
      <Card title="The Lion King" />
    </div>
    // </CounterProvider>
  );
}

export default App;
