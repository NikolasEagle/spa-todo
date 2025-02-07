import styles from "./CreateTaskCard.module.scss";
import { useContext } from "react";
import { TasksPageContext } from "../../routes/TasksPage";

export default function CreateTaskCard() {
  const context = useContext(TasksPageContext);

  const { setTitlePopup, setOpenedPopup } = context;

  const handleOnclick = (event) => {
    setTitlePopup("Создать задачу");

    setOpenedPopup(true);
  };

  return (
    <div
      onClick={(event) => handleOnclick(event)}
      tabIndex={0}
      className={styles.CreateTaskCard}
    >
      Создать задачу
    </div>
  );
}
