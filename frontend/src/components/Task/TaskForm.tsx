import React, { useEffect, useRef } from "react";
import { Formik, FormikProps } from "formik";
import * as Yup from "yup";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { useAppDispatch, useAppSelector } from "../../app/store/hooks";
import {
  createTask,
  deleteTask,
  fetchTasks,
  getTask,
  updateTask,
} from "../../app/features/task/taskActions";
import { Task } from "../../app/interfaces";

const initialTaskValues: Task = {
  title: "",
  note: "",
};

const TaskForm: React.FC = () => {
  const { task, tasks } = useAppSelector((state) => state.task);
  const dispatch = useAppDispatch();
  const taskFormikRef = useRef<FormikProps<Task>>(null);

  const taskFormikSchema = Yup.object().shape({
    title: Yup.string()
      .max(100, "*Title can't be longer than 100 characters")
      .required("*Title is required"),
  });

  const submitTaskFormikHandler = (values: Task) => {
    // dispatch(createTask(values));
    const id = 1;
    // dispatch(updateTask(values));
    // dispatch(deleteTask(id.toString()));
    dispatch(getTask(id.toString()));
  };

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const taskList =
    tasks.length > 0
      ? tasks.map((task, i) => <p key={i}>{task.title}</p>)
      : "empty task list";

  return (
    <div>
      <div>{taskList}</div>
      <hr />
      {task.title}
      <Formik
        innerRef={taskFormikRef}
        validationSchema={taskFormikSchema}
        onSubmit={submitTaskFormikHandler}
        initialValues={initialTaskValues}
      >
        {({
          handleSubmit,
          handleChange,
          setFieldValue,
          resetForm,
          values,
          errors,
          isSubmitting,
        }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <InputGroup>
              <Form.Control
                name="title"
                value={values.title}
                placeholder="Write your title here."
                onChange={handleChange}
                isInvalid={!!errors.title}
              />

              {/* <Form.Control
                name="note"
                as="textarea"
                value={values.note}
                placeholder="Write task note here."
                onChange={handleChange}
              /> */}

              <Button
                variant="outline-primary"
                type="submit"
                disabled={isSubmitting}
              >
                Create
              </Button>
              <Button
                variant="outline-primary"
                type="reset"
                onClick={() => {
                  resetForm();
                  setFieldValue("note", ""); // Clear the 'note' field manually
                }}
              >
                x
              </Button>
              <Form.Control.Feedback type="invalid">
                {errors.title}
              </Form.Control.Feedback>
            </InputGroup>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default TaskForm;
