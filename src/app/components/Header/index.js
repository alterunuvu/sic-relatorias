import React from 'react'
import './header.scss'
import Logo_header from '../../../assets/icons/GOV.CO_Logo-whiteGOV.CO_Logo-white.png';

export default function Header() {
    return (
        <div className="header">
            <span className="header__brand">
                <img alt="Logo" src={Logo_header}></img>
            </span>
            <span className="header__link"><a className="a_header" href="https://www.sic.gov.co/">Ir a Gov.co</a></span>
        </div>
    )
}
