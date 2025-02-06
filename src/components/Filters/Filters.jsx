import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { setAll, setNonstop, setOneTransfer, setTwoTransfers, setThreeTransfers, setNone } from '../../actions/actions'
import styles from './Filters.module.scss'
import { fetchSearchId } from '../../api/api' // Исправленный импорт

const Filters = () => {
    const dispatch = useDispatch()
    const { status } = useSelector((state) => state.search)
    const filters = useSelector((state) => state.filters)

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchSearchId())
        }
    }, [status, dispatch])

    const handleAllChange = () => {
        if (filters.all) {
            dispatch(setNone())
        } else {
            dispatch(setAll())
        }
    }

    const handleNonstopChange = () => {
        dispatch(setNonstop())
    }

    const handleOneTransferChange = () => {
        dispatch(setOneTransfer())
    }

    const handleTwoTransfersChange = () => {
        dispatch(setTwoTransfers())
    }

    const handleThreeTransfersChange = () => {
        dispatch(setThreeTransfers())
    }

    return (
        <div className={styles.filters}>
            <h4 className={styles.title}>Количество пересадок</h4>
            <div className={styles.checkboxGroup}>
                <label className={styles.label}>
                    <input type="checkbox" checked={filters.all} onChange={handleAllChange} />
                    Все
                </label>
                <label className={styles.label}>
                    <input type="checkbox" checked={filters.nonStop} onChange={handleNonstopChange} />
                    Без пересадок
                </label>
                <label className={styles.label}>
                    <input type="checkbox" checked={filters.oneTransfer} onChange={handleOneTransferChange} />1
                    пересадка
                </label>
                <label className={styles.label}>
                    <input type="checkbox" checked={filters.twoTransfers} onChange={handleTwoTransfersChange} />2
                    пересадки
                </label>
                <label className={styles.label}>
                    <input type="checkbox" checked={filters.threeTransfers} onChange={handleThreeTransfersChange} />3
                    пересадки
                </label>
            </div>
        </div>
    )
}

export default Filters
