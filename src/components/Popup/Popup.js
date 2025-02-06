import styles from "./Popup.module.scss";

import { useEffect, useState } from "react";

import CreateProjectForm from "../CreateProjectForm/CreateProjectForm";

export default function Popup({ opened, title }) {
  const [content, setContent] = useState();

  useEffect(() => {
    if (title === "Создать проект") {
      setContent(<CreateProjectForm />);
    }
  }, [content]);

  return (
    <div hidden={false} className={styles.Popup}>
      <div className={styles.window}>
        <div className={styles.top}>
          <h3>{title}</h3>
          <button>Закрыть</button>
        </div>
        <div className={styles.content}>{content}</div>
      </div>
    </div>
  );
}
