import { Component, Fragment } from "react"
import { debounce } from "lodash"
import { connect } from "react-redux"

import { EventType } from "helpers/customEvents"

import { PropDef, StateDef } from "./types"
import { ComponentDef } from "helpers/types"
import { translateString } from "helpers/translations"
import { downloadDocument } from "helpers/files"

import "./menu.css"
class Menu extends Component<PropDef, StateDef> {
    constructor(props: PropDef) {
        super(props);

        this.onMouseEnter = this.onMouseEnter.bind(this);
		this.closeMenu = this.closeMenu.bind(this);
        this.addResumeComponent = this.addResumeComponent.bind(this)
        this.onClickMenuOption = this.onClickMenuOption.bind(this);

        this.state = {
            menu: "closed",
            previousMenuState: "closed",
            componentRefs: []
        };
        console.warn('en css existe un "active" para los item li del menu seleccionados. Implementar o borrar de CSS')
	}

    addResumeComponent(customEvent: Event): void {
        const data: ComponentDef = (customEvent as CustomEvent).detail
        const { component } = data
        if (component && "current" in component && component.current !== null) {
            this.setState(({componentRefs}) => {
                return { componentRefs: [...componentRefs, data] }
            })
        }
    }

    componentDidMount() {
        document.addEventListener(EventType[EventType.SECTION_ADDED], this.addResumeComponent);
    }

    componentWillUnmount() {
        document.removeEventListener(EventType[EventType.SECTION_ADDED], this.addResumeComponent);
    }

    closeMenu() {
        this.setState({
            menu: "closed",
            previousMenuState: "closed",
        });
    }

    onMouseEnter() {
        this.setState({
            menu: "opened",
            previousMenuState: "closed",
        });
    }

    renderMenuButton() {
        return (
            <div
                className="side-menu-open hidden-sm hidden-xs"
                onMouseEnter={this.onMouseEnter}>
                {/*<!-- Menu-button -->*/}
                <a
                    href="#menu"
                    className="btn btn-default side-menu-button">
                    <i className="fa fa-bars" /> { translateString('MENU', this) }
                </a>
                {/*<!-- /menu-button -->*/}
            </div>
        );
    }

    getSideMenuOpenedStateClass() {
        if (this.state.menu === "opened") {
            return "side-menu-open_hover"
        } else if (this.state.previousMenuState === "opened") {
            return "side-menu-close-animation"
        } else return '';
    }

	/**
	 * Debouncing to avoid flooding
	 * the app with dispatches
	 */
	onClickMenuOption = debounce(index => {
		// Your code
        const clickEvent = new CustomEvent(EventType[EventType.SCROLL_TO_SECTION],
            { detail: { component: this.state.componentRefs[index].component, unique_id: Date.now() } }
        )

        document.dispatchEvent(clickEvent)

	}, 1000)

    renderComponent(componentWrapper: ComponentDef, index: number) {
        const { translated_name } = componentWrapper;
        return (
            <li key={index}>
                <a
                    href={`#${translated_name}`}
                    onClick={() => this.onClickMenuOption(index)}>
                    <i className="fa fa-angle-right" /> {translated_name}
                </a>
            </li>
        );
    }

    renderOptions() {
        if ( this.state.componentRefs.length === 0 ) return null
		const components = this.state.componentRefs

		let name = this.props?.details?.name
        let surname = this.props?.details?.surname
        name = name?.split(' ')[0]
        surname = surname?.split(' ')[0]

        const primaryRole = this.props?.details?.primaryRole
        const secondaryRole = this.props?.details?.secondaryRole

        const jobNames = primaryRole ? `${primaryRole}${primaryRole && secondaryRole ? ' / ' : ''}${secondaryRole ? secondaryRole : ''}` : null

        return (
            <div className={"side-menu " + this.getSideMenuOpenedStateClass()}>
                {/*<!-- close button -->*/}
                <span id="side-menu-close" onClick={this.closeMenu}>
                    <i className="fa fa-times" />
                </span>
                {/*<!-- /close button -->*/}

                {/*<!-- Menu header -->*/}
                {
                    name || surname
                        ? <div className="side-menu-name">
                            {/*<!-- edit with your name -->*/}
                            {name} <strong>{ surname }</strong>
                            {/*<!-- /edit with your name -->*/}
                        </div>
                        : null
                }
                {/*<!-- edit with your Job -->*/}
                <p className="side-menu-job">{ jobNames }</p>
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
                    {
                        this.props.resumeEncodedData
                            ? <a
                                onClick={() => downloadDocument(this.props.resumeEncodedData.data, `${name}${surname ? ' ' + surname : ''}${jobNames ? ' - ' + jobNames : ''}`)}
                                href="#downloadResume"
                                className="btn btn-side-menu"
                            >
                                <i className="fa fa-download" /> { translateString('Download my resume', this) }
                            </a>
                            : null
                    }
                    <a
                        href="#sendMessage"
                        className="btn btn-side-menu"
                    >
                        <i className="fa fa-envelope-o" /> { translateString('Send me a message', this) }
                    </a>
                </div>
                {/*<!-- /Other Buttons-->*/}
            </div>
        );
        /*<!-- /side menu container -->*/
    }

    render() {
        /*-- SIDE MENU
		========================================================= */
        return (
            <Fragment>
                {this.renderMenuButton()}
                {/* <!-- Side Menu container --> */}
                {this.renderOptions()}
            </Fragment>
        );
        /*-- /SIDE MENU
		========================================================= -*/
    }
}

function mapStateToProps(state: any) {
    const data = state?.data;

    const details = data?.resume?.details;
    const language = state?.language;
    const resumeEncodedData = data?.resume?.resume

    return {
        details,
        language,
        resumeEncodedData
    };
}

export default connect(mapStateToProps)(Menu)