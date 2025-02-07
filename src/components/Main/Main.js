import styles from "./Main.module.scss";

export default function Main({ content, type }) {
  return type === "projects" ? (
    <div className={styles.Main}>{content}</div>
  ) : (
    <div className={styles.Main}>
      <div className={styles.tasks}>
        <div className={styles.queue}>{content.queue}</div>
        <div className={styles.development}>{content.development}</div>
        <div className={styles.done}>{content.done}</div>
      </div>
    </div>
  );
}
