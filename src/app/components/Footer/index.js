import React from 'react'
import './footer.scss'
import Logo_redes from '../../../assets/icons/Redes_sociales.png';
import { useSelector } from 'react-redux';
import { getFooterStatus } from '../../store/selectors';

export default function Footer(props) {

    const footerState = useSelector(getFooterStatus);

    return (
        <>
            {footerState && <div className="footer">
                <div className="footer__info">
                    <span className="footer__title">LÍNEA DE ATENCIÓN AL CONSUMIDOR</span>
                    <span className="footer__label">Contact center</span>
                    <span className="footer__value">592 0400</span>
                    <span className="footer__label">Línea gratuita</span>
                    <span className="footer__value link">Presentación de PQRFS</span>
                </div>
                <div className="footer__info">
                    <span className="footer__title">CONMUTADOR</span>
                    <span className="footer__value no-margin-bottom">(571) 587 00 00 - Bogotá</span>
                    <span className="footer__label">Código Postal</span>
                    <span className="footer__value">110311</span>
                    <span className="footer__label">NIT</span>
                    <span className="footer__value">800176089 - 2</span>
                </div>
                <div className="footer__info">
                    <span className="footer__title">SEDE PRINCIPAL</span>
                    <span className="footer__value no-margin-bottom">Carrera 13 No. 27 - 00. Pisos 1y 3</span>
                    <span className="footer__label">Horario de Atención al Público</span>
                    <span className="footer__value">Lunes a Viernes de 8:00 a.m a 4:30 p.m</span>
                    <span className="footer__label">Correo Notificaciones Judiciales</span>
                    <span className="footer__value link">notificacionesjud@sic.gov.co</span>
                </div>
                <div className="footer__info">
                    <span className="footer__title">SÍGANOS</span>
                    <span className="footer__value no-margin-bottom">
                        <img alt="contact" src={Logo_redes}></img>
                    </span>
                </div>
            </div>}
        </>
    )
}
