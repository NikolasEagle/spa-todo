import styles from "./Popup.module.scss";

import { useContext, useEffect, useState } from "react";

import CreateProjectForm from "../CreateProjectForm/CreateProjectForm";
import EditProjectForm from "../EditProjectForm/EditProjectForm";
import { ProjectPageContext } from "../../routes/ProjectsPage";

export default function Popup({ opened, title, id }) {
  const context = useContext(ProjectPageContext);

  const { setOpenedPopup } = context;

  const [content, setContent] = useState();

  useEffect(() => {
    if (title === "Создать проект") {
      setContent(<CreateProjectForm />);
    } else if (/^Редактировать проект/g.test(title)) {
      setContent(<EditProjectForm id={id} />);
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
          <button onClick={() => setOpenedPopup(false)}>Закрыть</button>
        </div>
        <div className={styles.content}>{content}</div>
      </div>
    </div>
  );
}
