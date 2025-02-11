import styles from "./TaskCard.module.scss";
import { useContext, useEffect } from "react";
import { TasksPageContext } from "../../routes/TasksPage";

const convertNum = (num) => (num < 10 ? `0${num}` : `${num}`);

export default function TaskCard({
  id,
  number,
  name,
  desc,
  creationDate,
  duration,
  endDate,
  priority,
  files,
  status,
  subTasks,
  comments,
}) {
  const context = useContext(TasksPageContext);

  const {
    setTitlePopup,
    setOpenedPopup,
    setTaskId,
    setTaskNumber,
    setTaskName,

    setDesc,
    setTaskCreationDate,

    setTaskDuration,

    setTaskEndDate,

    setTaskPriority,

    setFiles,

    setTaskStatus,

    setSubTasks,

    setComments,
  } = context;

  useEffect(() => {
    const tasks = document.querySelectorAll("draggable");

    for (let task of tasks) {
      task.addEventListener("dragstart", (event) => {
        localStorage.setItem("drag_id", event.target.id);
        localStorage.setItem("drag_status", event.target.dataset.status);
      });
    }
  });

  let intervalID;

  const editHandleOnclick = (event) => {
    setTitlePopup(`Редактировать задачу № ${number}`);
    setTaskId(id);
    setTaskNumber(number);
    setTaskName(name);
    setDesc(desc);
    setTaskCreationDate(creationDate);
    setTaskEndDate(endDate);
    setTaskPriority(priority);
    setFiles(files);
    setTaskStatus(status);
    setSubTasks(subTasks);
    setComments(comments);
    setOpenedPopup(true);
  };

  const deleteHandleOnclick = (event) => {
    setTitlePopup(`Удалить задачу № ${number}`);
    setTaskId(id);
    setTaskNumber(number);
    setTaskName(name);
    setDesc(desc);
    setTaskCreationDate(creationDate);
    setTaskEndDate(endDate);
    setTaskPriority(priority);
    setFiles(files);
    setTaskStatus(status);
    setSubTasks(subTasks);
    setComments(comments);
    setOpenedPopup(true);
  };
  return (
    <draggable
      id={id}
      data-status={status}
      draggable
      className={styles.TaskCard}
    >
      <div className={styles.top}>
        <h4>№ {number}</h4>
        <h5>
          {status === "В очереди" && (
            <span style={{ color: "#555" }}>&#9679;</span>
          )}
          {status === "В работе" && (
            <span style={{ color: "yellow" }}>&#9679;</span>
          )}
          {status === "Выполнено" && (
            <span style={{ color: "green" }}>&#9679;</span>
          )}{" "}
          {status}
        </h5>
      </div>

      <div className={styles.content}>
        <h5>{name}</h5>
      </div>
      <div className={styles.bottom}>
        <div className={styles.date}>
          <h6>{`${convertNum(new Date(creationDate).getHours())}:${convertNum(
            new Date(creationDate).getMinutes()
          )}:${convertNum(new Date(creationDate).getSeconds())} ${convertNum(
            new Date(creationDate).getDate()
          )}.${convertNum(new Date(creationDate).getMonth() + 1)}.${new Date(
            creationDate
          ).getFullYear()}`}</h6>
        </div>

        <div className={styles.buttonPanel}>
          <button
            className={styles.edit}
            onClick={(event) => {
              editHandleOnclick(event);
            }}
          >
            &#10000;
          </button>
          <button
            className={styles.del}
            onClick={(event) => {
              deleteHandleOnclick(event);
            }}
          >
            &#10006;
          </button>
        </div>
      </div>
    </draggable>
  );
}
