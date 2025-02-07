import styles from "./TaskCard.module.scss";
import { useContext } from "react";
import { TasksPageContext } from "../../routes/TasksPage";

export default function TaskCard({ id, number, name, status }) {
  const context = useContext(TasksPageContext);

  const { setTitlePopup, setOpenedPopup, setTaskId, setTaskName } = context;
  const editHandleOnclick = (event) => {
    setTitlePopup(`Редактировать задачу "${number}"`);
    setTaskId(id);
    setTaskName(name);
    setOpenedPopup(true);
  };

  const deleteHandleOnclick = (event) => {
    setTitlePopup(`Удалить задачу "${number}"`);
    setTaskId(id);
    setTaskName(name);
    setOpenedPopup(true);
  };

  return (
    <div id={id} className={styles.TaskCard}>
      <div className={styles.top}>
        <h4>{number}</h4>
        <h5>{status}</h5>
      </div>

      <div className={styles.content}>
        <h4>{name}</h4>
      </div>

      <div className={styles.buttonPanel}>
        <button>Редактировать</button>
        <button>Удалить</button>
      </div>
    </div>
  );
}
