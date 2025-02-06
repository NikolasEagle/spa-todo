import styles from "./ProjectsPage.module.scss";

import Header from "../components/Header/Header";

export default function ProjectsPage() {
  return (
    <div className={styles.ProjectsPage}>
      <Header title={"Проекты"} />
    </div>
  );
}
