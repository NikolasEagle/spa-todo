import styles from "./ProjectsPage.module.scss";

import { createContext, useEffect, useState } from "react";

import Header from "../components/Header/Header";
import Main from "../components/Main/Main";
import Popup from "../components/Popup/Popup";

import CreateProjectCard from "../components/CreateProjectCard/CreateProjectCard";

export const ProjectPageContext = createContext();

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [openedPopup, setOpenedPopup] = useState(false);
  const [titlePopup, setTitlePopup] = useState("Создать проект");

  async function getProjects() {
    try {
      const projectsStorage = localStorage.getItem("projects");
      if (projectsStorage) {
        setProjects([
          <CreateProjectCard />,
          ...JSON.parse(projectsStorage).map((project) => project),
        ]);
      } else {
        setProjects([<CreateProjectCard />]);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getProjects();
  }, [projects]);

  return (
    <ProjectPageContext.Provider
      value={{ setOpenedPopup, setTitlePopup, getProjects }}
    >
      <div className={styles.ProjectsPage}>
        <Header title={"Проекты"} />
        <Main content={projects} />
      </div>
      <Popup opened={openedPopup} title={titlePopup} />
    </ProjectPageContext.Provider>
  );
}
