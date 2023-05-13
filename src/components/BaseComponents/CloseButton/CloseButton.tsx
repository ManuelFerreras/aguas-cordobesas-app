import React from 'react'
import styles from './CloseButton.module.css'

interface CloseButtonProps {
    onClick: () => void
    children: React.ReactNode
}

const CloseButton: React.FC<CloseButtonProps> = ({ onClick, children }) => {
    return (
        <button className={`${styles.closeButton}`} onClick={onClick}>
            {children}
        </button>
    )
}

export default CloseButton
export type { CloseButtonProps }