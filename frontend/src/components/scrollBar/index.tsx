import { Component } from 'react'
import { StateDef } from './types'

class ScrollBar extends Component<any, StateDef> {
    static softScrollingTime = 1500 // in milliseconds

    static EasingFunctions = {
        // no easing, no acceleration
        linear: (t: number) => t,
        // accelerating from zero velocity
        easeInQuad: (t: number) => t * t,
        // decelerating to zero velocity
        easeOutQuad: (t: number) => t * (2 - t),
        // acceleration until halfway, then deceleration
        easeInOutQuad: (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
        // accelerating from zero velocity
        easeInCubic: (t: number) => t * t * t,
        // decelerating to zero velocity
        easeOutCubic: (t: number) => --t * t * t + 1,
        // acceleration until halfway, then deceleration
        easeInOutCubic: (t: number) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
        // accelerating from zero velocity
        easeInQuart: (t: number) => t * t * t * t,
        // decelerating to zero velocity
        easeOutQuart: (t: number) => 1 - --t * t * t * t,
        // acceleration until halfway, then deceleration
        easeInOutQuart: (t: number) => t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t,
        // accelerating from zero velocity
        easeInQuint: (t: number) => t * t * t * t * t,
        // decelerating to zero velocity
        easeOutQuint: (t: number) => 1 + --t * t * t * t * t,
        // acceleration until halfway, then deceleration
        easeInOutQuint: (t: number) => t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t
    }

    static updateFrequencySoftScrolling = 120 // in frames per second

    private innerClientY
    private innerMouseIsDown
    private onMouseMove
    private onMouseUp
    private onInnerMouseDown
    private onMouseDown
    private onMouseLeaveFunction
    private onMouseEnterFunction
    private onMouseWheel
    private onFirstTouch
    private onTouchEnd
    private onTouchMove

    constructor(props: any) {
        super(props)
        this.state = {
            scroll_handler: {
                width: '6px',
                top: '0px',
                // in percentage
                height:
                    (window.innerHeight * 100) /
                        document.documentElement
                            .scrollHeight +
                    '%'
            },
            isScrolling: false,
            scrollTop: 0,
            windowHeight: window.innerHeight,
            // in pixeles
            scroll_handler_height:
                window.innerHeight *
                (window.innerHeight /
                    document.documentElement.scrollHeight)
        }

        this.innerClientY = 0
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

        this.registerWheelEvent()
        this.registerTouchEvents()

        const resizeObserver = new ResizeObserver(
            (entries) => {
                entries.forEach((entry) => {
                    this.setState((previousState) => ({
                        ...previousState,
                        windowHeight: window.innerHeight,
                        // in pixeles
                        scroll_handler_height:
                            window.innerHeight *
                            (window.innerHeight /
                                entry.contentRect.height),
                        scroll_handler: {
                            ...previousState.scroll_handler,
                            // in percentage
                            height:
                                (window.innerHeight * 100) /
                                    entry.contentRect
                                        .height +
                                '%'
                        }
                    }))
                })
            }
        )

        resizeObserver.observe(document.documentElement)
    }

    registerWheelEvent() {
        window.addEventListener('wheel', this.onMouseWheel)
    }

    registerTouchEvents() {
        window.addEventListener('touchstart', this.onFirstTouch)
        window.addEventListener('touchend', this.onTouchEnd)
        window.addEventListener('touchmove', this.onTouchMove)
    }

    render() {
        const {
            scroll_bar: {
                backgroundColor: scroll_bar_bc = null
            } = {},
            scroll_handler: scroll_handler_struct = {}
        } = this.state

        const scroll_bar_struct = scroll_bar_bc ? { backgroundColor: scroll_bar_bc } : {}

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
                        ...scroll_handler_struct
                    }}
                />
            </div>
        )
    }

    updateDocumentScroll(
        updateScroll = true,
        scrollTo = null
    ) {
        const _scrollTo = scrollTo ?? this.state.scrollTop

        const top_scroll_handler = _scrollTo

        const scrollBarHandlerHeight = this.state.scroll_handler_height
        const bottom_inner = top_scroll_handler + scrollBarHandlerHeight
        const inner_bar_middle_point = (bottom_inner + top_scroll_handler) / 2

        const document_height = document.documentElement.scrollHeight

        const min_inner_middle_point_allowed = 0 + scrollBarHandlerHeight / 2
        const max_inner_middle_bar_allowed = this.state.windowHeight - scrollBarHandlerHeight / 2

        const _top_scroll_to_percentage = (inner_bar_middle_point - min_inner_middle_point_allowed) / max_inner_middle_bar_allowed
        const _top_scroll_to = (document_height - this.state.windowHeight) * _top_scroll_to_percentage

        if (updateScroll) window.scroll(0, _top_scroll_to)

        return _top_scroll_to
    }

    getSnapshotBeforeUpdate = (_nextProps: any, nextState: StateDef) => {
        if (
            this.state.isScrolling !== nextState.isScrolling
        ) {
            if (
                this.state.isScrolling &&
                this.state.isSoftScrolling // has to do with scrolling to a given component in the menu
            ) {
                this.toggleScrolling(false)
            } else {
                this.toggleScrolling(
                    this.state.isScrolling
                )
            }
        }
        return null
    }

    toggleScrolling = (isEnabled: boolean) => {
        if (isEnabled) {
            window.addEventListener(
                'mousemove',
                this.onMouseMove
            )
            window.addEventListener(
                'mouseup',
                this.onMouseUp
            )
        } else {
            window.removeEventListener(
                'mousemove',
                this.onMouseMove
            )
        }
    }

    _onMouseMove = (event: Event) => {
        if (
            this.state.isScrolling &&
            !this.state.isSoftScrolling
        ) {
            let new_scroll_top = this.getScroll(event)
            this.setNewPosition(new_scroll_top)
        }
    }

    _onMouseUp = (event: Event) => {
        this.resetScollerMovementStatus()
        if (
            event.currentTarget !== this._scroller &&
            event.currentTarget !==
                this._scroller.parentElement
        ) {
            this.onMouseLeaveFunction()
        }
        event.stopPropagation()
        if (this.isScollWithMouseWheel) {
            this.isScollWithMouseWheel = false
        }
    }

    resetScollerMovementStatus() {
        this.setState({
            isScrolling: false
        })
        this.innerMouseIsDown = false
        this.innerClientY = 0
    }

    getScroll(event: Event) {
        let new_scroll_top = 0
        const scroller_bar_height =
            this._scroller.parentElement.clientHeight
        const scroller_controller_height =
            this._scroller.clientHeight
        if (this.isScollWithMouseWheel) {
            new_scroll_top = event.clientY
        } else if (this.innerMouseIsDown) {
            new_scroll_top =
                +event.clientY - this.innerClientY // nueva zona de la barra de scroll donde se ha hecho click // zona dentro del manejador de scroll donde se hizo click
        } else {
            new_scroll_top =
                +event.clientY - // nueva zona de la barra de scroll donde se ha hecho click
                scroller_controller_height / 2 // el click se hizo fuera del controlador, así que elegimos su puto medion
        }
        if (new_scroll_top < 0) {
            new_scroll_top = 0
        } else if (
            scroller_controller_height + new_scroll_top >
            scroller_bar_height
        ) {
            new_scroll_top =
                scroller_bar_height -
                scroller_controller_height
        }

        return new_scroll_top
    }

    setNewPosition(new_scroll_top) {
        this.setState({
            isScrolling: true,
            scrollTop: new_scroll_top,
            scroll_handler: Object.assign(
                {},
                this.state.scroll_handler,
                {
                    top: `${new_scroll_top}px`
                }
            )
        })
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        let newDerivedState = prevState
        if (
            nextProps.scrollToComponentData &&
            !ScrollBar.alreadyScrolledToComponent(
                nextProps.scrollToComponentData,
                prevState
            ) &&
            !ScrollBar.alreadyScrollingToAnotherComponent(
                nextProps.scrollToComponentData,
                prevState
            )
        ) {
            const currentMillseconds = Date.now()

            if (!prevState.isSoftScrolling) {
                // hey, it is deactivated, let's activate it!
                newDerivedState = { ...prevState }
                newDerivedState.lastScrollingUpdateTime =
                    currentMillseconds
                newDerivedState.isSoftScrolling = true // has to do with scrolling to a given component in the menu
                newDerivedState.firstScrollingUpdateTime =
                    currentMillseconds

                // height to scroll from
                newDerivedState.scrollToComponentData =
                    nextProps.scrollToComponentData
                newDerivedState.scrollFrom =
                    prevState.scrollTop
            }
        }
        return newDerivedState
    }

    /**
     * Any state update different of a new
     * softscrolling to component, such as
     * scrolling with mouse, will trigger
     * a new getDerivedStateFromProps
     * execution. As we cannot remove a prop
     * once the softsrolling is done, we
     * need to check if the prop event was
     * already consumed by the component.
     *
     * @param {*} componentData
     * @param {*} state
     */
    static alreadyScrolledToComponent(
        componentData,
        state
    ) {
        if (!state.lastFinishedSoftScrollingUniqueID)
            return false // no softscroll before
        const new_processed_unique_id =
            componentData.unique_id
        if (
            new_processed_unique_id ===
            state.lastFinishedSoftScrollingUniqueID
        ) {
            return true
        } else {
            return false
        }
    }

    /**
     * In order to avoid consecutive softscrolling
     * events due to fast distpatching of the action
     * creator function, we will check if we are already
     * consuming a previous event. If so, we will
     * discard the consumption of intermedian events
     * @param {*} componentData
     * @param {*} state
     */
    static alreadyScrollingToAnotherComponent(
        componentData,
        state
    ) {
        if (!state.scrollToComponentData) {
            return false
        } else if (
            componentData.component.unique_id !==
            state.scrollToComponentData.unique_id
        ) {
            return true
        } else {
            return false
        }
    }

    static calculateSoftScrollToStep(
        windowHeight: number,
        start_time: number,
        current_time: number,
        max_time: number,
        easing = ScrollBar.EasingFunctions.easeInOutQuint
    ) {
        /*
         * max_time -> 100%
         * current_time -> x%
         *
         * x = (current_time * 100) / max_time
         *
         * Como el sistema maneja de 0 a 1, x deberá dividirse entre 100 para conseguir
         * el total a aplicar a la función de tiempo.
         */

        const normalized_current_time = (current_time - start_time) / (max_time - start_time)
        const nextScrollStep = easing(normalized_current_time)
        return windowHeight * nextScrollStep
    }

    componentDidUpdate() {
        this.updateDocumentScroll(true)

        const { isSoftScrolling, scrollToComponentData } = this.state

        if (isSoftScrolling === true) {
            const timeOutFunction = () => {
                if (this.state.isSoftScrolling === true) {
                    // double checking as we are inside an asynchronous timeout block
                    const lastScrollingUpdateTime = this.state.lastScrollingUpdateTime
                    const firstScrollingUpdateTime = this.state.firstScrollingUpdateTime

                    const scrollToComponent = scrollToComponentData?.component
                    const positionObj = scrollToComponent.current.getBoundingClientRect()
                    const scrollingUniqueID = scrollToComponentData?.unique_id

                    const height_to_scroll_to =
                        positionObj.top +
                        window.scrollY +
                        this.state.scroll_handler_height /
                            2

                    const document_height =
                        document.documentElement
                            .scrollHeight
                    const calculated_height_top_innerScrollbar_to_top_component =
                        (window.innerHeight *
                            height_to_scroll_to) /
                        document_height

                    const scrollBarTop =
                        this.updateDocumentScroll(
                            false,
                            calculated_height_top_innerScrollbar_to_top_component
                        )
                    const normalizedScrollBarTop =
                        (window.innerHeight *
                            scrollBarTop) /
                        document_height

                    const diff =
                        normalizedScrollBarTop -
                        calculated_height_top_innerScrollbar_to_top_component

                    const calculated_height =
                        calculated_height_top_innerScrollbar_to_top_component -
                        diff

                    let newDerivedState = {}
                    if (
                        lastScrollingUpdateTime >
                        firstScrollingUpdateTime +
                            ScrollBar.softScrollingTime
                    ) {
                        // we went so far, we will fix it
                        newDerivedState.lastScrollingUpdateTime =
                            firstScrollingUpdateTime +
                            ScrollBar.softScrollingTime
                        newDerivedState = Object.assign(
                            newDerivedState,
                            {
                                // isScrolling: true,
                                scrollTop:
                                    calculated_height,
                                scroll_handler:
                                    Object.assign(
                                        {},
                                        this.state
                                            .scroll_handler,
                                        {
                                            top: `${calculated_height}px`
                                        }
                                    )
                            }
                        )
                    } else if (
                        lastScrollingUpdateTime ===
                        firstScrollingUpdateTime +
                            ScrollBar.softScrollingTime
                    ) {
                        // did we go so far last time? let's fix it
                        newDerivedState.isSoftScrolling = false
                        newDerivedState.isScrolling = false
                        // newDerivedState.finishedScrollingTo = scrollToComponent
                        newDerivedState.lastFinishedSoftScrollingUniqueID =
                            scrollingUniqueID
                        // newDerivedState.newSoftScrollingUniqueID = null
                        newDerivedState.scrollFrom = null
                        newDerivedState.scrollToComponentData =
                            null
                    } else {
                        const currentMillseconds =
                            Date.now()
                        const scrollFrom =
                            this.state.scrollFrom
                        const next_scrolling_step =
                            ScrollBar.calculateSoftScrollToStep(
                                calculated_height -
                                    scrollFrom,
                                firstScrollingUpdateTime,
                                currentMillseconds,
                                firstScrollingUpdateTime +
                                    ScrollBar.softScrollingTime
                            ) + scrollFrom

                        newDerivedState.lastScrollingUpdateTime =
                            currentMillseconds
                        newDerivedState = Object.assign(
                            newDerivedState,
                            {
                                isScrolling: true,
                                scrollTop:
                                    next_scrolling_step,
                                scroll_handler:
                                    Object.assign(
                                        {},
                                        this.state
                                            .scroll_handler,
                                        {
                                            top: `${next_scrolling_step}px`
                                        }
                                    )
                            }
                        )
                    }
                    this.setState(newDerivedState)
                }
            }
            const bindedTimeOutFunction =
                timeOutFunction.bind(this)
            setTimeout(
                bindedTimeOutFunction,
                ScrollBar.softScrollingTime /
                    ScrollBar.updateFrequencySoftScrolling
            )
        }
    }

    _onFirstTouch(event) {
        this.userIsTouching = true
        this.lastY_TouchPosition = event.touches[0].clientY
    }
    _onTouchEnd(event) {
        this.userIsTouching = false
        this.lastY_TouchPosition = null
    }
    _onTouchMove(event) {
        if (!this.state.isSoftScrolling) {
            const currentY = event.touches[0].clientY
            const deltaY =
                this.lastY_TouchPosition - currentY

            console.log(
                `Deb: Last: ${this.lastY_TouchPosition}. Current: ${currentY}. DeltaY: ${deltaY}`
            )

            const mousewheelEvent = new Event('wheel', {
                bubbles: true,
                cancelable: false
            })
            mousewheelEvent.deltaY = deltaY
            window.dispatchEvent(mousewheelEvent)

            this.lastY_TouchPosition =
                event.touches[0].clientY
        }
    }

    _onMouseWheel(event) {
        if (
            !this.state.isSoftScrolling &&
            this?._externalBar
        ) {
            this.isScollWithMouseWheel = true

            const mousedownEvent = new Event('mousedown', {
                bubbles: true,
                cancelable: false
            })
            mousedownEvent.clientY =
                event.deltaY + this.state.scrollTop
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
            scroll_bar: {
                backgroundColor: 'rgb(206, 208, 211)'
            },
            scroll_handler: Object.assign(
                {},
                this.state.scroll_handler,
                {
                    width: '10px'
                }
            )
        })
    }

    _onMouseLeaveFunction() {
        if (!this.state.isScrolling) {
            this.setState({
                scroll_bar: {
                    backgroundColor: 'transparent'
                },
                scroll_handler: Object.assign(
                    {},
                    this.state.scroll_handler,
                    {
                        width: '6px',
                        transition: 'width 0.15s'
                    }
                )
            })
        }
    }

    _onMouseDown = (event) => {
        if (!this.state.isSoftScrolling) {
            event.preventDefault()
            let new_scroll_top = this.getScroll(event)
            this.setNewPosition(new_scroll_top)
        }
    }

    _onInnerMouseDown(event) {
        if (!this.state.isSoftScrolling) {
            let relative_height =
                this.getRelativeHeight(event)
            this.innerClientY = relative_height
            this.innerMouseIsDown = true
        }
    }

    getRelativeHeight(ev) {
        const element = ev.currentTarget
        const rect = element.getBoundingClientRect()

        const top =
            ev.clientY -
            rect.top -
            element.clientTop +
            element.scrollTop
        return top
    }

    attachScroller = (scroller) => {
        this._scroller = scroller
    }

    attachExternalBar = (bar) => {
        this._externalBar = bar
    }
}

// function mapStateToProps(state: any) {
//     console.log(
//         'manejar scrollToComponentData por customs events y remover reducer'
//     )
//     const {
//         component_clicked_data = null
//     } = state
//     return {
//         scrollToComponentData: component_clicked_data
//     }
// }

export default ScrollBar
