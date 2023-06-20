import React, { createContext, useReducer } from "react";
import { INITIAL_STATE } from "./initial";
import { dataReducer } from "./reducer";

const DataContext = createContext();

export const DataProvider = (props) => {
  const [taskState, taskDispatch] = useReducer(dataReducer, INITIAL_STATE);

  return (
    <DataContext.Provider
      value={{
        taskState,
        taskDispatch,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};

export default DataContext;
