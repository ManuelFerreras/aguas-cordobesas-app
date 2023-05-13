import React from 'react'
import styles from './ClientPopup.module.css'
import Input from '@/components/BaseComponents/Input/Input'
import Button from '@/components/BaseComponents/Button/Button'
import { VariantEnum } from '@/common/Types'
import { preventNumbersLowerThanZero } from '@/lib/utils/utils'
import CloseButton from '@/components/BaseComponents/CloseButton/CloseButton'
import Image from 'next/image'
import { baseClientsUrl } from '@/lib/constants/urls'

interface ClientPopupProps {
    onClose: () => void,
    onClientAdded: () => void
}

const ClientPopup: React.FC<ClientPopupProps> = ({ onClose, onClientAdded }) => {
    const clientIdInputRef = React.useRef<HTMLInputElement>(null)

    const handleAddClient = async () => {
        const clientId = clientIdInputRef.current?.value
        if (!clientId) return

        const response = await fetch(`${baseClientsUrl}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ agId: clientId })
        })

        if (response.status === 200) {
            onClientAdded()
        }

        onClose()
    }

    return (
        <div className={styles.clientPopup}>
            <CloseButton onClick={onClose}><Image src={'./img/common/cross-icon.svg'} height={20} width={20} alt="Close" /></CloseButton>
            <h2 className={styles.clientPopupTitle}>Add a Client</h2>

            <Input inputRef={clientIdInputRef} legendContent={'Client Id'} variant={VariantEnum.primary} inputType={'number'} onChange={preventNumbersLowerThanZero} />

            <div className={styles.clientPopupActionButtons}>
                <Button onClick={onClose} variant={VariantEnum.secondary}>Cancel</Button>
                <Button onClick={handleAddClient} variant={VariantEnum.primary}>Add</Button>
            </div>
        </div>
    )
}

export default ClientPopup
export type { ClientPopupProps }