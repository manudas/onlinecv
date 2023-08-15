import React, { PureComponent } from 'react'
import Lightbox from 'react-image-lightbox'
import { connect } from 'react-redux'
import Slider from 'react-slick'

import { attachUrlDataTypeToBase64 } from '../../helpers/files'
import TimeLineHeader from 'components/timeLineHeader'
import { PortfolioDef,PortfolioImage, PropDef, StateDef } from 'types/Portfolio'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import 'react-image-lightbox/style.css'
import './portfolio.css'

class PortFolio extends PureComponent<PropDef, StateDef> {
    state = { isOpen: false, photoIndex: 0, portfolioName: '' }
    imgRefList = new Map<string, Array<HTMLImageElement>>()

    addImgRef = (index: number, name: string, imgRef: HTMLImageElement) => {
        this.imgRefList.set(name, [...(this.imgRefList.get(name) ?? []).slice(0, index), imgRef, ...(this.imgRefList.get(name) ?? []).slice(index + 1)])
    }
    openGallery = (portfolioName: string, index: number) => this.setState({ portfolioName, isOpen: true, photoIndex: index })
    stripHtml = (text?: string) => text?.replace(/<(?:.|\n)*?>/gm, '') // striping out html
    renderTitle = () => <TimeLineHeader name={this.props.name} />

    renderPortFolioItem(portfolioImg: PortfolioImage, portfolioName: string, index: number) {
        const { name, description, data } = portfolioImg
        const name_without_html = this.stripHtml(name)
        const description_without_html = this.stripHtml(description)

        const image_data = data ? attachUrlDataTypeToBase64(data) : null
        const image = image_data ? (
            <img
                alt={name_without_html}
                title={description_without_html}
                ref={(ref) => ref && this.addImgRef(index, portfolioName, ref)}
                src={image_data}
            />
        ) : null

        /* Portfolio item */
        return (
            image && <div key={index}>
                <div className="portfolio-item">
                    {/* Link to the item image (Put the long description on  "a" title)*/}
                    <a
                        href={`#galeryElement${index}`}
                        onClick={() => this.openGallery(portfolioName, index)}
                        title={name_without_html}
                    >
                        <div className="hover fadeInUp animated">
                            <p className="zoomi">
                                <i className="fa fa-search" />
                            </p>
                            {/* Item short title */}
                            <p
                                className="portfolio-item-title"
                                dangerouslySetInnerHTML={{ __html: name ?? '' }}
                            />
                        </div>
                        <div className="hover-bg-wrapper">
                            <div className="hover-bg" />
                        </div>
                        <div className="portfolio-item-thumbnail">
                            {/* Thumbnail of the portfolio image (400x360 for retina display) */}
                            { image }
                        </div>
                    </a>
                </div>
            </div>
        )
        /* /Portfolio item */
    }

    renderPortFolioItems(portforlioElement: PortfolioDef) {
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            autoSlidesToShow: true,
            variableWidth: true,
            autoplay: true,
            pauseOnHover: true,
        }

        return (
            <Slider {...settings}>
                {
                    portforlioElement?.pictures.map((image, index) => this.renderPortFolioItem(image, portforlioElement.name, index)
                )}
            </Slider>
        )
    }

    renderSection(portfolioElement: PortfolioDef) {
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
                        <h3 className="section-item-title-1"> { portfolioElement.name } </h3>
                        {/* /Subtitle */}
                        { /* Description */}
                        <p> { portfolioElement.description } </p>
                        { /* /Description */}
                        { /* Keywords */}
                        { portfolioElement.keywords && <p className="keyword-tags"><i className="fa fa-tag"></i> { portfolioElement.keywords.join(', ') } </p> }
                        { /* /Keywords */}
                        {/* Content */}
                        <div className="portfolio-itens clearfix"> { this.renderPortFolioItems(portfolioElement) } </div>
                        {/* /Content */}
                    </div>
                </div>
                {/* Item Content */}
                {/* Margin Collum*/}
                <div className="col-md-1 bg1 timeline-space full-height hidden-sm hidden-xs" />
                {/* /Margin Collum*/}
            </div>
        )
        /* /SECTION ITEM */
    }

    renderGallerySlider(portfolioElement: PortfolioDef) {
        const { photoIndex, isOpen, portfolioName } = this.state;
        if ((this.imgRefList.get(portfolioElement.name) ?? []).length === 0) return null
        const selectedPortfolioImages = this.imgRefList.get(portfolioElement.name)
        return (
            isOpen && portfolioName === portfolioElement.name && (
                <Lightbox
                    animationDuration={800}
                    imageTitle={this.stripHtml(`${portfolioElement.name} ${portfolioElement.pictures[photoIndex].name ? ': ' + portfolioElement.pictures[photoIndex].name : '' }`)}
                    imageCaption={this.stripHtml(portfolioElement.pictures[photoIndex].description)}
                    mainSrc={ selectedPortfolioImages?.[photoIndex]?.src ?? '' }
                    nextSrc={ selectedPortfolioImages?.[ (photoIndex + 1) % selectedPortfolioImages.length ]?.src }
                    prevSrc={ selectedPortfolioImages?.[ (photoIndex + selectedPortfolioImages.length - 1) % selectedPortfolioImages.length ]?.src }
                    onCloseRequest={() => this.setState({ isOpen: false }) }
                    onMovePrevRequest={() => this.setState({ photoIndex: (photoIndex + (selectedPortfolioImages?.length ?? 0) - 1) % (selectedPortfolioImages?.length ?? 0) })}
                    onMoveNextRequest={() => this.setState({ photoIndex: (photoIndex + 1) % (selectedPortfolioImages?.length ?? 0) }) }
                />
            )
        )
    }

    render() {
        if (!this.props.portfolio) return null
        /* ====>> SECTION: PORTFOLIO <<====*/
        return (
            <section
                ref={this.props.reference}
                className="timeline portfolio"
                id="portfolio"
            >
                { this.renderTitle() }
                {
                    this.props.portfolio.map(
                        portfolioElement => {
                            return <React.Fragment key={portfolioElement.id}>
                                { this.renderSection(portfolioElement) }
                                { this.renderGallerySlider(portfolioElement) }
                            </React.Fragment>
                        }
                    )
                }
            </section>
        )
        /* ==>> /SECTION: PORTFOLIO */
    }
}

function mapStateToProps(state: {
    data: {
        resume: { portfolio: Array<PortfolioDef> }
    },
    language: string,
    translations: Record<string, Record<string, unknown>>
}) {
    const portfolio = state?.data?.resume?.portfolio
    const language = state?.language
    const translations = state?.translations?.[language]?.['Portfolio']
    return { language, portfolio, translations }
}

export default connect(mapStateToProps)(PortFolio)
