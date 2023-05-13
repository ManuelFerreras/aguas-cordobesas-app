import { clients } from '@/common/hardocde'

import ClientsTable from '@/components/CompositeComponents/ClientsTable/ClientsTable'
import Header from '@/components/CompositeComponents/Header/Header'

import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <Header username='User' welcomeMessage='Welcome' />

      <ClientsTable clientsData={clients} />
    </main>
  )
}
