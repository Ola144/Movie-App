import { createContext, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const CounterContext = createContext();

export const CounterProvider = ({ children }) => {
  const [count, setCount] = useState(0);

  const increaseCount = () => setCount((prevCount) => prevCount + 1);

  const decreaseCount = () => setCount((prevCount) => prevCount - 1);

  return (
    <CounterContext.Provider
      value={{
        count,
        increaseCount,
        decreaseCount,
      }}
    >
      {children}
    </CounterContext.Provider>
  );
};
