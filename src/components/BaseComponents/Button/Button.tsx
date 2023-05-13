import React, { FC, ReactNode } from 'react'
import { Variant } from '@/common/Types'

import styles from './Button.module.css'

interface ButtonProps {
  children: ReactNode
  variant: Variant
  disabled?: boolean
  onClick?: () => void
}

const Button: FC<ButtonProps> = ({ children, variant, disabled, onClick }) => {
  return (
    <button
      className={`${styles.button} ${styles[variant]}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
export type { ButtonProps }
