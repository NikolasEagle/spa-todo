import styles from "./ProjectsPage.module.scss";

import { useEffect, useState } from "react";

import Header from "../components/Header/Header";
import Main from "../components/Main/Main";

import CreateProjectCard from "../components/CreateProjectCard/CreateProjectCard";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [openedPopup, setOpenedPopup] = useState(false);
  const [typePopup, setTypePopup] = useState("create_project_popup");

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
    <div className={styles.ProjectsPage}>
      <Header title={"Проекты"} />
      <Main content={projects} />
      <Popup opened={openedPopup} type={"create_project_card"} />
    </div>
  );
}
