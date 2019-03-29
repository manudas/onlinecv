import React, { Component, Fragment } from "react";

import { connect } from 'react-redux';

import "./menu.css";

class Menu extends Component {
    constructor(props) {
		super(props);
		this.state = 
				{
					menu: 'closed',
					initialState: true
				}
		this.onMouseEnter = this._onMouseEnter.bind(this);
		this.closeMenu = this._closeMenu.bind(this);
	}
	
	_closeMenu(event) {
		this.setState(
			{
				menu: 'closed',
				initialState: false
			}
		);
	}

	_onMouseEnter(event) {
		this.setState(
			{
				menu: 'opened',
				initialState: false
			}
		);
	}

    renderMenuButton() {
        return (
            <div className="side-menu-open hidden-sm hidden-xs" onMouseEnter={this.onMouseEnter}>
                {/*<!-- Menu-button -->*/}
                <a href="#" className="btn btn-default side-menu-button">
                    <i className="fa fa-bars" /> MENU
                </a>
                {/*<!-- /menu-button -->*/}
            </div>
        );
	}
	
	getSideMenuOpenedStateClass(){
		return this.state.menu === 'opened' ? 
											'side-menu-open_hover' : 
											(
												this.state.initialState ? 
													'' : 
													'side-menu-close-animation'
											);
	}

    render() {
		if (!this.props.data_is_loaded) {
			return null;
		}
        /*-- SIDE MENU
		========================================================= */
        return (
            <Fragment>
                {this.renderMenuButton()}
                {/*<!-- Side Menu container -->*/}
                <div className={"side-menu " + this.getSideMenuOpenedStateClass()}>
                    {/*<!-- close button -->*/}
                    <span id="side-menu-close" onClick={this.closeMenu}>
                        <i className="fa fa-times" />
                    </span>
                    {/*<!-- /close button -->*/}

                    {/*<!-- Menu header -->*/}
                    <div className="side-menu-name">
                        {/*<!-- edit with your name -->*/}
                        John <strong>Rex</strong>
                        {/*<!-- /edit with your name -->*/}
                    </div>
                    {/*<!-- edit with your Job -->*/}
                    <p className="side-menu-job">Designer / Web Developer</p>
                    {/*<!-- /edit with your job -->*/}
                    {/*<!-- /Menu Header -->*/}

                    {/*<!-- Main Navigation -->*/}
                    <nav id="side-menu" className="side-menu-este">
                        <ul className="nav side-menu-nav">
                            <li>
                                <a href="#intro">
                                    <i className="fa fa-angle-right" /> Intro
                                </a>
                            </li>
                            <li>
                                <a href="#education">
                                    <i className="fa fa-angle-right" /> Education
                                </a>
                            </li>
                            <li>
                                <a href="#works">
                                    <i className="fa fa-angle-right" /> Work
                                    Experience
                                </a>
                            </li>
                            <li>
                                <a href="#skills">
                                    <i className="fa fa-angle-right" /> Skills
                                </a>
                            </li>
                            <li>
                                <a href="#interests">
                                    <i className="fa fa-angle-right" /> Interests
                                </a>
                            </li>
                            <li>
                                <a href="#portfolio">
                                    <i className="fa fa-angle-right" /> Portfolio
                                </a>
                            </li>
                            <li>
                                <a href="#contact">
                                    <i className="fa fa-angle-right" /> Contact
                                </a>
                            </li>
                        </ul>
                    </nav>
                    {/*<!-- /Main Navigation-->*/}

                    {/*<!-- Other Buttons -->*/}
                    <div className="side-menu-buttons">
                        <a href="#" className="btn btn-side-menu">
                            <i className="fa fa-download" /> Download my resume
                        </a>
                        <a href="#" className="btn btn-side-menu">
                            <i className="fa fa-envelope-o" /> Send me a message
                        </a>
                    </div>
                    {/*<!-- /Other Buttons-->*/}
                </div>
                {/*<!-- /side menu container -->*/}
            </Fragment>
        );
        /*-- /SIDE MENU
		========================================================= -*/
    }
}

function mapStateToProps(state) {
    const data = (state && state.data) ? state.data : null;

	const data_is_loaded = data !== null;

//    const resume = (data && data.resume) ? data.resume : null;
//    const details = (data && data.details) ? data.details : null;
    const language = (state && state.language) ? state.language : null;
	/*
	const menu_translations = (data && data.translations 
                                    && data.translations[language]
                                    && data.translations[language]['menu']) ? 
            data.translations[language]['menu']
			: null;
	*/
	const component_list = (state && state.component_list) ? state.component_list : null;

    return {
		data_is_loaded: data_is_loaded,
//        resume: resume,
//        details: details,
//        translations: {[language]: menu_translations},
		language: language,
		componets: component_list
    };
}

export default connect(mapStateToProps)(Menu);