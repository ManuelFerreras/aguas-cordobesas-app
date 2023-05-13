import React, { FC } from 'react'
import Image from 'next/image'
import { Client, VariantEnum } from '@/common/Types'

import Button from '@/components/BaseComponents/Button/Button'
import IconButton from '@/components/BaseComponents/IconButton/IconButton'

import ClientCard from '../ClientCard/ClientCard'
import styles from './ClientsTable.module.css'

interface ClientsTableProps {
  clientsData: Client[]
}

const ClientsTable: FC<ClientsTableProps> = ({ clientsData }) => {
  return (
    <>
      <h1 className={`${styles.clientsTableTitle}`}>Clients in DB</h1>

      <div className={`${styles.clientsTable}`}>
        {clientsData.map((client, index) => {
          return (
            <ClientCard
              key={index}
              client={client}
              variant={
                index % 2 === 0 ? VariantEnum.primary : VariantEnum.secondary
              }
            />
          )
        })}

        <IconButton>
          <Image
            src={'img/icon/addIcon.svg'}
            width={24}
            height={24}
            alt='Add'
          />
        </IconButton>

        <div>
          <Button variant={VariantEnum.primary}>Run All</Button>
        </div>
      </div>
    </>
  )
}

export default ClientsTable
export type { ClientsTableProps }
