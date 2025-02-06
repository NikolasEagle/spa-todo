import { useContext } from "react";
import styles from "./DeleteProjectForm.module.scss";
import { ProjectPageContext } from "../../routes/ProjectsPage";

export default function DeleteProjectForm({ id }) {
  const context = useContext(ProjectPageContext);

  const { setOpenedPopup, projectName, getProjects } = context;

  async function deleteProject(event) {
    event.preventDefault();

    const projectsStorage = JSON.parse(localStorage.getItem("projects"));

    localStorage.setItem(
      "projects",
      JSON.stringify(
        projectsStorage.filter((project) => {
          return project.id !== id;
        })
      )
    );

    setOpenedPopup(false);

    getProjects();
  }

  return (
    <form
      className={styles.DeleteProjectForm}
      onSubmit={(event) => {
        deleteProject(event);
      }}
    >
      <button type="submit">Да</button>
    </form>
  );
}
