import style from './style.module.css'

type CheckboxType = {
  id: string
  name: string
  label: string
  checked?: boolean
  onChange?: (e: React.SyntheticEvent) => void
}

const Checkbox: React.FC<CheckboxType> = ({
  id,
  name,
  label,
  checked,
  onChange
}) => {
  return(
    <div className={style['form-group']}>
      <input type='checkbox' id={id} name={name} {...(checked ? { checked } : {})} onChange={onChange}/>
      <label htmlFor={id}>{label}</label>
    </div>
  )
}

export default Checkbox