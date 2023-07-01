import React, { FC } from 'react'
import Image from 'next/image'
import { Client, VariantEnum } from '@/common/Types'

import Button from '@/components/BaseComponents/Button/Button'
import IconButton from '@/components/BaseComponents/IconButton/IconButton'

import ClientCard from '../ClientCard/ClientCard'
import styles from './ClientsTable.module.css'
import { baseClientsUrl } from '@/lib/constants/urls'

interface ClientsTableProps {
  clientsData: Client[],
  onAddButtonClick: () => void,
  onClientRemoved: () => void
}

const ClientsTable: FC<ClientsTableProps> = ({ clientsData, onAddButtonClick, onClientRemoved }) => {
  const runAll = async () => {
    const agIds = clientsData.map(client => client.agId.toString())

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
    <>
      <h1 className={`${styles.clientsTableTitle}`}>Clients in DB</h1>

      <div className={`${styles.clientsTable}`}>
        {clientsData?.map((client, index) => {
          return (
            <ClientCard
              key={index}
              client={client}
              index={index + 1}
              onClientRemoved={onClientRemoved}
              variant={
                index % 2 === 0 ? VariantEnum.primary : VariantEnum.secondary
              }
            />
          )
        })}

        <IconButton onClick={onAddButtonClick} >
          <Image
            src={'img/icon/addIcon.svg'}
            width={24}
            height={24}
            alt='Add'
          />
        </IconButton>

        <div>
          <Button onClick={runAll} variant={VariantEnum.primary}>Run All</Button>
        </div>
      </div>
    </>
  )
}

export default ClientsTable
export type { ClientsTableProps }
