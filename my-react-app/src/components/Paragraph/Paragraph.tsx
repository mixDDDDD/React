import styles from './Paragraph.module.css';

type ParagraphProps = { 
  children: React.ReactNode
  size?: 'medium' | 'large'
}

function Paragraph({ children, size = 'medium' }: ParagraphProps) {
  const className =
    size === 'large' ? styles.large : styles.medium;

  return <p className={className}>{children}</p>;
}

export default Paragraph;
