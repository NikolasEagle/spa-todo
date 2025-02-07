import styles from "./TaskCard.module.scss";
import { useContext } from "react";
import { TasksPageContext } from "../../routes/TasksPage";

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
  const editHandleOnclick = (event) => {
    setTitlePopup(`Редактировать задачу "${number}"`);
    setTaskId(id);
    setTaskNumber(number);
    setTaskName(name);
    setDesc(desc);
    setTaskCreationDate(creationDate);
    setTaskDuration(duration);
    setTaskEndDate(endDate);
    setTaskPriority(priority);
    setFiles(files);
    setTaskStatus(status);
    setSubTasks(subTasks);
    setComments(comments);
    setOpenedPopup(true);
  };

  const deleteHandleOnclick = (event) => {
    setTitlePopup(`Удалить задачу "${number}"`);
    setTaskId(id);
    setTaskNumber(number);
    setTaskName(name);
    setDesc(desc);
    setTaskCreationDate(creationDate);
    setTaskDuration(duration);
    setTaskEndDate(endDate);
    setTaskPriority(priority);
    setFiles(files);
    setTaskStatus(status);
    setSubTasks(subTasks);
    setComments(comments);
    setOpenedPopup(true);
  };

  return (
    <div id={id} className={styles.TaskCard}>
      <div className={styles.top}>
        <h4>№ {number}</h4>
        <h5>{status}</h5>
      </div>

      <div className={styles.content}>
        <h5>{name}</h5>
      </div>

      <div className={styles.buttonPanel}>
        <button
        /*onClick={(event) => {
            editHandleOnclick;
          }}*/
        >
          Редактировать
        </button>
        <button
        /*onClick={(event) => {
            deleteHandleOnclick;
          }}*/
        >
          Удалить
        </button>
      </div>
    </div>
  );
}
