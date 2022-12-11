import React, { Component } from 'react'
import debounce from 'lodash/debounce'
import { registerEvents, unregisterEvents, EasingFunctions, calculateSoftScrollToStep } from './helpers'
import { StateDef } from './types'
class ScrollBar extends Component<any, StateDef> {
    static softScrollingTime = 1500 // in milliseconds
    static EasingFunctions = EasingFunctions
    static updateFrequencySoftScrolling = 120 // in frames per second

    private innerMouseIsDown
    public onMouseMove
    public onMouseUp
    private onInnerMouseDown
    private onMouseDown
    private onMouseLeaveFunction
    private onMouseEnterFunction
    public onMouseWheel
    public onFirstTouch
    public onTouchEnd
    public onTouchMove
    private _scroller: HTMLElement | null = null
    private _externalBar: HTMLElement | null= null
    private isScrollWithMouseWheel: boolean = false
    private lastY_TouchPosition: number | null = 0

    private lastScrollingUpdateTime: number = 0
    private firstScrollingUpdateTime: number = 0
    private scrollFrom: number = 0

    constructor(props: any) {
        super(props)
        this.state = {
            scroll_handler: {
                width: '6px',
                transition: 'width 0.15s',
                // in percentage
                height: (window.innerHeight * 100) / document.documentElement.scrollHeight + '%'
            },
            scrollTop: 0,
            isScrolling: false,
            windowHeight: window.innerHeight,
            // in pixeles
            scroll_handler_height: window.innerHeight * (window.innerHeight / document.documentElement.scrollHeight),
            // from this point on initialisation is with fake data
            scroll_bar: { backgroundColor: ''},
            scrollToComponentData: null
        }

        this.innerMouseIsDown = false

        const body = document.querySelector('body')
        body!!.style.overflowY = 'hidden'

        this.onMouseMove = this._onMouseMove.bind(this)
        this.onMouseUp = this._onMouseUp.bind(this)

        this.onInnerMouseDown = this._onInnerMouseDown.bind(this)
        this.onMouseDown = this._onMouseDown.bind(this)
        this.onMouseLeaveFunction = this._onMouseLeaveFunction.bind(this)
        this.onMouseEnterFunction = this._onMouseEnterFunction.bind(this)
        this.onMouseWheel = this._onMouseWheel.bind(this)
        this.onFirstTouch = this._onFirstTouch.bind(this)
        this.onTouchEnd = this._onTouchEnd.bind(this)
        this.onTouchMove = this._onTouchMove.bind(this)

        const resizeObserver = new ResizeObserver(
            (entries) => {
                entries.forEach((entry) => {
                    this.setState((previousState) => ({
                        ...previousState,
                        windowHeight: window.innerHeight,
                        // in pixeles
                        scroll_handler_height: window.innerHeight * (window.innerHeight / entry.contentRect.height),
                        scroll_handler: {
                            ...previousState.scroll_handler,
                            // in percentage
                            height: (window.innerHeight * 100) / entry.contentRect.height + '%'
                        }
                    }))
                })
            }
        )

        resizeObserver.observe(document.documentElement)
    }

    componentDidMount() {
        registerEvents(this)
    }

    componentWillUnmount() {
        unregisterEvents(this)
    }

    scrollToSection = (event: Event) => {
        const {
            detail
        } = event as CustomEvent
        this.firstScrollingUpdateTime = Date.now()
        this.lastScrollingUpdateTime = this.firstScrollingUpdateTime
        this.scrollFrom = this.state.scrollTop

        this.setState({
            scrollToComponentData: detail
        })
    }

