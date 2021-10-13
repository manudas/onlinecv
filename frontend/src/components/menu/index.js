import React, { Component, Fragment } from "react";

import { bindActionCreators } from "redux";

import { connect } from "react-redux";

import { cvComponentsWereClickedActionCreator } from "../../store/actions";

import "./menu.css";

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menu: "closed",
            initialState: true
        };
        this.onMouseEnter = this._onMouseEnter.bind(this);
		this.closeMenu = this._closeMenu.bind(this);

		this.componentRefs = [];

		/** Initializing code needed to debounce dispatching to
		 * action creator cvComponentsWereClicked, so as to not
		 * flood the application
		 */
		this.timestamp = new Date();
		this.debouncedCvComponentsWereClicked = this._debouncedCvComponentsWereClicked.bind(this);
	}

	/** Initializing code needed to debounce dispatching to
	 * action creator cvComponentsWereClicked, so as to not
	 * flood the application
	 */
	static delay = 1500; // how many milliseconds should pass between executions

    _closeMenu(event) {
        this.setState({
            menu: "closed",
            initialState: false
        });
    }

    _onMouseEnter(event) {
        this.setState({
            menu: "opened",
            initialState: false
        });
    }

    renderMenuButton() {
        return (
            <div
                className="side-menu-open hidden-sm hidden-xs"
                onMouseEnter={this.onMouseEnter}>
                {/*<!-- Menu-button -->*/}
                <a className="btn btn-default side-menu-button">
                    <i className="fa fa-bars" /> MENU
                </a>
                {/*<!-- /menu-button -->*/}
            </div>
        );
    }

    getSideMenuOpenedStateClass() {
        return this.state.menu === "opened"
            ? "side-menu-open_hover"
            : this.state.initialState
            ? ""
            : "side-menu-close-animation";
    }

	/**
	 * Debouncing dispatchs to
	 * cvComponentsWereClicked
	 * as sometimes the user can
	 * click different options 
	 * quickly and therefore
	 * flood the app
	 */
	_debouncedCvComponentsWereClicked(index) {
		let now = new Date();
		let timeDistance = (now.getTime() - this.timestamp.getTime());
		if(timeDistance <= Menu.delay) {
			return;
		}
		this.timestamp = new Date();

		// Your code
		this.props.cvComponentsWereClicked(
			this.componentRefs[index]
		)
	}

    renderComponent(componentWrapper, index) {
        const { component, translated_name } = componentWrapper;
        return (
            <li key={index}>
                <a
                    href="#addAnchor?"
                    ref={(ref) => this.componentRefs[index] = component}
                    onClick={() => this.debouncedCvComponentsWereClicked(index)}>
                    <i className="fa fa-angle-right" /> {translated_name}
                </a>
            </li>
        );
    }

    renderOptions() {
        if (!this.props.components || this.props.components.length === 0) {
            return null;
        }
		const components = this.props.components;

		let name = this.props.details && this.props.details.name ? this.props.details.name : 'Name ex.';
        let surname = this.props.details && this.props.details.surname ? this.props.details.surname : 'LastName ex.';
        name = name.split(' ')[0];
        surname = surname.split(' ')[0];
        
        const primaryJobName = this.props.details && this.props.details.primaryJobName ? this.props.details.primaryJobName : null;
		const secondaryJobName = this.props.details && this.props.details.secondaryJobName ? this.props.details.secondaryJobName : null;
		
		const jobNames = primaryJobName ? primaryJobName + (secondaryJobName ? `/ ${secondaryJobName}` : '') : ''

        return (
            <div className={"side-menu " + this.getSideMenuOpenedStateClass()}>
                {/*<!-- close button -->*/}
                <span id="side-menu-close" onClick={this.closeMenu}>
                    <i className="fa fa-times" />
                </span>
                {/*<!-- /close button -->*/}

                {/*<!-- Menu header -->*/}
                <div className="side-menu-name">
                    {/*<!-- edit with your name -->*/}
                    {name} <strong>{surname}</strong>
                    {/*<!-- /edit with your name -->*/}
                </div>
                {/*<!-- edit with your Job -->*/}
                <p className="side-menu-job">{jobNames}</p>
                {/*<!-- /edit with your job -->*/}
                {/*<!-- /Menu Header -->*/}

                {/*<!-- Main Navigation -->*/}
                <nav id="side-menu" className="side-menu-este">
                    <ul className="nav side-menu-nav">
                        {components.map((component, index) =>
                            this.renderComponent(component, index)
                        )}
                    </ul>
                </nav>
                {/*<!-- /Main Navigation-->*/}

                {/*<!-- Other Buttons -->*/}
                <div className="side-menu-buttons">
                    <a className="btn btn-side-menu">
                        <i className="fa fa-download" /> Download my resume
                    </a>
                    <a className="btn btn-side-menu">
                        <i className="fa fa-envelope-o" /> Send me a message
                    </a>
                </div>
                {/*<!-- /Other Buttons-->*/}
            </div>
        );
        /*<!-- /side menu container -->*/
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
                {this.renderOptions()}
            </Fragment>
        );
        /*-- /SIDE MENU
		========================================================= -*/
    }
}

function mapStateToProps(state) {
    const data = state && state.data ? state.data : null;

    const data_is_loaded = data !== null;
    const details = (data && data.details) ? data.details : null;
    const language = state && state.language ? state.language : null;
    const component_list =
        state && state.component_list ? state.component_list : null;

    return {
        data_is_loaded: data_is_loaded,
        details: details,
        language: language,
        components: component_list
    };
}

function mapDistpatchToProps(dispatch) {
    return bindActionCreators(
        {
            cvComponentsWereClicked: cvComponentsWereClickedActionCreator
        },
        dispatch
    );
}

export default connect(
    mapStateToProps,
    mapDistpatchToProps
)(Menu);
