import React, { Fragment, useContext } from "react";
import { Formik, Field, Form } from "formik";
import * as yup from "yup";
import DataContext from "../../context/DataProvider";
import { useNavigate, useParams } from "react-router-dom";
import { nanoid } from "nanoid";
import useTask from './../../hooks/useTask';

const initialValues = {
  id: "",
  taskTitle: "",
  taskType: "",
  toggle: false,
};

const checkoutSchema = yup.object().shape({
  taskTitle: yup.string().required(" "),
  taskType: yup.string().required(" "),
  //   toggle: yup.string().required("required"),
});

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const FormPage = () => {
  const { taskState: { selectedTask }, taskDispatch } = useContext(DataContext);
  // const { id } = useParams();
  const navigate = useNavigate();
  const { onAddTask, onUpdateTask } = useTask()


  const handleFormSubmit = async (values) => {
    await sleep(500);
    if (selectedTask === "") {
      // taskDispatch({
      //   type: "ADD_TASK",
      //   payload: {...values, id: nanoid()}
      // })
      onAddTask({...values, id: nanoid()})
    } else {
      // taskDispatch({
      //   type: "UPDATE_TASK",
      //   payload: 
      // })
      onUpdateTask({...selectedTask, taskTitle: values.taskTitle, taskType: values.taskType, toggle: values.toggle})
    }
    // }
    console.log(values);
    navigate("/list");
  };

  return (
    <div className="flex justify-around items-center gap-16">
      <Formik
        initialValues={initialValues}
        onSubmit={handleFormSubmit}
        validationSchema={checkoutSchema}
      >
        {({ values, errors, touched }) => (
          <Form className="grid gap-8">
            <h1 className="text-6xl">Create New Task</h1>
            <div className="grid gap-2">
              <label htmlFor="taskTitle" className="text-sm">
                Task Title
              </label>
              <Field
                id="taskTitle"
                name="taskTitle"
                className={`h-10 w-10/12 rounded-md border-primaryColor border-2 bg-transparent px-3 ${
                  errors.taskTitle && touched.taskTitle ? "border-red-600" : ""
                }`}
                value={selectedTask.taskTitle}
              />
              {/* {errors.taskTitle && touched.taskTitle ? (
                <div>{errors.taskTitle}</div>
              ) : null} */}
            </div>
            <div className="grid gap-2">
              <label htmlFor="taskType" className="text-sm">
                Task Type
              </label>
              <Field
                as="select"
                name="taskType"
                id="taskType"
                className={`h-10 w-10/12 rounded-md border-primaryColor border-2 bg-transparent px-3 focus:border-primaryColor focus:ring-0 ${
                  errors.taskType && touched.taskType ? "border-red-600" : ""
                }`}
                value={selectedTask.taskType}
              >
                <option value="" disabled defaultValue hidden>
                  Select your option
                </option>
                <option value="Feature">Feature</option>
                <option value="Bug">Bug</option>
                <option value="Support">Support</option>
                <option value="Test">Test</option>
              </Field>
              {/* {errors.taskType && touched.taskType ? (
                <div>{errors.taskType}</div>
              ) : null} */}
            </div>
            <div className="flex items-center gap-2">
              <Field
                type="checkbox"
                name="toggle"
                id="toggle"
                className="w-5 h-5 rounded-md border-primaryColor border-2 bg-transparent checked:ring-primaryColor checked:bg-primaryColor focus:ring-primaryColor"
                value={selectedTask.toggle}
              />
              {values.toggle ? "Active" : "Inactive"}
            </div>
            <button
              type="submit"
              className="h-10 w-10/12 rounded-md text-lightColor bg-secondaryColor"
            >
              Submit{" "}
            </button>
          </Form>
        )}
      </Formik>
      <div>
        <img
          alt="form"
          src={require("../../assets/tasks.webp")}
          className="w-full h-full"
        />
      </div>
    </div>
  );
};

export default FormPage;
