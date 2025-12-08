function Input({ placeholder, icon, type = 'text', value, onChange }) {
  return (
    <div className={`input ${icon ? 'input_with-icon' : ''}`}>
      {icon && <span className="input__icon">{icon}</span>}
      <input
        className="input__field"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default Input;