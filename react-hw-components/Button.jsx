import styles from './Button.css';

function Button({ children }) {
  return <button className={styles.button}>{children}</button>;
}

export default Button;
