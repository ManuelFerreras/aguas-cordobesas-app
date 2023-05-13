import React, { FC } from 'react'
import Image from 'next/image'

import styles from './Header.module.css'

interface HeaderProps {
  username: string
  welcomeMessage: string
}

const Header: FC<HeaderProps> = ({ username, welcomeMessage }) => {
  return (
    <header className={`${styles.header}`}>
      <p className={`${styles.headerMessage}`}>
        {welcomeMessage}, {username}
      </p>

      <Image
        src='img/header/LogoutIcon.svg'
        width={24}
        height={24}
        alt='Logout'
        className={`${styles.headerLogoutIcon}`}
      />
    </header>
  )
}

export default Header
export type { HeaderProps }
