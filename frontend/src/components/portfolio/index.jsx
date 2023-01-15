import React, { Component } from 'react';

import { connect } from 'react-redux';

import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Lightbox from 'react-image-lightbox';

import { translateString } from '../../helpers/translations';

import 'react-image-lightbox/style.css';

import {
    getBase64MimeType,
    bufferToBase64
} from '../../helpers/files';

import './portfolio.css';

class PortFolio extends Component {
    constructor(props) {
        super(props);

        this.state = {
            photoIndex: 0,
            isOpen: false
        };

        this.imgRefList = [];
        this.addImgRef = this._addImgRef.bind(this);
        this.clearImgRefs = this._clearImgRefs.bind(this);

        this.openGallery = this._openGallery.bind(this);
    }

    _addImgRef(index, imgRef) {
        this.imgRefList[index] = imgRef;
    }

    _clearImgRefs() {
        this.imgRefList = [];
    }

    renderPortFolioItem(portfolio_item, index) {
        /*
        const portfolio_item_description = portfolio_item.description
            ? portfolio_item.description
            : "PORTFOLIO DESCRIPTION";
		*/
        const name = portfolio_item.name
            ? portfolio_item.name
            : 'item_name';
        const name_without_html = name.replace(
            /<(?:.|\n)*?>/gm,
            ''
        ); // striping out html

        const image_data = portfolio_item.picture
            ? bufferToBase64(portfolio_item.picture)
            : null;
        const mimetype = image_data
            ? getBase64MimeType(image_data)
            : null;

        // `url(data:${getBase64ImageMimeType(this.props.background)};base64,${this.props.background})`

        const image = image_data ? (
            <img
                ref={(ref) => this.addImgRef(index, ref)}
                src={`data:${mimetype};base64, ${image_data}`}
                alt={name_without_html}
            />
        ) : (
            <img
                ref={(ref) => this.addImgRef(index, ref)}
                alt={name_without_html}
            />
        );

        /* Portfolio item */
        return (
            <div key={index}>
                <div className="portfolio-item">
                    {/* Link to the item image (Put the long description on  "a" title)*/}
                    <a
                        href={`#galeryElement${index}`}
                        onClick={() =>
                            this.openGallery(index)
                        }
                        // href="img/portfolio-item-zoom.jpg"
                        title={name_without_html}
                    >
                        <div className="hover fadeInUp animated">
                            <p className="zoomi">
                                <i className="fa fa-search" />
                            </p>
                            {/* Item short title */}
                            <p
                                className="portfolio-item-title"
                                dangerouslySetInnerHTML={{
                                    __html: name
                                }}
                            />
                        </div>
                        <div className="hover-bg-wrapper">
                            <div className="hover-bg" />
                        </div>
                        <div className="portfolio-item-thumbnail">
                            {/* Thumbnail of the portfolio image (400x360 for retina display) */}
                            {image}
                        </div>
                    </a>
                </div>
            </div>
        );
        /* /Portfolio item */
    }

    _openGallery(index) {
        this.setState({
            isOpen: true,
            photoIndex: index
        });
    }

    renderPortFolioItems() {
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            // slidesToShow: 1,
            // slidesToScroll: 1
            autoSlidesToShow: true,
            variableWidth: true
        };

