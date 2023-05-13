import React, { FC, ReactNode } from 'react'

import styles from './IconButton.module.css'

interface IconButtonProps {
  children: ReactNode
}

const IconButton: FC<IconButtonProps> = ({ children }) => {
  return <button className={`${styles.iconButton}`}>{children}</button>
}

export default IconButton
export type { IconButtonProps }
