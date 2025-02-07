import styles from "./Main.module.scss";

export default function Main({ content, type }) {
  return type === "projects" ? (
    <div className={styles.Main}>{content}</div>
  ) : (
    <div className={styles.Main}>
      <div className={styles.tasks}>
        <div className={styles.queue}>
          <h4 className={styles.header_column}>В очереди</h4>
          {content.queue}
        </div>
        <div className={styles.development}>
          <h4 className={styles.header_column}>В работе</h4>
          {content.development}
        </div>
        <div className={styles.done}>
          <h4 className={styles.header_column}>Выполнено</h4>
          {content.done}
        </div>
      </div>
    </div>
  );
}
