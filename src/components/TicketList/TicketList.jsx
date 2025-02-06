import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Ticket from '../Ticket/Ticket'
import styles from './TicketList.module.scss'
import { fetchSearchId, fetchTickets } from '../../api/api'
import { clearTickets } from '../../actions/actions'

const TicketList = () => {
    const dispatch = useDispatch()
    const { searchId, status, stop, tickets, error } = useSelector((state) => state.search)
    const filters = useSelector((state) => state.filters)
    const sorting = useSelector((state) => state.sorting.sorting)

    const [visibleTickets, setVisibleTickets] = useState(5)

    // Функция для проверки, активен ли хотя бы один фильтр
    const areFiltersActive = (filters) => {
        return filters.all || filters.nonStop || filters.oneTransfer || filters.twoTransfers || filters.threeTransfers
    }

    // Эффект для получения searchId
    useEffect(() => {
        if (status === 'idle' && areFiltersActive(filters)) {
            dispatch(fetchSearchId())
        }
    }, [status, dispatch, filters])

    // Эффект для загрузки билетов
    useEffect(() => {
        if (searchId && (status === 'succeeded' || status === 'loading_more') && !stop && areFiltersActive(filters)) {
            const fetchMoreTickets = async () => {
                try {
                    await dispatch(fetchTickets({ searchId })).unwrap()
                } catch (error) {
                    console.error('Failed to fetch tickets:', error)
                }
            }

            fetchMoreTickets()
        }
    }, [searchId, status, stop, dispatch, filters])

    // Эффект для очистки билетов, если все фильтры отключены
    useEffect(() => {
        if (!areFiltersActive(filters)) {
            dispatch(clearTickets()) // Очищаем билеты
        }
    }, [filters, dispatch])

    // Функция для фильтрации билетов по общему количеству пересадок
    const filterTickets = (tickets, filters) => {
        return tickets.filter((ticket) => {
            // Считаем общее количество пересадок для билета
            const totalStops = ticket.segments.reduce((acc, segment) => acc + segment.stops.length, 0)

            // Фильтруем билеты на основе общего количества пересадок
            return (
                (filters.nonStop && totalStops === 0) ||
                (filters.oneTransfer && totalStops === 1) ||
                (filters.twoTransfers && totalStops === 2) ||
                (filters.threeTransfers && totalStops === 3)
            )
        })
    }

    // Функция для сортировки билетов
    const sortTickets = (tickets, sorting) => {
        switch (sorting) {
            case 'cheapest':
                return tickets.sort((a, b) => a.price - b.price)
            case 'fastest':
                return tickets.sort((a, b) => {
                    const durationA = a.segments.reduce((acc, segment) => acc + segment.duration, 0)
                    const durationB = b.segments.reduce((acc, segment) => acc + segment.duration, 0)
                    return durationA - durationB
                })
            case 'optimal':
                // Оптимальная сортировка может быть комбинацией цены и времени
                return tickets.sort((a, b) => {
                    const scoreA = a.price + a.segments.reduce((acc, segment) => acc + segment.duration, 0)
                    const scoreB = b.price + b.segments.reduce((acc, segment) => acc + segment.duration, 0)
                    return scoreA - scoreB
                })
            default:
                return tickets
        }
    }

    const filteredTickets = sortTickets(filterTickets(tickets, filters), sorting)
    const visibleFilteredTickets = filteredTickets.slice(0, visibleTickets)

    const showMoreTickets = () => {
        setVisibleTickets((prev) => prev + 5)
    }

    return (
        <div>
            <ul className={styles.ticketsContainer}>
                {visibleFilteredTickets.length > 0 ? (
                    visibleFilteredTickets.map((ticket, index) => (
                        <Ticket key={`${ticket.id}-${index}`} ticket={ticket} />
                    ))
                ) : (
                    <p className={styles.messageNotFound}>Рейсов, подходящих под заданные фильтры, не найдено</p>
                )}
            </ul>
            {status === 'loading_more' && <div className={styles.loader}>Loading more tickets...</div>}
            {status === 'failed' && <div className={styles.error}>Error: {error}</div>}
            {visibleTickets < filteredTickets.length && (
                <button className={styles.buttonShowMore} onClick={showMoreTickets}>
                    Показать еще 5 билетов!
                </button>
            )}
        </div>
    )
}

export default TicketList
