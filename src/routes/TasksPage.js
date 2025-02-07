import styles from "./TasksPage.module.scss";

import Header from "../components/Header/Header";
import Search from "../components/Search/Search";
import Main from "../components/Main/Main";

import CreateTaskCard from "../components/CreateTaskCard/CreateTaskCard";

import { useParams } from "react-router-dom";
import { createContext, useEffect, useState } from "react";

export const TasksPageContext = createContext();

export default function TasksPage() {
  const { projectId, projectName } = useParams();

  const [queueTasks, setQueueTasks] = useState([]);

  const [developmentTasks, setDevelopmentTasks] = useState([]);

  const [doneTasks, setDoneTasks] = useState([]);

  async function getTasks() {
    try {
      const projects = JSON.parse(localStorage.getItem("projects"));

      const currProject = projects.find((project) => project.id === projectId);

      const tasks = currProject.tasks;

      console.log(tasks);

      setQueueTasks([<CreateTaskCard />, ...tasks.queue.map((queue) => queue)]);
      setDevelopmentTasks(tasks.development.map((development) => development));
      setDoneTasks(tasks.done.map((done) => done));
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <TasksPageContext.Provider value={getTasks}>
      <div className={styles.TasksPage}>
        <Header title={`Проект "${projectName}"`} />
        <Search />
        <Main
          content={{
            queue: queueTasks,
            development: developmentTasks,
            done: doneTasks,
          }}
          type={"tasks"}
        />
      </div>
    </TasksPageContext.Provider>
  );
}
