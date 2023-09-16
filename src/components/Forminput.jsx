const Forminput = ({ label, name, type, defaultValue, size }) => {
  return (
    <div className='form-control w-full max-w-xs'>
      <label className='label'>
        <span className='label-text capitalize'>{label}</span>
      </label>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue}
        className={`input input-bordered ${size}`}
      />
    </div>
  );
};
export default Forminput;
