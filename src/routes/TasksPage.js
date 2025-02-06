import styles from "./TasksPage.module.scss";

import Header from "../components/Header/Header";
import { useParams } from "react-router-dom";

export default function TasksPage() {
  const { projectId, projectName } = useParams();

  return (
    <div className={styles.TasksPage}>
      <Header title={`Проект "${projectName}"`} />
    </div>
  );
}
