import { numberToCurrency } from "../../utils"
import Button from "../Button"
import style from './style.module.css'

type CardProps = {
  id: string
  title: string
  subtitle: string
  image: string
  desc: string
  actionLabel: string
  price: number
  vat: number
  onClick: (data: string) => void
  onRoad?: boolean
  heavyWaste?: boolean
  isSelected?: boolean
}

const Card: React.FC<CardProps> = ({
  id,
  title,
  subtitle,
  image,
  desc,
  actionLabel,
  price,
  vat,
  isSelected,
  onRoad,
  heavyWaste,
  onClick
}) => {
  return(
    <section
      className={
        `flex flex-col w-full gap-2 p-3 border-1 border-solid rounded relative ${style['card-container']} ${isSelected ? style['selected'] : ''}`
      }
    >
      {
        isSelected && (
          <span className={`absolute p-1 ${style['label-selected']}`}>Selected</span>
        )
      }
      <img style={{
        height: '150px',
        objectFit: 'cover'
      }} src={image} alt={desc}/>
      <div>
        <div className="flex items-center flex-wrap justify-between">
          <div className="flex flex-col">
            <h2 className="m-0">{title}</h2>
            <p className={`m-0 ${style['subtitle']}`}>{subtitle}</p>
          </div>
          <div className="flex flex-col gap-1">
            {!onRoad && (
              <span className={style['road-warning']}>Not allowed on road</span>
            )}
            {!heavyWaste && (
              <span className={style['heavy-warning']}>Not suitable for heavy waste</span>
            )}
          </div>
        </div>
        <h3
          className="m-0 mt-2"
          style={{
            color: 'var(--color-primary-800)'
          }}
        >
          Price {numberToCurrency.format(price)}
        </h3>
        <h4
          className="m-0"
          style={{
            color: 'var(--color-success-800)'
          }}
        >
          VAT {numberToCurrency.format(vat)}
        </h4>
      </div>
      <Button
        variant={isSelected ? 'danger' : 'primary'}
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