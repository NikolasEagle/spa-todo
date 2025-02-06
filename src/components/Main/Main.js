import styles from "./Main.module.scss";

export default function Main({ content }) {
  return <div className={styles.Main}>{content}</div>;
}
