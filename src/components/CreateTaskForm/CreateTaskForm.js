import { useContext } from "react";
import styles from "./CreateTaskForm.module.scss";
import { TasksPageContext } from "../../routes/TasksPage";

import { nanoid } from "nanoid";

export default function CreateTaskForm() {
  const context = useContext(TasksPageContext);

  const { projectId, setOpenedPopup, getTasks } = context;

  const numberTask = localStorage.getItem(`numberTask_${projectId}`)
    ? String(Number(localStorage.getItem(`numberTask_${projectId}`)) + 1)
    : 1;

  async function createProject(event) {
    event.preventDefault();

    console.log(event.target.querySelector('input[type="file"]').files);

    const projects = JSON.parse(localStorage.getItem("projects")).map(
      (project) => {
        if (project.id === projectId) {
          project.tasks.queue = [
            {
              id: nanoid(),

              number: numberTask,

              name: new FormData(event.target).get("name"),

              desc: new FormData(event.target).get("desc"),

              creationDate: new Date(),

              duration: null,

              endDate: null,

              priority: new FormData(event.target).get("priority"),

              files: [
                ...event.target.querySelector('input[type="file"]').files,
              ].map((file) => file.name),
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

    localStorage.setItem(
      `numberTask_${projectId}`,
      String(Number(localStorage.getItem(`numberTask_${projectId}`)) + 1)
    );

    setOpenedPopup(false);

    getTasks();

    event.target.reset();

    event.target.querySelector("select").value = "";
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
      <select placeholder="Задать приоритет" required name={"priority"}>
        <option value="" disabled selected hidden>
          Задать приоритет
        </option>
        <option value={"Высокий"}>Высокий</option>
        <option value={"Средний"}>Средний</option>
        <option value={"Низкий"}>Низкий</option>
      </select>
      <input
        id="file-upload"
        name="files"
        type="file"
        multiple="multiple"
        style={{ display: "none" }}
      />
      <label for="file-upload" class="custom-file-upload">
        Выбрать файл
      </label>
      <button type="submit">Создать</button>
    </form>
  );
}
