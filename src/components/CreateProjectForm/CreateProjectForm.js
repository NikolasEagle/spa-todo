import styles from "./CreateProjectForm.module.scss";

export default function CreateProjectForm() {
  return (
    <form
      className={styles.CreateProjectForm}
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <input placeholder="Название проекта" autoComplete="off" required />
      <button>Создать</button>
    </form>
  );
}
