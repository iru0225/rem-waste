import style from './style.module.css'

type PillButtonProps = {
  id: string
  label: string
  onClick: (id:string, label: string) => void
  isSelected?: boolean
}

const PillButton: React.FC<PillButtonProps> = ({
  id,
  label,
  isSelected,
  onClick
}) => {
  return(
    <button
      id={id}
      className={
        `${style['pill-button']} ${isSelected ? style['selected'] : ''}`
      }
      onClick={() => onClick(id, label)}
    >
      {label}
    </button>
  )
}

export default PillButton