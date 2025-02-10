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
    <div
      id={id}
      className={styles.ProjectCard}
      onClick={() => {
        navigate(`/${id}/${name}`);
      }}
      tabIndex={0}
    >
      <div className={styles.window}>
        <div className={styles.name}>
          <h3>
            Проект <span>{name}</span>
          </h3>
        </div>

        <div className={styles.buttonPanel}>
          <button
            onClick={(event) => {
              event.stopPropagation();
              editHandleOnclick(event);
            }}
          >
            Редактировать
          </button>
          <button
            onClick={(event) => {
              event.stopPropagation();
              deleteHandleOnclick(event);
            }}
          >
            Удалить
          </button>
        </div>
      </div>
    </div>
  );
}
