import React from 'react'
import PropTypes from 'prop-types'
import { add, format } from 'date-fns'

import styles from './Ticket.module.scss'

const Ticket = ({ ticket }) => {
    return (
        <div className={styles.ticket}>
            <div className={styles.header}>
                <span className={styles.price}>{ticket.price} Р</span>
                <img src={`//pics.avs.io/99/36/${ticket.carrier}.png`} alt="Carrier Logo" />
            </div>
            <div className={styles.details}>
                {ticket.segments.map((segment, index) => {
                    const startDate = new Date(segment.date)
                    const endDate = add(startDate, { minutes: segment.duration })
                    const formattedStartTime = format(startDate, 'HH:mm')
                    const formattedEndTime = format(endDate, 'HH:mm')

                    return (
                        <div key={index} className={styles.segment}>
                            <div>
                                <span>
                                    {segment.origin} – {segment.destination}
                                </span>
                                <span>
                                    {formattedStartTime} – {formattedEndTime}
                                </span>
                            </div>
                            <div>
                                <span>В ПУТИ</span>
                                <span>
                                    {Math.floor(segment.duration / 60)}ч {segment.duration % 60}м
                                </span>
                            </div>
                            <div>
                                <span>
                                    {segment.stops.length} ПЕРЕСАД
                                    {segment.stops.length > 1 ? 'КИ' : segment.stops.length > 0 ? 'КА' : 'ОК'}
                                </span>
                                <span>{segment.stops.join(', ')}</span>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

Ticket.propTypes = {
    ticket: PropTypes.shape({
        price: PropTypes.number.isRequired,
        carrier: PropTypes.string.isRequired,
        segments: PropTypes.arrayOf(
            PropTypes.shape({
                date: PropTypes.string.isRequired,
                origin: PropTypes.string.isRequired,
                destination: PropTypes.string.isRequired,
                duration: PropTypes.number.isRequired,
                stops: PropTypes.arrayOf(PropTypes.string).isRequired,
            })
        ).isRequired,
    }).isRequired,
}

export default Ticket
