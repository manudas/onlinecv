import React, { Component } from "react";
import "./pageloader.css";

class PageLoader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //base css
            show: true,
            style: {
                fontSize: 60,
                opacity: 0,
                transition: "all 2s ease"
            }
        };
    }

    componentWillReceiveProps(newProps) {
        //check for the mounted props
        if (!newProps.mounted) return this.unMountStyle(); //call outro animation when mounted prop is false
        this.setState({
            //remount the node when the mounted prop is true
            show: true
        });
        const binded_mount_function = this.mountStyle.bind(this);
        setTimeout(binded_mount_function, 10); //call the into animiation
    }

    unMountStyle() {
        //css for unmount animation
        this.setState({
            style: {
                fontSize: 60,
                opacity: 0,
                transition: "all 1s ease"
            }
        });
    }

    mountStyle() {
        // css for mount animation
        this.setState({
            style: {
                fontSize: 60,
                opacity: 1,
                transition: "all 1s ease"
            }
        });
    }

    componentDidMount() {
        const binded_function = this.mountStyle.bind(this);
        setTimeout(binded_function, 10); //call the into animiation
    }

    transitionEnd() {
        if (!this.props.mounted) {
            //remove the node on transition end when the mounted prop is false
            this.setState({
                show: false
            });
        }
    }

    binded_transition_end = this.transitionEnd.bind(this);

    render() {
        if (!this.state.show) return null;
        /* Page Loader
      ========================================================= */
        const {
            userData: {
                name: userName = null,
                surname: userSurname = null,
                nickname,
                primaryRole,
                secondaryRole
            },
            userData
        } = {...this.props, ...(this.props.userData ? {} : {userData: {}})};

        const hasData = Object.keys(userData).length > 0;

        let name, surname;
        if (hasData) {

            name = userName ?? null;
            if (name) {
                name = name.split(" ")[0];
            }
            surname = userSurname ?? null;
            if (surname) {
                surname = surname.split(" ")[0];
            }
        }

        return (
            <div
                style={this.state.style}
                onTransitionEnd={this.binded_transition_end}
                className="loader"
                id="page-loader">
                    <div className="loading-wrapper">
                        <div className="tp-loader spinner" />
                            {
                                hasData ?
                                    <>
                                        {/* Edit With Your Name */}
                                        <div className="side-menu-name">
                                            {name} {surname}
                                            {nickname ? " - " : ""}
                                            {nickname ? (
                                                <strong>{nickname}</strong>
                                            ) : (
                                                ""
                                            )}
                                        </div>
                                        {/* /Edit With Your Name */}
                                        {/* Edit With Your Job */}
                                        <p className="side-menu-job">
                                            {primaryRole}
                                            {secondaryRole
                                                ? ` / ${secondaryRole}`
                                                : ""}
                                        </p>
                                        {/* /Edit With Your Job */}
                                    </>
                                    : null
                            }
                    </div>
            </div>
        );
        /*  /End of Page loader
      ========================================================= */
    }
}

export default PageLoader;
