import React, { Component } from 'react';

import { connect } from 'react-redux';

class Interest extends Component {
    constructor(props) {
        super(props);

        this.state = {
            height_title1: 0,
            height_title2: 0,
            height_interestItem: null
        };
    }

    componentDidMount() {
        const height_titleRef1 = this.titleRef1.clientHeight;
        const height_titleRef2 = this.titleRef2.clientHeight;
        let height_interestItem = [];
        if (this.interestItem) {
            this.interestItem.map(
                (interest_ref, index) => {
                    height_interestItem[index] = interest_ref.clientHeight;
                });
        } else {
            height_interestItem = null;
        }
        this.setState({
            height_title1: height_titleRef1,
            height_title2: height_titleRef2,
            height_interestItem
        });
    }

    renderInterestItem(interest_item, index) {
        /* SECTION ITEM */
        return (
            <div className="line row">
                {/* Margin Collums (necessary for the timeline effect) */}
                <div 
                style={{ height: this.state.height_interestItem[index] }}
                className="col-md-1 bg1 timeline-space full-height hidden-sm hidden-xs"></div>
                <div 
                style={{ height: this.state.height_interestItem[index] }}
                className="col-md-2 timeline-progress hidden-sm hidden-xs full-height timeline-point "></div>
                {/* /Margin Collums */}
                {/* Item Content */}
                <div 
                ref={interestItem => this.interestItem[index] = interestItem}
                className="col-md-8 content-wrap bg1">
                    <div className="line-content">
                        {/* Subtitle */}
                        <h3 className="section-item-title-1">Games</h3>
                        {/* /Subtitle */}
                        {/* content */}
                        <p>Praesent tellus ligula, tincidunt et fringilla vel, tincidunt ut dui. Nulla feugiat, lacus ac malesuada lobortis, elit nunc congue nunc, vel imperdiet lorem leo a lectus.</p>
                    {/* /Content */}
                    </div>
                </div>
                {/* /Item Content */}
                {/* Margin Collum*/}
                <div 
                style={{ height: this.state.height_interestItem[index] }}
                className="col-md-1 bg1 timeline-space full-height hidden-sm hidden-xs"></div>
            {/* /Margin Collum*/}
            </div>
        );
        /* /SECTION ITEM */
    }

    renderInterestItems() {
        if (!this.props.interests) {
            return null;
        } else {
            return (
                this.props.interests.map((interest_item, index) => {
                    return this.renderInterestItem(interest_item, index)
                })
            );
        }
    }

    renderTitle() {
        return (
            [
                /* VERTICAL MARGIN (necessary for the timeline effect) */
                <div key='1' className="line row timeline-margin">
                    <div 
                    ref={titleRef1 => this.titleRef1 = titleRef1}
                    className="content-wrap">
                        <div 
                        style={{ height: this.state.height_title1 }}
                        className="col-md-1 bg1 timeline-space full-height hidden-sm hidden-xs"></div>
                        <div 
                        style={{ height: this.state.height_title1 }}
                        className="col-md-2 timeline-progress hidden-sm hidden-xs full-height"></div>
                        <div 
                        style={{ height: this.state.height_title1 }}
                        className="col-md-9 bg1 full-height"></div>
                    </div>
                </div> ,
                /* /VERTICAL MARGIN */
                /* SECTION TITLE */
                <div key='2' className="line row">
                    {/* Margin Collums (necessary for the timeline effect) */}
                    <div 
                    style={{ height: this.state.height_title2 }}
                    className="col-md-1 bg1 timeline-space full-height hidden-sm hidden-xs"></div>
                    <div 
                    style={{ height: this.state.height_title2 }}
                    className="col-md-2 timeline-progress hidden-sm hidden-xs timeline-title full-height"></div>
                    {/* /Margin Collums */}
                    {/* Item Content */}
                    <div 
                    ref={titleRef2 => this.titleRef2 = titleRef2}
                    className="col-md-8 content-wrap bg1">
                        {/* Section title */}
                        <h2 className="section-title">Interests</h2>
                    {/* /Section title */}
                    </div>
                    {/* /Item Content */}
                    {/* Margin Collum*/}
                    <div 
                    style={{ height: this.state.height_title2 }}
                    className="col-md-1 bg1 timeline-space full-height hidden-sm hidden-xs"></div>
                {/* /Margin Collum*/}
                </div>
            /* /SECTION TITLE */
            ]
        );
    }

    render() {
        /* ====>> SECTION: INTERESTS <<====*/
        return (
            <section className="timeline" id="interests">
                {this.renderTitle()}
                {this.renderInterestItems()}
            </section>
        );
        /* ==>> /SECTION: INTERESTS */
    }
}

function mapStateToProps(state) {
  return {
    interests: state.interests
  };
}

export default connect(mapStateToProps)(Interest);