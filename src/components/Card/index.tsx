import Button from "../Button"
import style from './style.module.css'

type CardProps = {
  id: string
  title: string
  subtitle: string
  image: string
  desc: string
  actionLabel: string
  onClick: (data: string) => void
  isSelected?: boolean
}

const Card: React.FC<CardProps> = ({
  id,
  title,
  subtitle,
  image,
  desc,
  actionLabel,
  isSelected,
  onClick
}) => {
  return(
    <section
      className="flex flex-col w-full gap-2 p-3 border-1 border-solid rounded relative"
    >
      {
        isSelected && (
          <span className={`absolute p-1 ${style['label-selected']}`}>Selected</span>
        )
      }
      <img height='300' src={image} alt={desc}/>
      <div>
        <h2 className="mb-0">{title}</h2>
        <p className={`m-0 ${style['subtitle']}`}>{subtitle}</p>
      </div>
      <Button
        id={`action-${id}`}
        type="button"
        onClick={() => onClick(id)}
        className="mt-2"
      >
        {actionLabel}
      </Button>
    </section>
  )
}

export default Card