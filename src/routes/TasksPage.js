import styles from "./TasksPage.module.scss";

import Header from "../components/Header/Header";
import Search from "../components/Search/Search";
import Main from "../components/Main/Main";

import TaskCard from "../components/TaskCard/TaskCard";

import Popup from "../components/Popup/Popup";

import { useParams } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import CreateTaskCard from "../components/CreateTaskCard/CreateTaskCard";

export const TasksPageContext = createContext();

export default function TasksPage() {
  const { projectId, projectName } = useParams();

  const [queueTasks, setQueueTasks] = useState([]);

  const [developmentTasks, setDevelopmentTasks] = useState([]);

  const [doneTasks, setDoneTasks] = useState([]);

  const [openedPopup, setOpenedPopup] = useState(false);
  const [titlePopup, setTitlePopup] = useState("");
  const [taskId, setTaskId] = useState("");
  const [taskNumber, setTaskNumber] = useState("");
  const [taskName, setTaskName] = useState("");
  const [taskDesc, setDesc] = useState("");
  const [taskCreationDate, setTaskCreationDate] = useState("");
  const [taskDuration, setTaskDuration] = useState("");
  const [taskEndDate, setTaskEndDate] = useState("");
  const [taskPriority, setTaskPriority] = useState("");
  const [files, setFiles] = useState([]);
  const [taskStatus, setTaskStatus] = useState("");
  const [subTasks, setSubTasks] = useState([]);
  const [comments, setComments] = useState([]);

  async function getTasks() {
    try {
      const projects = JSON.parse(localStorage.getItem("projects"));

      const currProject = projects.find((project) => project.id === projectId);

      const tasks = currProject.tasks;
      setQueueTasks(
        tasks.queue.map((queue) => (
          <TaskCard
            id={queue.id}
            number={queue.number}
            name={queue.name}
            status={queue.status}
          />
        ))
      );
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
    <TasksPageContext.Provider
      value={{
        projectId,
        openedPopup,
        setOpenedPopup,
        titlePopup,
        setTitlePopup,
        taskId,
        setTaskId,
        taskNumber,
        setTaskNumber,
        taskName,
        setTaskName,
        taskDesc,
        setDesc,
        taskCreationDate,
        setTaskCreationDate,
        taskDuration,
        setTaskDuration,
        taskEndDate,
        setTaskEndDate,
        taskPriority,
        setTaskPriority,
        files,
        setFiles,
        taskStatus,
        setTaskStatus,
        subTasks,
        setSubTasks,
        comments,
        setComments,
        getTasks,
      }}
    >
      <div className={styles.TasksPage}>
        <Header title={`Проект "${projectName}"`} />
        <Search />
        <CreateTaskCard />
        <Main
          content={{
            queue: queueTasks,
            development: developmentTasks,
            done: doneTasks,
          }}
          type={"tasks"}
        />
      </div>
      <Popup
        opened={openedPopup}
        title={titlePopup}
        id={projectId}
        name={projectName}
        type={"tasks"}
      />
    </TasksPageContext.Provider>
  );
}
