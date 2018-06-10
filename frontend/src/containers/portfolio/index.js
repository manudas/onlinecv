import React, { Component } from 'react';

import { connect } from 'react-redux';

import './portfolio.css';

class PortFolio extends Component {
  constructor(props) {
    super(props);

    this.state = {
      height_title1: 0,
      height_title2: 0,
      height_section: 0
    };
  }

  componentDidMount() {
    const height_titleRef1 = this.titleRef1.clientHeight;
    const height_titleRef2 = this.titleRef2.clientHeight;
    const height_sectionRef = this.sectionRef.clientHeight;

    this.setState({
      height_title1: height_titleRef1,
      height_title2: height_titleRef2,
      height_section: height_sectionRef
    });
  }

  renderPortFolioItem(portfolio_item, index) {
    /* Portfolio item */
    return (
      <div className="portfolio-item">
        {/* Link to the item image (Put the long description on  "a" title)*/}
        <a href="img/portfolio-item-zoom.jpg" title="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed molestie purus." className="nivobox" data-lightbox-gallery="portfolio">
          <div className="hover">
            <p className="zoomi"><i className="fa fa-search"></i></p>
            {/* Item short title */}
            <p className="portfolio-item-title"><strong>John's Rex</strong><br /> Business Card</p>
          </div>
          <div className="hover-bg-wrapper">
            <div className="hover-bg"></div>
          </div>
          <div className="portfolio-item-thumbnail">
            {/* Thumbnail of the portfolio image (400x360 for retina display) */}
            <img src="img/portfolio-item-thumb.jpg" alt="" />
          </div>
        </a>
      </div>
    );
    /* /Portfolio item */
  }

  renderPortFolioItems() {
    if (!this.props.portfolio) {
      return null;
    } else {
      return (
        this.props.portfolio.map((portfolio_item, index) => {
          return this.renderPortFolioItem(portfolio_item, index);
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
        </div>,
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
            <h2 className="section-title">Portfólio</h2>
            {/* /Section title */}
          </div>
          {/* Item Content */}
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

  renderSection() {
    /* SECTION ITEM */
    return (
      <div className="line row">
        {/* Margin Collums (necessary for the timeline effect) */}
        <div
          style={{ height: this.state.height_section }}
          className="col-md-1 bg1 timeline-space full-height hidden-sm hidden-xs"></div>
        <div
          style={{ height: this.state.height_section }}
          className="col-md-2 timeline-progress hidden-sm hidden-xs full-height timeline-point "></div>
        {/* /Margin Collums */}
        {/* Item Content */}
        <div
          ref={sectionRef => this.sectionRef = sectionRef}
          className="col-md-8 content-wrap bg1">
          <div className="line-content">
            {/* Subtitle */}
            <h3 className="section-item-title-1">Some Works</h3>
            {/* /Subtitle */}
            {/* content */}
            <div className="portfolio-itens clearfix">
              {this.renderPortFolioItems()}
            </div>
            {/* /Content */}
          </div>
        </div>
        {/* Item Content */}
        {/* Margin Collum*/}
        <div
          style={{ height: this.state.height_section }}
          className="col-md-1 bg1 timeline-space full-height hidden-sm hidden-xs"></div>
        {/* /Margin Collum*/}
      </div>
    );
    /* /SECTION ITEM */
  }

  render() {
    /* ====>> SECTION: PORTFOLIO <<====*/
    return (
      <section className="timeline portfolio" id="portfolio">
        {this.renderTitle()}
        {this.renderSection()}
      </section>
    );
    /* ==>> /SECTION: PORTFOLIO */
  }
}

function mapStateToProps(state) {
  return {
    portfolio: state.portfolio
  };
}

export default connect(mapStateToProps)(PortFolio);