import { nanoid } from "nanoid";

export const tasks = [
  {
    taskTitle: "Title 1",
    taskType: "Bug",
    toggle: true,
    id: nanoid()
  },
  {
    taskTitle: "Title 2",
    taskType: "Feature",
    toggle: true,
    id: nanoid()
  },
  {
    taskTitle: "Title 3",
    taskType: "Support",
    toggle: false,
    id: nanoid()
  },
];