    render() {
        const {
            scroll_bar: {
                backgroundColor: scroll_bar_bc = null
            } = {},
            scrollTop,
            scroll_handler: scroll_handler_struct = {},
            scroll_handler_height = 0
        } = this.state

        const scroll_bar_struct = scroll_bar_bc ? { backgroundColor: scroll_bar_bc } : {}

        const topRelativeViewPort = this.getViewPortRelativeScrollFromAbsoluteScrollValue(scrollTop)
        const scrollBarRelativeViewPortSize = this.getRelativeViewportSize(scroll_handler_height)
        const topPercentageStyle = (topRelativeViewPort * 100) - topRelativeViewPort * scrollBarRelativeViewPortSize * 100

        return (
            <div
                key="scroll_bar"
                id="scroll_bar"
                className="nicescroll-rails"
                ref={this.attachExternalBar}
                style={{
                    width: '12px',
                    zIndex: 'auto',
                    cursor: 'default',
                    position: 'fixed',
                    top: '0px',
                    height: '100%',
                    right: '0px',
                    opacity: '0.8',
                    borderRadius: '10px',
                    ...scroll_bar_struct
                }}
                onMouseEnter={this.onMouseEnterFunction}
                onMouseLeave={this.onMouseLeaveFunction}
                onMouseDown={this.onMouseDown}
                onMouseUp={this.onMouseUp}
            >
                <div
                    onMouseDown={this.onInnerMouseDown}
                    ref={this.attachScroller}
                    style={{
                        position: 'relative',
                        float: 'right',
                        backgroundColor: 'rgb(0, 0, 0)',
                        border: '1px solid rgb(255, 255, 255)',
                        backgroundClip: 'padding-box',
                        borderRadius: '10px',
                        ...scroll_handler_struct,
                        top: `${topPercentageStyle}%`,
                    }}
                />
            </div>
        )
    }

    /*
     * Workaround for Opera not applying the scrollTo function
     * due to being called way too fast one time afther another
     */
    scrollToPosition = debounce((options: ScrollToOptions | undefined) => { window.scrollTo(options) }, 50)

    maxScrollingDocumentHeight = () => document.documentElement.scrollHeight - this.state.windowHeight
    getViewPortRelativeScrollFromAbsoluteScrollValue = (absoluteScrollValue: number) => (absoluteScrollValue/this.maxScrollingDocumentHeight())
    getRelativeViewportSize = (size: number) => (size/this.state.windowHeight)

    resetScollerMovementStatus() {
        this.setState({
            isScrolling: false
        })
        this.innerMouseIsDown = false
    }

    getScroll(event: MouseEvent | React.MouseEvent) {
        let new_scroll_top = null
        const maxScrollingDocHeight = this.maxScrollingDocumentHeight();
        const { scroll_handler_height } = this.state
        if (this.isScrollWithMouseWheel) {
            new_scroll_top = event.clientY
        } else if (this.innerMouseIsDown) { // clicked inside the scrollbar handler
            // event.clientY is the relative to viewport zone where the user clicked inside the handler
            const scrollTopPercentage = this.getRelativeViewportSize(event.clientY)
            new_scroll_top = maxScrollingDocHeight * scrollTopPercentage
        } else { // clicked inside the scrollbar (but outside the controller handler)
            const scrollTopPercentage = this.getRelativeViewportSize(event.clientY)
            new_scroll_top = scrollTopPercentage * (maxScrollingDocHeight - this.getRelativeViewportSize(scroll_handler_height))
        }
        if (new_scroll_top < 0) {
            new_scroll_top = 0
        } else if (new_scroll_top > maxScrollingDocHeight) {
            new_scroll_top = maxScrollingDocHeight
        }

        return new_scroll_top
    }

    setNewPosition(new_scroll_top: number) {
        this.setState({
            isScrolling: true,
            scrollTop: new_scroll_top
        })
    }

    calculateScrollToComponentPosition() {
        if (this.state.scrollToComponentData) {
            // double checking as we are inside an asynchronous timeout block
            const {
                scrollToComponentData: {
                    component: {
                        current: scrollToComponent = null,
                    } = {},
                } = {},
            } = this.state
            const positionObj = scrollToComponent?.getBoundingClientRect()
            const height_to_scroll_to = (positionObj?.top ?? 0) + window.scrollY

            return height_to_scroll_to
        }

        return null
    }

