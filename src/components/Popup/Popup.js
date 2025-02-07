import styles from "./Popup.module.scss";

import { useContext, useEffect, useState } from "react";

import CreateProjectForm from "../CreateProjectForm/CreateProjectForm";
import EditProjectForm from "../EditProjectForm/EditProjectForm";
import DeleteProjectForm from "../DeleteProjectForm/DeleteProjectForm";
import { ProjectPageContext } from "../../routes/ProjectsPage";

import CreateTaskForm from "../CreateTaskForm/CreateTaskForm";
import EditTaskForm from "../EditTaskForm/EditTaskForm";
import DeleteTaskForm from "../DeleteTaskForm/DeleteTaskForm";
import { TasksPageContext } from "../../routes/TasksPage";

export default function Popup({ opened, title, id, type }) {
  const contextProjects = useContext(ProjectPageContext);
  const contextTasks = useContext(TasksPageContext);

  let setOpenedPopup;

  if (type === "projects") {
    setOpenedPopup = contextProjects.setOpenedPopup;
  } else {
    setOpenedPopup = contextTasks.setOpenedPopup;
  }

  const [content, setContent] = useState();

  useEffect(() => {
    if (title === "Создать проект") {
      setContent(<CreateProjectForm />);
    } else if (/^Редактировать проект/g.test(title)) {
      setContent(<EditProjectForm id={id} />);
    } else if (/^Удалить проект/g.test(title)) {
      setContent(<DeleteProjectForm id={id} />);
    } else if (title === "Создать задачу") {
      setContent(<CreateTaskForm id={id} />);
    } else if (/^Редактировать задачу/g.test(title)) {
      setContent(<EditTaskForm id={id} />);
    } else if (/^Удалить задачу/g.test(title)) {
      setContent(<DeleteTaskForm id={id} />);
    }
  }, [opened, title, id]);

  return (
    <div
      style={opened ? { display: "flex" } : { display: "none" }}
      className={styles.Popup}
    >
      <div className={styles.window}>
        <div className={styles.top}>
          <h3>{title}</h3>
          <button
            onClick={() => {
              setOpenedPopup(false);
              document.querySelector("form").reset();
              if (type === "tasks") {
                document.querySelector("select").value = "";
              }
            }}
          >
            Закрыть
          </button>
        </div>
        <div className={styles.content}>{content}</div>
      </div>
    </div>
  );
}
