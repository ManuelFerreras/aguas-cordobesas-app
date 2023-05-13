import React, { FC, ReactNode } from 'react'

import styles from './IconButton.module.css'

interface IconButtonProps {
  children: ReactNode,
  onClick: () => void
}

const IconButton: FC<IconButtonProps> = ({ children, onClick }) => {
  return <button onClick={onClick} className={`${styles.iconButton}`}>{children}</button>
}

export default IconButton
export type { IconButtonProps }