    scrollToComponent() {
        const { scrollToComponentData } = this.state

        if (scrollToComponentData) {
            const timeOutFunction = () => {
                if (this.state.scrollToComponentData) {
                    // double checking as we are inside an asynchronous timeout block
                    const {
                        scrollToComponentData: {
                            unique_id: scrollingUniqueID = null,
                        } = {},
                    } = this.state

                    const calculated_height = this.calculateScrollToComponentPosition()
                    let newDerivedState: any = {}
                    if ( this.lastScrollingUpdateTime > this.firstScrollingUpdateTime + ScrollBar.softScrollingTime ) {
                        // we went so far, we will fix it
                        this.lastScrollingUpdateTime = this.firstScrollingUpdateTime + ScrollBar.softScrollingTime
                        newDerivedState = {
                            ...newDerivedState,
                            scrollTop: calculated_height,
                        }
                    } else if ( this.lastScrollingUpdateTime === this.firstScrollingUpdateTime + ScrollBar.softScrollingTime ) {
                        // movement complete!!
                        newDerivedState.scrollToComponentData = null
                        newDerivedState.isScrolling = false
                        newDerivedState.lastFinishedSoftScrollingUniqueID = scrollingUniqueID
                        newDerivedState.scrollToComponentData = null
                    } else {
                        const currentMillseconds = Date.now()
                        const { scrollFrom } = this
                        const next_scrolling_step = calculateSoftScrollToStep(
                            calculated_height ?? 0 - scrollFrom,
                            this.firstScrollingUpdateTime,
                            currentMillseconds,
                            this.firstScrollingUpdateTime + ScrollBar.softScrollingTime
                        ) + scrollFrom

                        this.lastScrollingUpdateTime = currentMillseconds
                        newDerivedState = {
                            ...newDerivedState,
                            isScrolling: true,
                            scrollTop: next_scrolling_step,
                        }
                    }
                    this.setState(newDerivedState)
                }
            }
            const bindedTimeOutFunction = timeOutFunction.bind(this)
            setTimeout(bindedTimeOutFunction, ScrollBar.softScrollingTime / ScrollBar.updateFrequencySoftScrolling)
        }
    }

    componentDidUpdate() {
        this.scrollToPosition({top: this.state.scrollTop, behavior: 'smooth'})
        this.scrollToComponent()
    }

    _onFirstTouch(event: TouchEvent): void {
        this.lastY_TouchPosition = event.touches[0].clientY
    }
    _onTouchEnd(_event: TouchEvent): void {
        this.lastY_TouchPosition = null
    }
    _onTouchMove(event: TouchEvent): void {
        if (!this.state.scrollToComponentData) {
            const currentY = event.touches[0].clientY
            const deltaY = (this.lastY_TouchPosition ?? 0) - currentY

            const mousewheelEvent = new WheelEvent('wheel', {
                bubbles: true,
                cancelable: false,
                deltaY: deltaY
            })
            document.dispatchEvent(mousewheelEvent)

            this.lastY_TouchPosition = event.touches[0].clientY
        }
    }

    _onMouseWheel(event: WheelEvent): void {
        if ( this?._externalBar ) {
            this.isScrollWithMouseWheel = true

            const mousedownEvent = new MouseEvent('mousedown', {
                bubbles: true,
                cancelable: false,
                clientY: event.deltaY + this.state.scrollTop
            })

            this._externalBar.dispatchEvent(mousedownEvent)

            const mouseupEvent = new Event('mouseup', {
                bubbles: true,
                cancelable: false
            })
            this._externalBar.dispatchEvent(mouseupEvent)
        }
    }

    _onMouseEnterFunction() {
        this.setState({
            scroll_bar: { backgroundColor: 'rgb(206, 208, 211)' },
            scroll_handler: { ...this.state.scroll_handler, width: '10px' }
        })
    }

    _onMouseLeaveFunction() {
        if (!this.state.isScrolling) {
            this.setState({
                scroll_bar: {
                    backgroundColor: 'transparent'
                },
                scroll_handler: {
                    ...this.state.scroll_handler,
                    width: '6px',
                }
            })
        }
    }

    _onMouseDown = (event: MouseEvent | React.MouseEvent) => {
        event.preventDefault()
        this.setNewPosition(this.getScroll(event))
    }

    _onMouseMove = (event: MouseEvent) => {
        if (this.state.isScrolling) {
            let new_scroll_top = this.getScroll(event)
            this.setNewPosition(new_scroll_top)
        }
    }

    _onMouseUp = (event: MouseEvent | React.MouseEvent) => {
        this.resetScollerMovementStatus()
        if (
            event.currentTarget !== this._scroller
            && event.currentTarget !== this._scroller?.parentElement
        ) {
            this.onMouseLeaveFunction()
        }
        event.stopPropagation()
        if (this.isScrollWithMouseWheel) {
            this.isScrollWithMouseWheel = false
        }
    }

    _onInnerMouseDown(event: MouseEvent | React.MouseEvent): void {
        this.innerMouseIsDown = true
    }

    attachScroller = (scroller: HTMLElement | null): void => {
        this._scroller = scroller
    }
    attachExternalBar = (bar: HTMLElement | null): void => {
        this._externalBar = bar
    }
}

export default ScrollBar