        return (
            <Slider {...settings}>
                {this.props.portfolio.map(
                    (portfolio_item, index) => {
                        return this.renderPortFolioItem(
                            portfolio_item,
                            index
                        );
                    }
                )}
            </Slider>
        );
    }

    renderTitle() {
        return [
            /* VERTICAL MARGIN (necessary for the timeline effect) */
            <div
                key="1"
                className="line row timeline-margin content-wrap"
            >
                <div className="col-md-1 bg1 timeline-space full-height hidden-sm hidden-xs" />
                <div className="col-md-2 timeline-progress hidden-sm hidden-xs full-height" />
                <div className="col-md-9 bg1 full-height" />
            </div>,
            /* /VERTICAL MARGIN */
            /* SECTION TITLE */
            <div key="2" className="line row d-flex">
                {/* Margin Collums (necessary for the timeline effect) */}
                <div className="col-md-1 bg1 timeline-space full-height hidden-sm hidden-xs" />
                <div className="col-md-2 timeline-progress hidden-sm hidden-xs timeline-title full-height" />
                {/* /Margin Collums */}
                {/* Item Content */}
                <div className="col-md-8 content-wrap bg1">
                    {/* Section title */}
                    <h2 className="section-title">
                        {this.props.name}
                    </h2>
                    {/* /Section title */}
                </div>
                {/* Item Content */}
                {/* Margin Collum*/}
                <div className="col-md-1 bg1 timeline-space full-height hidden-sm hidden-xs" />
                {/* /Margin Collum*/}
            </div>
            /* /SECTION TITLE */
        ];
    }

    renderSection() {
        // this.clearImgRefs(); to place in component will update or component will receive props when filtering by keyword or someting
        // idem with the other refs

        /* SECTION ITEM */
        return (
            <div className="line row d-flex">
                {/* Margin Collums (necessary for the timeline effect) */}
                <div className="col-md-1 bg1 timeline-space full-height hidden-sm hidden-xs" />
                <div className="col-md-2 timeline-progress hidden-sm hidden-xs full-height timeline-point " />
                {/* /Margin Collums */}
                {/* Item Content */}
                <div className="col-md-8 content-wrap bg1">
                    <div className="line-content">
                        {/* Subtitle */}
                        <h3 className="section-item-title-1">
                            {translateString(
                                'some_works',
                                this
                            )}
                        </h3>
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
                <div className="col-md-1 bg1 timeline-space full-height hidden-sm hidden-xs" />
                {/* /Margin Collum*/}
            </div>
        );
        /* /SECTION ITEM */
    }

    renderGallerySlider() {
        const { photoIndex, isOpen } = this.state;
        if (!this.imgRefList[photoIndex]) {
            return null;
        }
        return (
            isOpen && (
                <Lightbox
                    animationDuration={800}
                    imageTitle={
                        this.props.portfolio[photoIndex]
                            .name
                            ? this.props.portfolio[
                                  photoIndex
                              ].name.replace(
                                  /<(?:.|\n)*?>/gm,
                                  ''
                              )
                            : null
                    } // striping out html
                    imageCaption={
                        this.props.portfolio[photoIndex]
                            .description
                            ? this.props.portfolio[
                                  photoIndex
                              ].description.replace(
                                  /<(?:.|\n)*?>/gm,
                                  ''
                              )
                            : null
                    } // striping out html
                    mainSrc={
                        this.imgRefList[photoIndex].src
                            ? this.imgRefList[photoIndex]
                                  .src
                            : null
                    }
                    nextSrc={
                        this.imgRefList[
                            (photoIndex + 1) %
                                this.imgRefList.length
                        ].src
                            ? this.imgRefList[
                                  (photoIndex + 1) %
                                      this.imgRefList.length
                              ].src
                            : null
                    }
                    prevSrc={
                        this.imgRefList[
                            (photoIndex +
                                this.imgRefList.length -
                                1) %
                                this.imgRefList.length
                        ].src
                            ? this.imgRefList[
                                  (photoIndex +
                                      this.imgRefList
                                          .length -
                                      1) %
                                      this.imgRefList.length
                              ].src
                            : null
                    }
                    onCloseRequest={() =>
                        this.setState({ isOpen: false })
                    }
                    onMovePrevRequest={() =>
                        this.setState({
                            photoIndex:
                                (photoIndex +
                                    this.imgRefList.length -
                                    1) %
                                this.imgRefList.length
                        })
                    }
                    onMoveNextRequest={() =>
                        this.setState({
                            photoIndex:
                                (photoIndex + 1) %
                                this.imgRefList.length
                        })
                    }
                />
            )
        );
    }

    render() {
        if (!this.props.portfolio) {
            return null;
        }
        /* ====>> SECTION: PORTFOLIO <<====*/
        return (
            <section
                ref={this.props.reference}
                className="timeline portfolio"
                id="portfolio"
            >
                {this.renderTitle()}
                {this.renderSection()}
                {this.renderGallerySlider()}
            </section>
        );
        /* ==>> /SECTION: PORTFOLIO */
    }
}

function mapStateToProps(state) {
    const data = state && state.data ? state.data : null;
    const portfolio =
        data && data.portfolio ? data.portfolio : null;
    const language =
        state && state.language ? state.language : null;
    const translations =
        data &&
        data.translations &&
        data.translations[language] &&
        data.translations[language][this.className]
            ? data.translations[language][this.className]
            : null;

    return {
        portfolio: portfolio,
        translations: translations,
        language: language
    };
}

export default connect(mapStateToProps)(PortFolio);
