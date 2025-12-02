import styles from './Paragraph.css';

function Paragraph({ children, size = 'medium' }) {
  const className =
    size === 'large' ? styles.large : styles.medium;

  return <p className={className}>{children}</p>;
}

export default Paragraph;
