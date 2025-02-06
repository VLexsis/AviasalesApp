import React from 'react'

// Импорты компонентов
import Filters from '../Filters/Filters'
import Sorting from '../Sorting/Sorting'
import TicketList from '../TicketList/TicketList'

// Импорты стилей и изображений
import styles from './App.module.scss'
import logo from './img/Logo.svg'

const App = () => {
    return (
        <>
            <header className={styles.header}>
                <img src={logo} alt="Logo" className={styles.logo} />
            </header>
            <div className={styles.container}>
                <div className={styles.filters}>
                    <Filters />
                </div>
                <div className={styles.content}>
                    <Sorting />
                    <TicketList />
                </div>
            </div>
        </>
    )
}

export default App
