import React from "react";
import { Formik, Field, Form } from "formik";
import * as yup from "yup";
import { sleep, isEmpty } from "./../../utils/functions.util"
import { useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";
import useTask from "./../../hooks/useTask";

const checkoutSchema = yup.object().shape({
  taskTitle: yup.string().required(" "),
  taskType: yup.string().required(" "),
});

const FormPage = () => {
  const { onAddTask, onUpdateTask, getSelectedTask: selectedTask } = useTask();
  const checkSelectedTaskEmpty = isEmpty(selectedTask);

  const navigate = useNavigate();

  const handleFormSubmit = async (values) => {
    await sleep(500);
    if (isEmpty(selectedTask)) {
      onAddTask({ ...values, id: nanoid() });
    } else {
      onUpdateTask({
        ...selectedTask,
        taskTitle: values.taskTitle,
        taskType: values.taskType,
        toggle: values.toggle,
      });
    }
    navigate("/list");
  };

  const handleGoToList = () => {
    navigate("/list");
  }

  return (
    <div className="grid md:grid-cols-2 grid-cols-1 items-center md:justify-items-start justify-items-center lg:gap-16 md:gap-0 gap-16 p-16">
      <div className="grid gap-12 w-full">
      <Formik
        initialValues={
          checkSelectedTaskEmpty
            ? {
                id: "",
                taskTitle: "",
                taskType: "",
                toggle: false,
              }
            : {
                id: selectedTask.id,
                taskTitle: selectedTask.taskTitle,
                taskType: selectedTask.taskType,
                toggle: selectedTask.toggle,
              }
        }
        onSubmit={handleFormSubmit}
        validationSchema={checkoutSchema}
      >
        {({ values, errors, touched }) => (
          <Form className="grid gap-8">
            <h1 className="xl:text-6xl md:text-5xl sm:text-4xl text-3xl">Create New Task</h1>
            <div className="grid gap-2">
              <label htmlFor="taskTitle" className="text-sm">
                Task Title
              </label>
              <Field
                id="taskTitle"
                name="taskTitle"
                className={`h-10 md:w-10/12 w-full rounded-md border-primaryColor border-2 bg-transparent px-3 ${
                  errors.taskTitle && touched.taskTitle ? "border-red-600" : ""
                }`}
                value={values.taskTitle}
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="taskType" className="text-sm">
                Task Type
              </label>
              <Field
                as="select"
                name="taskType"
                id="taskType"
                className={`h-10 md:w-10/12 w-full rounded-md border-primaryColor border-2 bg-transparent px-3 focus:border-primaryColor focus:ring-0 ${
                  errors.taskType && touched.taskType ? "border-red-600" : ""
                }`}
                value={values.taskType}
              >
                <option value="" disabled defaultValue hidden>
                  Select your option
                </option>
                <option value="Feature">Feature</option>
                <option value="Bug">Bug</option>
                <option value="Support">Support</option>
                <option value="Test">Test</option>
              </Field>
            </div>
            <div className="flex items-center gap-2">
              <Field
                type="checkbox"
                name="toggle"
                id="toggle"
                className="w-5 h-5 rounded-md border-primaryColor border-2 bg-transparent checked:ring-primaryColor checked:bg-primaryColor focus:ring-primaryColor"
              />
              {values.toggle ? "Active" : "Inactive"}
            </div>
            <button
              type="submit"
              className="h-10 md:w-10/12 w-full rounded-md text-lightColor bg-secondaryColor"
            >
              Submit{" "}
            </button>
          </Form>
        )}
      </Formik>
      <button
        type="button"
        className="h-14 md:w-10/12 w-full rounded-md text-lightColor bg-primaryColor"
        onClick={handleGoToList}
      >
        Go To List
      </button>
      </div>
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
