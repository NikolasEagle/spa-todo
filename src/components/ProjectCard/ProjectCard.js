import styles from "./ProjectCard.module.scss";
import { useContext } from "react";
import { ProjectPageContext } from "../../routes/ProjectsPage";

export default function ProjectCard({ id, name }) {
  const context = useContext(ProjectPageContext);

  const { setTitlePopup, setOpenedPopup, setProjectId, setProjectName } =
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
  };

  return (
    <div id={id} className={styles.ProjectCard}>
      <div className={styles.window}>
        <h3>{name}</h3>
        <div className={styles.buttonPanel}>
          <button onClick={(event) => editHandleOnclick(event)}>
            Редактировать
          </button>
          <button onClick={(event) => deleteHandleOnclick(event)}>
            Удалить
          </button>
        </div>
      </div>
    </div>
  );
}
