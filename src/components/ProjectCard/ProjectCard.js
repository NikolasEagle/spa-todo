import styles from "./ProjectCard.module.scss";
import { useContext } from "react";
import { ProjectPageContext } from "../../routes/ProjectsPage";
import { useNavigate } from "react-router-dom";

export default function ProjectCard({ id, name }) {
  const context = useContext(ProjectPageContext);

  const navigate = useNavigate();

  const { setTitlePopup, setOpenedPopup, setProjectId, setProjectName } =
    context;
  const editHandleOnclick = (event) => {
    setTitlePopup(`Редактировать проект - ${name}`);
    setProjectId(id);
    setProjectName(name);
    setOpenedPopup(true);
  };

  const deleteHandleOnclick = (event) => {
    setTitlePopup(`Удалить проект - ${name}`);
    setProjectId(id);
    setProjectName(name);
    setOpenedPopup(true);
  };

  return (
    <div id={id} className={styles.ProjectCard}>
      <div className={styles.window}>
        <div className={styles.name}>
          <h3>{name}</h3>
          <button
            className={styles.edit}
            onClick={(event) => {
              event.stopPropagation();
              editHandleOnclick(event);
            }}
          >
            &#10000;
          </button>
        </div>

        <div className={styles.buttonPanel}>
          <button
            className={styles.navigate}
            onClick={() => {
              navigate(`/${id}/${name}`);
            }}
          >
            Перейти к задачам
          </button>
          <button
            className={styles.del}
            onClick={(event) => {
              event.stopPropagation();
              deleteHandleOnclick(event);
            }}
          >
            &#10006;
          </button>
        </div>
      </div>
    </div>
  );
}
