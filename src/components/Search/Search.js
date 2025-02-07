import { useContext, useState } from "react";
import styles from "./Search.module.scss";
import { TasksPageContext } from "../../routes/TasksPage";

import TaskCard from "../TaskCard/TaskCard";

export default function Search() {
  const context = useContext(TasksPageContext);

  const [searchValue, setSearchValue] = useState("");

  const {
    projectId,
    queueTasks,
    setQueueTasks,
    developmentTasks,
    setDevelopmentTasks,
    doneTasks,
    setDoneTasks,
    getTasks,
  } = context;

  function search(event) {
    setSearchValue(event.target.value);

    const projectsStorage = JSON.parse(localStorage.getItem("projects"));

    const currProject = projectsStorage.find(
      (project) => project.id === projectId
    );

    setQueueTasks(
      currProject.tasks.queue.map((queue) => (
        <TaskCard
          id={queue.id}
          number={queue.number}
          name={queue.name}
          desc={queue.desc}
          creationDate={queue.creationDate}
          duration={queue.duration}
          endDate={queue.endDate}
          priority={queue.priority}
          files={queue.files}
          status={queue.status}
          subTasks={queue.subTasks}
          comments={queue.comments}
        />
      ))
    );

    setDevelopmentTasks(
      currProject.tasks.development.map((development) => (
        <TaskCard
          id={development.id}
          number={development.number}
          name={development.name}
          desc={development.desc}
          creationDate={development.creationDate}
          duration={development.duration}
          endDate={development.endDate}
          priority={development.priority}
          files={development.files}
          status={development.status}
          subTasks={development.subTasks}
          comments={development.comments}
        />
      ))
    );
    setDoneTasks(
      currProject.tasks.done.map((done) => (
        <TaskCard
          id={done.id}
          number={done.number}
          name={done.name}
          desc={done.desc}
          creationDate={done.creationDate}
          duration={done.duration}
          endDate={done.endDate}
          priority={done.priority}
          files={done.files}
          status={done.status}
          subTasks={done.subTasks}
          comments={done.comments}
        />
      ))
    );

    setQueueTasks(
      queueTasks.filter((queue) => {
        if (
          new RegExp(searchValue, "g").test(queue.props.name) ||
          searchValue === ""
        ) {
          return true;
        }
        return false;
      })
    );

    setDevelopmentTasks(
      developmentTasks.filter(
        (development) =>
          String(development.props.number)
            .slice(0, searchValue.length)
            .toUpperCase() === searchValue.toUpperCase()
      )
    );

    setDoneTasks(
      doneTasks.filter(
        (done) =>
          String(done.props.number)
            .slice(0, searchValue.length)
            .toUpperCase() === searchValue.toUpperCase()
      )
    );
  }

  return (
    <div className={styles.Search}>
      <input
        value={searchValue}
        onChange={(event) => search(event)}
        className={styles.search}
        placeholder="Поиск..."
        autoComplete="off"
      />
    </div>
  );
}
