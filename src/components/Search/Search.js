import styles from "./Search.module.scss";

export default function Search({}) {
  return (
    <div className={styles.Search}>
      <input
        className={styles.search}
        placeholder="Поиск..."
        autoComplete="off"
      />
    </div>
  );
}
