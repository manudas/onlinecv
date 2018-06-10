import React, { Component } from 'react';

import './menu.css';

class Menu extends Component {
    constructor(props) {
        super(props);
    }

    jsUcfirst(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    renderMenuOptions() {
        return (
            <ul className="nav side-menu-nav">
                <li><a href="#intro"><i className="fa fa-angle-right"></i> Intro</a></li>
                {this.props.menuOptions ? 
                    this.props.menuOptions.map((option, index) => {
                        return (
                            <li>
                                <a
                                    href={`#${this.jsUcfirst(option)}`} >
                                    <i className="fa fa-angle-right"></i>
                                    {this.jsUcfirst(option)}
                                </a>
                            </li>
                        )
                    })
                    : '' 
                }
                <li><a href="#contact"><i className="fa fa-angle-right"></i> Contact</a></li>
            </ul>
        );
    }

    render() {
        {/* SIDE MENU
        ========================================================= */}
        return (
            [
                <div key='1' className="side-menu-open hidden-sm hidden-xs">
                    {/* Menu-button */}
                    <a href="#" className="btn btn-default side-menu-button"><i className="fa fa-bars"></i> MENU</a>
                {/* /menu-button */}
                </div>,
                /* Side Menu container */
                <div key='2' className="side-menu">
                    {/* close button */}
                    <span id="side-menu-close"><i className="fa fa-times"></i></span>
                    {/* /close button */}
                    {/* Menu header */}
                    <div className="side-menu-name">
                        {/* edit with your name */}
                        John <strong>Rex</strong>
                    {/* /edit with your name */}
                    </div>
                    {/* edit with your Job */}
                    <p className="side-menu-job">Designer / Web Developer</p>
                    {/* /edit with your job */}
                    {/* /Menu Header */}
                    {/* Main Navigation */}
                    <nav id="side-menu" className="side-menu-este">
                        {this.renderMenuOptions()}
                    </nav>
                    {/* /Main Navigation*/}
                    {/* Other Buttons */}
                    <div className="side-menu-buttons">
                        <a href="#" className="btn btn-side-menu"><i className="fa fa-download"></i> Download my resume</a>
                        <a href="#" className="btn btn-side-menu"><i className="fa fa-envelope-o"></i> Send me a message</a>
                    </div>
                {/* /Other Buttons*/}
            </div>
            /* /side menu container */
            ]
        );
        {/* /SIDE MENU
        ========================================================= */}
    }
}

export default Menu;