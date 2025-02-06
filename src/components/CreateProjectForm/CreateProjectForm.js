import { useContext } from "react";
import styles from "./CreateProjectForm.module.scss";
import { ProjectPageContext } from "../../routes/ProjectsPage";

import { nanoid } from "nanoid";

export default function CreateProjectForm() {
  const context = useContext(ProjectPageContext);

  const { setOpenedPopup, getProjects } = context;

  async function createProject(event) {
    event.preventDefault();

    const projectsStorage = JSON.parse(localStorage.getItem("projects"));

    localStorage.setItem(
      "projects",
      JSON.stringify([
        {
          id: nanoid(),

          name: new FormData(event.target).get("name"),
        },
        ...projectsStorage,
      ])
    );

    setOpenedPopup(false);

    getProjects();
  }

  return (
    <form
      className={styles.CreateProjectForm}
      onSubmit={(event) => {
        createProject(event);
      }}
    >
      <input
        name="name"
        placeholder="Название проекта"
        autoComplete="off"
        required
      />
      <button type="submit">Создать</button>
    </form>
  );
}
