import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import styles from './Sorting.module.scss'
import { setCheapest, setFastest, setOptimal } from '../../actions/actions'

const Sorting = () => {
    const dispatch = useDispatch()
    const sorting = useSelector((state) => state.sorting)

    return (
        <div className={styles.sorting}>
            <button
                className={sorting === 'cheapest' ? styles.active : styles.button}
                onClick={() => dispatch(setCheapest())}
            >
                самый дешевый
            </button>
            <button
                className={sorting === 'fastest' ? styles.active : styles.button}
                onClick={() => dispatch(setFastest())}
            >
                самый быстрый
            </button>
            <button
                className={sorting === 'optimal' ? styles.active : styles.button}
                onClick={() => dispatch(setOptimal())}
            >
                оптимальный
            </button>
        </div>
    )
}

export default Sorting
