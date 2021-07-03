import React, { useEffect } from 'react'
import './result-card.scss'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import "react-circular-progressbar/dist/styles.css";
import Logo_fav from '../../../assets/icons/Favorite.png';

export default function ResultCard({ result, setSelectedResult, selectedResult }) {

    // !! Posible implementación del porcentaje
    const percentage = (result._score * 100).toFixed(1);

    useEffect(() => {
        console.log(result)
    }, [result])

    return (
        <>
            <div className={selectedResult._id === result._id ? "card active" : "card"} onClick={() => { setSelectedResult(result) }}>
                <div className="card__section1">
                    <div className="card__header">
                        <span className="card__title">{result._source.partes[0].nombre}</span>
                    </div>
                    <div className="card__info">
                        <span className="card__info-title">Fecha de Providencia:</span>
                        <span className="card__info-title">Tipo de proceso:</span>
                        <span className="card__info-value">{result._source.fecha_providencia}</span>
                        <span className="card__info-value">{result._source.tipo_proceso}</span>
                        <span className="card__info-title">Número de expediente:</span>
                        <span className="card__info-title">Tipo de providencia:</span>
                        <span className="card__info-value">{result._source.numero_expediente}</span>
                        <span className="card__info-value">{result._source.tipo_providencia}</span>
                    </div>
                </div>
                <div className="card__section2">
                    <div className="card__relevance">
                        <div className="card__circle-progress">
                            <CircularProgressbar
                                value={percentage}
                                text={`${percentage}%`}
                                styles={buildStyles({
                                    textColor: "#069169",
                                    pathColor: "#069169",
                                    trailColor: "#eaeaea",
                                    textSize: '23px',
                                    pathTransitionDuration: 0.2,
                                })}
                            />
                        </div>
                        <span className="card__relevance-label">Relevancia</span>
                    </div>
                    <div className="card__save">
                        <span><img alt="contact" src={Logo_fav}></img></span>
                        <span className="card__save-label">Guardar</span>
                    </div>
                </div>
            </div>
        </>
    )
}
