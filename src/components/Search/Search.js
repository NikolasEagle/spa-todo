import { useContext, useEffect, useState } from "react";
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

  useEffect(() => {
    setQueueTasks(
      queueTasks.filter((queue) => {
        if (
          queue.props.name.slice(0, searchValue.length).toUpperCase() ===
          searchValue.toUpperCase()
        ) {
          return true;
        }
        if (
          String(queue.props.number)
            .slice(0, searchValue.length)
            .toUpperCase() === searchValue.toUpperCase()
        ) {
          return true;
        }
        return false;
      })
    );

    setDevelopmentTasks(
      developmentTasks.filter((development) => {
        if (
          development.props.name.slice(0, searchValue.length).toUpperCase() ===
          searchValue.toUpperCase()
        ) {
          return true;
        }
        if (
          String(development.props.number)
            .slice(0, searchValue.length)
            .toUpperCase() === searchValue.toUpperCase()
        ) {
          return true;
        }
        return false;
      })
    );

    setDoneTasks(
      doneTasks.filter((done) => {
        if (
          done.props.name.slice(0, searchValue.length).toUpperCase() ===
          searchValue.toUpperCase()
        ) {
          return true;
        }
        if (
          String(done.props.number)
            .slice(0, searchValue.length)
            .toUpperCase() === searchValue.toUpperCase()
        ) {
          return true;
        }
        return false;
      })
    );

    if (searchValue === "") {
      getTasks();
    }
  }, [searchValue]);

  return (
    <div className={styles.Search}>
      <input
        autoFocus
        onInput={(event) => {
          getTasks();
          setSearchValue(event.target.value);
        }}
        className={styles.search}
        placeholder="Поиск..."
        autoComplete="off"
      />
    </div>
  );
}
