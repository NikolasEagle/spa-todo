import { useContext, useEffect, useState, useRef } from "react";
import styles from "./EditTaskForm.module.scss";

import { TasksPageContext } from "../../routes/TasksPage";

const convertNum = (num) => (num < 10 ? `0${num}` : `${num}`);

export default function EditTaskForm({ id }) {
  const context = useContext(TasksPageContext);

  const {
    setOpenedPopup,
    openedPopup,
    projectName,
    getProjects,
    taskNumber,
    taskId,
    taskName,
    taskDesc,
    taskCreationDate,
    setTaskCreationDate,
    taskDuration,
    setTaskDuration,
    taskEndDate,
    taskPriority,
    files,
    taskStatus,
    subTasks,
    comments,
    projectId,
    intervalID,
    setIntervalID,
    getTasks,
  } = context;

  const [valueName, setValueName] = useState(taskName);
  const [valueDesc, setValueDesc] = useState(taskDesc);
  const [valuePriority, setValuePriority] = useState(taskPriority);

  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
    } else {
      setValueName(taskName);
      setValueDesc(taskDesc);
      setValuePriority(taskPriority);
      console.log(intervalID);
      clearInterval(intervalID);
      setIntervalID(
        setInterval(() => {
          setTaskDuration(new Date() - new Date(taskCreationDate));
        }, 0)
      );
    }
  }, [taskName, taskDesc, taskPriority, taskCreationDate, openedPopup]);

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
        <b>Дата создания:</b>{" "}
        {`${convertNum(new Date(taskCreationDate).getHours())}:${convertNum(
          new Date(taskCreationDate).getMinutes()
        )}:${convertNum(new Date(taskCreationDate).getSeconds())} ${convertNum(
          new Date(taskCreationDate).getDate()
        )}.${convertNum(new Date(taskCreationDate).getMonth() + 1)}.${new Date(
          taskCreationDate
        ).getFullYear()}`}
      </p>
      {taskStatus === "В работе" && (
        <p>
          <b>В работе:</b> {Math.round(taskDuration / 1000 / 60 / 60 / 24)} д{" "}
          {Math.round(taskDuration / 1000 / 60 / 60)} ч{" "}
          {Math.round(taskDuration / 1000 / 60)} мин{" "}
          {Math.round(taskDuration / 1000)} сек
        </p>
      )}
      {taskStatus === "Выполнено" && (
        <p>
          <b>Дата выполнения:</b>{" "}
          {`${convertNum(new Date(taskEndDate).getHours())}:${convertNum(
            new Date(taskEndDate).getMinutes()
          )}:${convertNum(new Date(taskEndDate).getSeconds())} ${convertNum(
            new Date(taskEndDate).getDate()
          )}.${convertNum(new Date(taskEndDate).getMonth() + 1)}.${new Date(
            taskEndDate
          ).getFullYear()}`}
        </p>
      )}
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

      {files.length > 0 ? (
        <div>
          <b>Файлы:</b> {files.join(", ")}
        </div>
      ) : null}

      <p>
        <b>Статус:</b> {taskStatus}
      </p>
      <button type="submit">Сохранить</button>
    </form>
  );
}
