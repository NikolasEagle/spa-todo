import styles from "./ProjectsPage.module.scss";

import { createContext, useEffect, useState } from "react";

import Header from "../components/Header/Header";
import Main from "../components/Main/Main";
import Popup from "../components/Popup/Popup";

import CreateProjectCard from "../components/CreateProjectCard/CreateProjectCard";
import ProjectCard from "../components/ProjectCard/ProjectCard";

export const ProjectPageContext = createContext();

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [openedPopup, setOpenedPopup] = useState(false);
  const [titlePopup, setTitlePopup] = useState("");
  const [projectId, setProjectId] = useState("");
  const [projectName, setProjectName] = useState("");

  async function getProjects() {
    try {
      const projectsStorage = localStorage.getItem("projects");
      if (!projectsStorage) {
        localStorage.setItem("projects", JSON.stringify([]));
      }
      setProjects([
        <CreateProjectCard />,
        ...JSON.parse(projectsStorage).map((project) => (
          <ProjectCard id={project.id} name={project.name} />
        )),
      ]);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <ProjectPageContext.Provider
      value={{
        setOpenedPopup,
        setTitlePopup,
        setProjectId,
        setProjectName,
        projectName,
        getProjects,
      }}
    >
      <div className={styles.ProjectsPage}>
        <Header title={"Проекты"} />
        <Main content={projects} type={"projects"} />
      </div>
      <Popup
        opened={openedPopup}
        title={titlePopup}
        id={projectId}
        name={projectName}
      />
    </ProjectPageContext.Provider>
  );
}
