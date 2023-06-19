import React, { useContext } from "react";
import DataContext from "../context/DataProvider";

const useTask = () => {
  const { taskState, taskDispatch } = useContext(DataContext);

  return {
    // useAddTask: (dispatch) => {
    //   const addTask = (task) => {
    //     dispatch({ type: "ADD_TASK", payload: task });
    //   };
    //   return addTask;
    // };

    onAddTask: (data) => {
      taskDispatch({ type: "ADD_TASK", payload: data });
    },

    onRemoveTask: (data) => {
      taskDispatch({ type: "REMOVE_TASK", payload: data });
    },

    onUpdateTask: (data) => {
      taskDispatch({ type: "UPDATE_TASK", payload: data });
    },
    getEditTask: (data) => {
      taskDispatch({ type: "SELECTED_TASK", payload: data });
    },
  };
};

export default useTask;
