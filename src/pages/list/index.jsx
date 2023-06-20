import React from "react";
import { Table } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import useTask from "./../../hooks/useTask";
import { LuEdit, LuTrash2 } from "react-icons/lu";
import { emptyObject } from "./../../utils/functions.util";

const ListPage = () => {
  const navigate = useNavigate();
  const {
    onRemoveTask,
    getEditTask,
    getTasks: task,
    getSelectedTask: selectedTask,
  } = useTask();

  console.log("task", task);

  const handleBackToForm = () => {
    emptyObject(selectedTask);
    navigate("/");
  };

  const handleEdit = (val) => {
    getEditTask(val);
    navigate("/");
  };

  const handleRemove = (val) => {
    onRemoveTask(val.id);
  };

  return (
    <div className="xl:w-8/12 w-10/12 grid gap-16 items-center sm:p-16 px-4 py-24">
      <button
        type="button"
        className="sm:h-14 h-12 md:w-5/12 sm:w-7/12 w-10/12 m-auto rounded-md text-lightColor bg-secondaryColor"
        onClick={handleBackToForm}
      >
        Back To Form
      </button>
      <div className="overflow-x-auto">
        <Table hoverable>
          <Table.Head className="text-lightColor">
            <Table.HeadCell className="bg-primaryColor">
              Task Title
            </Table.HeadCell>
            <Table.HeadCell className="bg-primaryColor">
              Task Type
            </Table.HeadCell>
            <Table.HeadCell className="bg-primaryColor">Status</Table.HeadCell>
            <Table.HeadCell className="bg-primaryColor">
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {task.map((item) => (
              <Table.Row
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
                key={item.id}
              >
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900">
                  {item.taskTitle}
                </Table.Cell>
                <Table.Cell>{item.taskType}</Table.Cell>
                <Table.Cell>{item.toggle ? "Active" : "Inactive"}</Table.Cell>
                <Table.Cell className="flex gap-4 text-lg">
                  <button
                    className="font-medium text-secondaryColor hover:underline"
                    onClick={() => handleEdit(item)}
                  >
                    <LuEdit />
                  </button>
                  <button
                    className="font-medium text-secondaryColor hover:underline"
                    onClick={() => handleRemove(item)}
                  >
                    <LuTrash2 />
                  </button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};

export default ListPage;
