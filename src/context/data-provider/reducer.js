
export const dataReducer = (state, action) => {
    switch (action.type) {
      case "ADD_TASK":
        return {
          ...state,
          task: [...state.task, action.payload],
        };
      case "REMOVE_TASK":
        return {
          ...state,
          task: state.task.filter((item) => item.id !== action.payload),
        };
      case "UPDATE_TASK":
        return {
          ...state,
          task: state.task.map((item) => {
            return item.id === action.payload.id ? action.payload : item;
          }),
        };
      case "SELECTED_TASK":
        return {
          ...state,
          selectedTask: state.task.find((t) => t.id === action.payload.id),
        };
      default:
        return state;
    }
  };