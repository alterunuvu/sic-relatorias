import React, { useEffect } from 'react'
import { URL_VISOR_RELATORIAS } from '../../backend/settings'
import './side-detail.scss'

export default function SideDetail({ selectedResult }) {

    useEffect(() => {
        //console.log(selectedResult)
    }, [selectedResult])

    return (
        <>
            {
                selectedResult &&
                <>
                    {
                        selectedResult.hasOwnProperty('_source') ?
                            <div className="side-detail">
                                <div className="side-detail__title"><span>Información general de la relatoría</span></div>
                                <div className="side-detail__actors">
                                    <div className="side-detail__implied">
                                        {selectedResult._source.partes.map(parte => {
                                            if (selectedResult._source.partes.indexOf(parte) !== selectedResult._source.partes.length - 1) {
                                                return `${parte.nombre} - `
                                            } else {
                                                return `${parte.nombre}`
                                            }
                                        })}
                                    </div>
                                    <div className="side-detail__document-details">
                                        <span className="side-detail__label">Fecha de providencia:</span>
                                        <span className="side-detail__value">{selectedResult._source.fecha_providencia}</span>
                                    </div>
                                    <div className="side-detail__document-details">
                                        <span className="side-detail__label">Número de expediente:</span>
                                        <span className="side-detail__value">{selectedResult._source.numero_expediente}</span>
                                    </div>
                                    <button onClick={(e) => window.location.href = `http://127.0.0.1:9000/visor-relatorias/XK4zbXYB67GntfvPb4cc/relatoria`} className="btn_secondary btn_secondary--margintop" style={{ marginBottom: '35px' }}>IR A RELATORIA</button>
                                </div>
                                <div style={{display: "none"}} className="side-detail__actors">
                                    <div className="side-detail__subtitle bigger">23 Coincidencias</div>
                                    <div className="side-detail__subtitle bigger">Futuro componente de coincidencias</div>
                                </div>
                                <div className="side-detail__document">
                                    <div className="side-detail__subtitle">RELATORÍA</div>
                                    <div className="side-detail__document-text">{selectedResult._source.contenido_archivo}</div>
                                </div>
                            </div>
                            :
                            <div>
                                Vacío por ahora
                            </div>
                    }
                </>
            }
        </>

    )
}
