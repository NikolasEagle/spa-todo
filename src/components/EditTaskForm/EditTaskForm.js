import { useContext, useEffect, useState } from "react";
import styles from "./EditTaskForm.module.scss";

import { TasksPageContext } from "../../routes/TasksPage";

export default function EditTaskForm({ id }) {
  const context = useContext(TasksPageContext);

  const {
    setOpenedPopup,
    projectName,
    getProjects,
    taskNumber,
    taskId,
    taskName,
    taskDesc,
    taskCreationDate,
    taskDuration,
    taskEndDate,
    taskPriority,
    files,
    taskStatus,
    subTasks,
    comments,
    projectId,
    getTasks,
  } = context;

  const [valueName, setValueName] = useState(taskName);
  const [valueDesc, setValueDesc] = useState(taskDesc);
  const [valuePriority, setValuePriority] = useState(taskPriority);

  useEffect(() => {
    setValueName(taskName);
    setValueDesc(taskDesc);
    setValuePriority(taskPriority);
  }, [taskName, taskDesc]);

  async function editProject(event) {
    event.preventDefault();

    const projectsStorage = JSON.parse(localStorage.getItem("projects"));

    localStorage.setItem(
      "projects",
      JSON.stringify(
        projectsStorage.map((project) => {
          if (project.id === projectId) {
            project.tasks.queue.map((queue) => {
              if (queue.id === taskId) {
                queue.name = new FormData(event.target).get("name");

                queue.desc = new FormData(event.target).get("desc");

                queue.priority = new FormData(event.target).get("priority");
              }

              return queue;
            });
            project.tasks.development.map((development) => {
              if (development.id === taskId) {
                development.name = new FormData(event.target).get("name");

                development.desc = new FormData(event.target).get("desc");

                development.priority = new FormData(event.target).get(
                  "priority"
                );
              }

              return development;
            });
            project.tasks.done.map((done) => {
              if (done.id === taskId) {
                done.name = new FormData(event.target).get("name");

                done.desc = new FormData(event.target).get("desc");

                done.priority = new FormData(event.target).get("priority");
              }

              return done;
            });
          }
          return project;
        })
      )
    );

    setOpenedPopup(false);

    setValueName("");

    setValueDesc("");

    setValuePriority("");

    getTasks();

    event.target.reset();
  }

  return (
    <form
      className={styles.EditTaskForm}
      onSubmit={(event) => {
        editProject(event);
      }}
    >
      <input
        value={valueName}
        onChange={(event) => setValueName(event.target.value)}
        name="name"
        placeholder="Наименование задачи"
        autoComplete="off"
        required
      />
      <textarea
        value={valueDesc}
        onChange={(event) => setValueDesc(event.target.value)}
        name="desc"
        placeholder="Описание"
        autoComplete="off"
        required
      />
      <p>
        <b>Дата создания:</b> {taskCreationDate}
      </p>
      {taskStatus === "В работе" && <p>В работе: {taskDuration}</p>}
      {taskStatus === "Выполнено" && <p>Дата выполнения: {taskEndDate}</p>}
      <select
        onChange={(event) => setValuePriority(event.target.value)}
        value={valuePriority}
        placeholder="Приоритет"
        required
        name={"priority"}
      >
        <option value="" disabled selected hidden>
          Приоритет
        </option>
        <option value={"Высокий"}>Высокий</option>
        <option value={"Средний"}>Средний</option>
        <option value={"Низкий"}>Низкий</option>
      </select>
      <div>
        <b>Файлы:</b>{" "}
        {files.map((file) => {
          return <div>{file}</div>;
        })}
      </div>
      <p>
        <b>Статус:</b> {taskStatus}
      </p>
      <button type="submit">Сохранить</button>
    </form>
  );
}
