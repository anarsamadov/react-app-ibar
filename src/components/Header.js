import React, { Component } from 'react'
import Settings from '../constants'

class Header extends Component {
    render() {
        return (
            <div className="mb-3">
                <nav className="navbar navbar-light bg-light">
                    <a className="navbar-brand">
                        <img src={Settings.logo} alt="ibar logo" />
                    </a>
                </nav>
            </div>
        )
    }
}

export default Header;
