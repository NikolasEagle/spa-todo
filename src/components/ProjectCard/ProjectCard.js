import styles from "./ProjectCard.module.scss";

export default function ProjectCard({ name }) {
  return (
    <div className={styles.ProjectCard}>
      <div className={styles.window}>
        <h3>{name}</h3>
        <div className={styles.buttonPanel}>
          <button>Редактировать</button>
          <button>Удалить</button>
        </div>
      </div>
    </div>
  );
}
