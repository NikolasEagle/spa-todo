import styles from "./CreateProjectCard.module.scss";
import { useContext } from "react";
import { ProjectPageContext } from "../../routes/ProjectsPage";

export default function CreateProjectCard() {
  const context = useContext(ProjectPageContext);

  const { setTitlePopup, setOpenedPopup } = context;

  const handleOnclick = (event) => {
    setTitlePopup("Создать проект");

    setOpenedPopup(true);
  };

  return (
    <div
      onClick={(event) => handleOnclick(event)}
      tabIndex={0}
      className={styles.CreateProjectCard}
    >
      Создать проект
    </div>
  );
}
