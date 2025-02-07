import { useContext } from "react";
import styles from "./CreateTaskForm.module.scss";
import { TasksPageContext } from "../../routes/TasksPage";

import { nanoid } from "nanoid";

const convertNum = (num) => (num < 10 ? `0${num}` : `${num}`);

export default function CreateTaskForm() {
  const context = useContext(TasksPageContext);

  const { projectId, setOpenedPopup, getTasks } = context;

  async function createProject(event) {
    event.preventDefault();

    const currDate = new Date();

    const projects = JSON.parse(localStorage.getItem("projects")).map(
      (project, index) => {
        if (project.id === projectId) {
          project.tasks.queue = [
            {
              id: nanoid(),

              number: index + 1,

              name: new FormData(event.target).get("name"),

              desc: new FormData(event.target).get("desc"),

              creationDate: `${convertNum(currDate.getHours())}:${convertNum(
                currDate.getMinutes()
              )} ${convertNum(currDate.getDate())}.${convertNum(
                currDate.getMonth() + 1
              )}.${convertNum(currDate.getFullYear())}`,

              duration: null,

              endDate: null,

              priority: new FormData(event.target).get("priority"),

              files: [],

              status: "В очереди",

              subTasks: [],

              comments: [],
            },
            ...project.tasks.queue,
          ];
        }
        return project;
      }
    );

    localStorage.setItem("projects", JSON.stringify(projects));

    setOpenedPopup(false);

    getTasks();
  }

  return (
    <form
      className={styles.CreateTaskForm}
      onSubmit={(event) => {
        createProject(event);
      }}
    >
      <input
        name="name"
        placeholder="Наименование задачи"
        autoComplete="off"
        required
      />
      <textarea
        name="desc"
        placeholder="Описание задачи"
        autoComplete="off"
        required
      />
      <select placeholder="Приоритет" required name={"priority"}>
        <option value="" disabled selected hidden>
          Приоритет
        </option>
        <option value={"Высокий"}>Высокий</option>
        <option value={"Средний"}>Средний</option>
        <option value={"Низкий"}>Низкий</option>
      </select>
      <button type="submit">Создать</button>
    </form>
  );
}
