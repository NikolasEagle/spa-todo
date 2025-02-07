import { useContext, useEffect, useState } from "react";
import styles from "./EditProjectForm.module.scss";
import { ProjectPageContext } from "../../routes/ProjectsPage";

export default function EditProjectForm({ id }) {
  const context = useContext(ProjectPageContext);

  const { setOpenedPopup, projectName, getProjects } = context;

  const [value, setValue] = useState(projectName);

  useEffect(() => {
    setValue(projectName);
  }, [projectName]);

  async function editProject(event) {
    event.preventDefault();

    const projectsStorage = JSON.parse(localStorage.getItem("projects"));

    localStorage.setItem(
      "projects",
      JSON.stringify(
        projectsStorage.map((project) => {
          if (project.id === id) {
            project.name = new FormData(event.target).get("name");
          }

          return project;
        })
      )
    );

    setOpenedPopup(false);

    setValue("");

    getProjects();

    event.target.reset();
  }

  return (
    <form
      className={styles.EditProjectForm}
      onSubmit={(event) => {
        editProject(event);
      }}
    >
      <input
        value={value}
        onChange={(event) => setValue(event.target.value)}
        name="name"
        placeholder="Название проекта"
        autoComplete="off"
        required
      />
      <button type="submit">Сохранить</button>
    </form>
  );
}
