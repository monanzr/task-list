import React, { useContext, useState } from "react";
import { Table } from "flowbite-react";
import DataContext from "../../context/DataProvider";
import { useNavigate } from "react-router-dom";
import useTask from './../../hooks/useTask';
import { LuEdit, LuTrash2 } from "react-icons/lu";

const ListPage = () => {
  const { taskState: { task, selectedTask }, taskDispatch } = useContext(DataContext);
  const navigate = useNavigate();
  const { onRemoveTask, getEditTask } = useTask()

  console.log("task", task);

  const handleEditForm = (val) => {
    // taskDispatch({
    //   type: 'SELECTED_TASK',
    //   payload: val
    // })
    getEditTask(val)
    // setSelectedItem(task.find((t) => t.id === val.id))
    // const selectedData = {
    //   id: item.id,
    //   taskTitle: item.taskTitle,
    //   taskType: item.taskType,
    //   toggle: item.toggle,
    // }
    // console.log(selectedData)
    // onUpdateTask(selectedData)
    navigate("/");
  };

  const handleRemoveForm = (val) => {
    // taskDispatch({
    //   type: 'REMOVE_TASK',
    //   payload: val.id
    // })
    onRemoveTask(val.id)
  }

  return (
    <div className="w-8/12">
      <Table hoverable>
        <Table.Head className="text-lightColor">
          <Table.HeadCell className="bg-primaryColor">
            Task Title
          </Table.HeadCell>
          <Table.HeadCell className="bg-primaryColor">Task Type</Table.HeadCell>
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
                <a
                  className="font-medium text-secondaryColor hover:underline"
                  onClick={() => handleEditForm(item)}
                >
                  <LuEdit />
                </a>
                <a
                  className="font-medium text-secondaryColor hover:underline"
                  onClick={() => handleRemoveForm(item)}
                >
                  <LuTrash2 />
                </a>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default ListPage;
