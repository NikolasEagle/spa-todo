import styles from "./CreateTaskCard.module.scss";
import { useContext } from "react";
import { ProjectPageContext } from "../../routes/ProjectsPage";

export default function CreateTaskCard() {
  /*const context = useContext(ProjectPageContext);

  const { setTitlePopup, setOpenedPopup } = context;

  const handleOnclick = (event) => {
    setTitlePopup("Создать проект");

    setOpenedPopup(true);
  };*/

  return (
    <div
      /*onClick={(event) => handleOnclick(event)}*/
      tabIndex={0}
      className={styles.CreateTaskCard}
    >
      Создать задачу
    </div>
  );
}
