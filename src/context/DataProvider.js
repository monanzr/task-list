import React, { useState, createContext, useReducer } from "react";
import { tasks } from "./data";
import { nanoid } from 'nanoid'

const DataContext = createContext();

const dataReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TASK":
      return {
        ...state,
        task: [...state.task, { ...action.payload, id: nanoid() }],
      };
      case "EDIT_TASK":
        return {
          ...state,
          editTask: action.payload,
        };
    case "UPDATE_TASK":
      const updatedTask = state.task.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
      return {
        ...state,
        task: updatedTask,
        editTask: null
      };
    default:
      return state;
  }
};

const useTask = () => {

}



export const DataProvider = (props) => {
  // const [task, setTask] = useState(tasks);
  const [taskState, taskDispatch] = useReducer(dataReducer, { task: tasks, editTask: null });
  
  return (
    <DataContext.Provider
      value={{
        taskState,
        taskDispatch
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};

export default DataContext;
