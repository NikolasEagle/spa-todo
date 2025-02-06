import styles from "./Header.module.scss";

export default function Header({ title }) {
  return (
    <div className={styles.Header}>
      <h1>{title.toUpperCase()}</h1>
    </div>
  );
}
