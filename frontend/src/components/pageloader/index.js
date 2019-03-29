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

    render() {
        if (!this.state.show) return null;
        /* Page Loader
      ========================================================= */
        const { userData } = this.props;

        if (!userData) return null;

        const binded_transition_end = this.transitionEnd.bind(this);
        let name = userData.name ? userData.name : null;
        if (name) {
            name = name.split(" ")[0];
        }
        let surname = userData.surname ? userData.surname : null;
        if (surname) {
            surname = surname.split(" ")[0];
        }

        return (
            <div
                style={this.state.style}
                onTransitionEnd={binded_transition_end}
                className="loader"
                id="page-loader">
                <div className="loading-wrapper">
                    <div className="tp-loader spinner" />
                    {/* Edit With Your Name */}
                    <div className="side-menu-name">
                        {name} {surname}
                        {userData.nickname ? " - " : ""}
                        {userData.nickname ? (
                            <strong>{userData.nickname}</strong>
                        ) : (
                            ""
                        )}
                    </div>
                    {/* /Edit With Your Name */}
                    {/* Edit With Your Job */}
                    <p className="side-menu-job">
                        {userData.primaryJobName}
                        {userData.secondaryJobName
                            ? ` / ${userData.secondaryJobName}`
                            : ""}
                    </p>
                    {/* /Edit With Your Job */}
                </div>
            </div>
        );
        /*  /End of Page loader
      ========================================================= */
    }
}

export default PageLoader;
