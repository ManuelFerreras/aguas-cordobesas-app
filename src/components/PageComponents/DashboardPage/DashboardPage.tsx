'use client'
import ClientsTable from "@/components/CompositeComponents/ClientsTable/ClientsTable";
import Header from "@/components/CompositeComponents/Header/Header";
import React, { FC, useEffect, useState } from "react";
import styles from './DashboardPage.module.css'
import ClientPopup from "@/components/CompositeComponents/ClientPopup/ClientPopup";
import { Client } from "@/common/Types";
import { baseClientsUrl } from "@/lib/constants/urls";

const DashboardPage: FC = () => {
    const [showingClientsPopup, setShowingClientsPopup] = useState<boolean>(false)
    const [clients, setClients] = useState<Client[]>([])

    const togglePopup = () => {
        setShowingClientsPopup(!showingClientsPopup)
    }

    const fetchClients = async () => {
        const response = await fetch(baseClientsUrl, {
            next: {
                revalidate: 60
            }
        })
        const data = await response.json()

        if(!data?.clients) return
        setClients(data?.clients)
    }

    useEffect(() => {
        fetchClients()
    }, [])

    return(
        <main className={styles.main}>
            <Header username='User' welcomeMessage='Welcome' />

            <ClientsTable onClientRemoved={fetchClients} onAddButtonClick={togglePopup} clientsData={clients} />

            {
                showingClientsPopup && <ClientPopup onClientAdded={fetchClients} onClose={togglePopup} />
            }
        </main>
    )
};

export default DashboardPage;