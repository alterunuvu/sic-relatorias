import React from 'react'
import './loading-indicator.scss'

export default function LoadingIndicator({ loadingText }) {
    return (
        <div style={{textAlign: 'center'}}>
            <div className="lds-roller">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            {loadingText ? <div className="text_loading">{loadingText}</div> : <div className="text_loading">Cargando...</div>}
        </div>
    )
}
