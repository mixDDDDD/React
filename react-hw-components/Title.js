import styles from './Title.css';

function Title({ children }) {
  return <h1 className={styles.title}>{children}</h1>;
}

export default Title;
