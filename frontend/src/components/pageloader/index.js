import React, { Component } from "react";

import {
    LOADER_MOUNT_TIMEOUT
} from '../../helpers/constants'

import "./pageloader.css";

class PageLoader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // base css for the whole loader page
            show: true,
            style: {
                fontSize: 60,
                opacity: 0,
                transition: "all 1s ease"
            }
        };
    }

    componentWillReceiveProps(newProps) {
        //check for the mounted props
        if (!newProps.mounted) return this.unMountStyle(); // run unmount animation when mounted prop is false
        this.setState({
            //remount the node when the mounted prop is true
            show: true
        });

        setTimeout(this.binded_mount, LOADER_MOUNT_TIMEOUT); // run the mount animation
    }

    unMountStyle() {
        // css for unmount animation
        this.setState({
            style: {
                ... this.state.style,
                opacity: 0,
            }
        });
    }

    mountStyle() {
        // css for mount animation
        this.setState({
            style: {
                ... this.state.style,
                opacity: 1,
            }
        });
    }

    binded_mount = this.mountStyle.bind(this);

    componentDidMount() {
        setTimeout(this.binded_mount, LOADER_MOUNT_TIMEOUT); // run the mount animation
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
            introduction: {
                name: userName = null,
                surname: userSurname = null,
                nickname,
                primaryRole,
                secondaryRole
            },
            introduction
        } = {...this.props, ...(this.props.introduction ? {} : {introduction: {}})};

        const hasData = Object.keys(introduction).length > 0;

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
