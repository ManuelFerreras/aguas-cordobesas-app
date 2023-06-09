import React, { FC } from 'react'
import { Client, Variant, VariantEnum } from '@/common/Types'

import Button from '@/components/BaseComponents/Button/Button'
import LegendLabel from '@/components/BaseComponents/LegendLabel/LegendLabel'

import styles from './ClientCard.module.css'
import { baseClientsUrl } from '@/lib/constants/urls'
import { formatTextMaxLength } from '@/lib/utils/utils'

interface ClientCardProps {
  client: Client
  variant: Variant
  onClientRemoved: () => void
  index: number
}

const ClientCard: FC<ClientCardProps> = ({ client, variant, onClientRemoved, index }) => {
  const deleteClient = async () => {
    const deleteClientId = client?.agId
    console.log('deleteClientId', deleteClientId)

    const urlParams = new URLSearchParams({
      agId: deleteClientId.toString()
    })

    const result = await fetch(`${baseClientsUrl}?${urlParams}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    })

    if(result.status === 200) {
      onClientRemoved()
    }
  }

  const runClient = async () => {
    const runClientId = client?.agId
    console.log('runClientId', runClientId)

    const agIds = [runClientId.toString()]

    const result = await fetch(`${baseClientsUrl}/facturacion`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ agIds })
    })

    if(result.status === 200) {
      onClientRemoved()
    }
  }

  return (
    <div className={`${styles.clientCard} ${styles[variant]}`}>
      <div className={`${styles.clientCardColumn}`}>
        <LegendLabel variant={VariantEnum.primary}>#</LegendLabel>
        <LegendLabel variant={VariantEnum.secondary}>
          {index.toString()}
        </LegendLabel>
      </div>

      <div className={`${styles.clientCardColumn}`}>
        <LegendLabel variant={VariantEnum.primary}>Name</LegendLabel>
        <LegendLabel variant={VariantEnum.secondary}>{formatTextMaxLength(client?.name, 12)}</LegendLabel>
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
        <Button onClick={runClient} variant={VariantEnum.primary}>run</Button>
        <Button onClick={deleteClient} variant={VariantEnum.secondary}>delete</Button>
      </div>
    </div>
  )
}

export default ClientCard
export type { ClientCardProps }
