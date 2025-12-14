import styles from './Input.module.css'

function Input({ placeholder, icon, type = 'text', value, onChange, onKeyDown }) {
  return (
    <div className={`${styles.input} ${icon ? styles.input_withIcon : ''}`}>
      {icon && <span className={styles.input__icon}>{icon}</span>}
      <input
        className={styles.input__field}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
    </div>
  );
}

export default Input;