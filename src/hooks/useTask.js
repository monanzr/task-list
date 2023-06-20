import { useContext, useMemo } from "react";
import DataContext from "../context/data-provider/provider";

const useTask = () => {
  const { taskState, taskDispatch } = useContext(DataContext);

  return {
    getTasks: useMemo(() => taskState.task, [taskState]),

    getSelectedTask: useMemo(() => taskState.selectedTask, [taskState]),

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
