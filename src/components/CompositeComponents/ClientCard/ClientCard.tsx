import React, { FC } from 'react'
import { Client, Variant, VariantEnum } from '@/common/Types'

import Button from '@/components/BaseComponents/Button/Button'
import LegendLabel from '@/components/BaseComponents/LegendLabel/LegendLabel'

import styles from './ClientCard.module.css'
import { baseClientsUrl } from '@/lib/constants/urls'

interface ClientCardProps {
  client: Client
  variant: Variant
  onClientRemoved: () => void
}

const ClientCard: FC<ClientCardProps> = ({ client, variant, onClientRemoved }) => {
  const deleteClient = () => {
    const deleteClientId = client?.agId
    console.log('deleteClientId', deleteClientId)

    const result = fetch(`${baseClientsUrl}/${deleteClientId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    })

    onClientRemoved()
  }

  return (
    <div className={`${styles.clientCard} ${styles[variant]}`}>
      <div className={`${styles.clientCardColumn}`}>
        <LegendLabel variant={VariantEnum.primary}>#</LegendLabel>
        <LegendLabel variant={VariantEnum.secondary}>
          {client?.id?.toString()}
        </LegendLabel>
      </div>

      <div className={`${styles.clientCardColumn}`}>
        <LegendLabel variant={VariantEnum.primary}>Name</LegendLabel>
        <LegendLabel variant={VariantEnum.secondary}>{client?.name}</LegendLabel>
      </div>

      <div className={`${styles.clientCardColumn}`}>
        <LegendLabel variant={VariantEnum.primary}>AG ID</LegendLabel>
        <LegendLabel variant={VariantEnum.secondary}>
          {client?.agId?.toString()}
        </LegendLabel>
      </div>

      <div className={`${styles.clientCardColumn}`}>
        <LegendLabel variant={VariantEnum.primary}>Ultima Deuda</LegendLabel>
        <LegendLabel variant={VariantEnum.secondary}>
          {client?.ultimaDeuda}
        </LegendLabel>
      </div>

      <div className={`${styles.clientCardColumn}`}>
        <LegendLabel variant={VariantEnum.primary}>Ultimo Periodo</LegendLabel>
        <LegendLabel variant={VariantEnum.secondary}>
          {client?.utlimoPeriodo}
        </LegendLabel>
      </div>

      <div className={`${styles.clientCardColumn}`}>
        <LegendLabel variant={VariantEnum.primary}>
          Vto. Ultimo Periodo
        </LegendLabel>
        <LegendLabel variant={VariantEnum.secondary}>
          {client?.vtoUltimoPeriodo}
        </LegendLabel>
      </div>

      <div className={`${styles.clientCardActionButtons}`}>
        <Button variant={VariantEnum.primary}>run</Button>
        <Button onClick={deleteClient} variant={VariantEnum.secondary}>delete</Button>
      </div>
    </div>
  )
}

export default ClientCard
export type { ClientCardProps }
