import styles from "./TaskCard.module.scss";
import { useContext } from "react";
import { TasksPageContext } from "../../routes/TasksPage";

export default function TaskCard({ id, name }) {
  const context = useContext(TasksPageContext);

  /*const { setTitlePopup, setOpenedPopup, setProjectId, setProjectName } =
    context;
  const editHandleOnclick = (event) => {
    setTitlePopup(`Редактировать проект "${name}"`);
    setProjectId(id);
    setProjectName(name);
    setOpenedPopup(true);
  };

  const deleteHandleOnclick = (event) => {
    setTitlePopup(`Удалить проект "${name}"`);
    setProjectId(id);
    setProjectName(name);
    setOpenedPopup(true);
  };*/

  return (
    <div id={id} className={styles.ProjectCard}>
      <div className={styles.window}>
        <div className={styles.name}>
          <h3>{name}</h3>
        </div>

        <div className={styles.buttonPanel}>
          <button>Редактировать</button>
          <button>Удалить</button>
        </div>
      </div>
    </div>
  );
}
