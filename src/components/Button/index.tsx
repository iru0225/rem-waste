import style from './style.module.css'

type ButtonProps = {
  id: string
  variant?: 'primary' | 'danger'
  type: 'button' | 'submit'
  onClick?: () => void
  disabled?: boolean
  children?: React.ReactNode
  className?: string
}

const Button: React.FC<ButtonProps> = ({
  id,
  type,
  variant,
  children,
  disabled,
  className,
  onClick
}) => {
  return(
    <button
      id={id}
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`h-8 p-2 w-full border-0 rounded pointer ${style['custom-button']} ${variant === 'danger' ? style['danger'] : ''} ${className}`}
    >
      {children}
    </button>
  )
}

export default Button