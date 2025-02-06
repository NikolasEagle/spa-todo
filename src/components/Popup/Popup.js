import styles from "./Popup.module.scss";

import { useContext, useEffect, useState } from "react";

import CreateProjectForm from "../CreateProjectForm/CreateProjectForm";
import { ProjectPageContext } from "../../routes/ProjectsPage";

export default function Popup({ opened, title }) {
  const context = useContext(ProjectPageContext);

  const { setOpenedPopup } = context;

  const [content, setContent] = useState();

  useEffect(() => {
    if (title === "Создать проект") {
      setContent(<CreateProjectForm />);
    }
  }, [content, opened, title]);

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
