import React, { useContext, useState } from "react";
import { Table } from "flowbite-react";
import DataContext from "../../context/DataProvider";
import { useNavigate, useParams } from "react-router-dom";
import useTask from './../../hooks/useTask';

const ListPage = () => {
  const { taskState: { task, editTask } } = useContext(DataContext);
  // const { id } = useParams();
  const navigate = useNavigate();
  const { onUpdateTask } = useTask()

  console.log("task", task, editTask);

  const handleEditForm = (item) => {
    const selectedData = {
      id: item.id,
      taskTitle: item.taskTitle,
      taskType: item.taskType,
      toggle: item.toggle,
    }
    console.log(selectedData)
    onUpdateTask(selectedData)
    navigate("/");
  };

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
              <Table.Cell>
                <a
                  className="font-medium text-secondaryColor hover:underline"
                  onClick={() => handleEditForm(item)}
                >
                  <p>Edit</p>
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
