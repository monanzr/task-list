import React, { useState, createContext, useReducer } from "react";
import { tasks } from "./data";
import { nanoid } from "nanoid";

const DataContext = createContext();

const INITIAL_STATE = {
  task: tasks,
  selectedTask: ""
};

const dataReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TASK":
      return {
        ...state,
        task: [...state.task, action.payload],
      };
      case "REMOVE_TASK":
        return {
          ...state,
          task: state.task.filter((item) => item.id !== action.payload)
        };
    case "UPDATE_TASK":
      return {
        ...state,
        task: state.task.map((item) => {
          return item.id === action.payload.id ? action.payload : item
        })
      }
      case "SELECTED_TASK":
        return {
          ...state,
          selectedTask: state.task.find((t) => t.id === action.payload.id )
        }
    default:
      return state;
  }
};

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
