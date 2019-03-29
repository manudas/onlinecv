import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class ScrollBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inner_bar1: {
                width: '6px',
                top: '0px'
            },
            isScrolling: false,
            scrollTop: 0,

        };
        this.innerClientY = 0;
        this.innerMouseIsDown = false;

        const body = document.getElementsByTagName('body')[0];
        body.style.overflowY = 'hidden';

        this.bindedOnMove = this.onMouseMove.bind(this);
        this.bindedOnUp = this.onMouseUp.bind(this);

        this.windowHeight = window.innerHeight;
        this.innerBarHeight = this.windowHeight / 10;

         /**
         * @TODO register touchEvent and related behaviour
         */

        // this.wheel_movement_quantity = this.windowHeight / 10; 
        this.registerWheelEvent();
        // this.registerTouchEvent();

    }
    
    componentDidMount() {
       
    }

    registerWheelEvent(){
        // window.onWheel = this.onMouseWheel.bind(this);
        window.addEventListener("wheel", this.onMouseWheel.bind(this));
    }

    onMouseWheel(event) {
        const mousedownEvent = document.createEvent('HTMLEvents');
        mousedownEvent.initEvent('mousedown', true, false);
        mousedownEvent.clientY = event.deltaY + parseInt(this.state.inner_bar1.top);
        this._externalBar.dispatchEvent(mousedownEvent);

        const mouseupEvent = document.createEvent('HTMLEvents');
        mouseupEvent.initEvent('mouseup', true, false);
        this._externalBar.dispatchEvent(mouseupEvent);
    }

    onMouseEnterFunction() {
        this.setState({
            bar1: {
                backgroundColor: 'rgb(206, 208, 211)'
            },
            inner_bar1:
                Object.assign(
                    {},
                    this.state.inner_bar1,
                    {
                        width: '10px'
                    })
        }
        );
    }

    onMouseLeaveFunction() {
        if (!this.state.isScrolling) {
            this.setState({
                bar1: {
                    backgroundColor: 'transparent'
                },
                inner_bar1:
                    Object.assign(
                        {},
                        this.state.inner_bar1,
                        {
                            width: '6px',
                            transition: 'width 0.15s'
                        })
            }
            );
        }
    }

    render() {
        const bar1_bc = (this.state && this.state.bar1 && this.state.bar1.backgroundColor)
            ? this.state.bar1.backgroundColor : null;
        const bar1_struct = bar1_bc ? { backgroundColor: bar1_bc } : {};
        const inner_bar1_struct = this.state.inner_bar1;

        return (
            <div key='bar1'
                id="ascrail2000"
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
                    ...bar1_struct
                }}
                onMouseEnter={this.onMouseEnterFunction.bind(this)}
                onMouseLeave={this.onMouseLeaveFunction.bind(this)}
                onMouseDown={this.onMouseDown.bind(this)}
                onMouseUp={this.bindedOnUp} 
            >
                <div
                    onMouseDown={this.onInnerMouseDown.bind(this)}
                    ref={this.attachScroller}
                    style={{
                        position: 'relative',
                        float: 'right',
                        height: `${this.innerBarHeight}px`,
                        backgroundColor: 'rgb(0, 0, 0)',
                        border: '1px solid rgb(255, 255, 255)',
                        backgroundClip: 'padding-box',
                        borderRadius: '10px',
                        ...inner_bar1_struct
                    }}
                ></div>
            </div>
        );
    }

    componentDidUpdate() {
        this.updateDocumentScroll();
    }

    updateDocumentScroll() {
        const top_inner_bar = parseInt(this.state.inner_bar1.top);
        const bottom_inner = top_inner_bar + this.innerBarHeight;
        const inner_bar_middle_point = (bottom_inner + top_inner_bar) / 2;

        const document_height = document.documentElement.scrollHeight;

        const min_inner_middle_point_allowed = 0 + (this.innerBarHeight / 2);
        const max_inner_middle_bar_allowed = this.windowHeight - (this.innerBarHeight / 2);

        const _top_scroll_to_percentage = (inner_bar_middle_point - min_inner_middle_point_allowed ) / max_inner_middle_bar_allowed;
        let _top_scroll_to = ( document_height - this.windowHeight ) * _top_scroll_to_percentage;

        window.scroll(0, _top_scroll_to);
    }

    componentWillUpdate = (nextProps, nextState) => {
        if (this.state.isScrolling !== nextState.isScrolling) {
            this.toggleScrolling(nextState.isScrolling);
        }
    };

    toggleScrolling = (isEnable) => {
        if (isEnable) {
            window.addEventListener('mousemove', this.bindedOnMove);
            window.addEventListener('mouseup', this.bindedOnUp);
        } else {
            window.removeEventListener('mousemove', this.bindedOnMove);
        }
    };

    onMouseMove = (event) => {
        if (this.state.isScrolling) {
            let new_scroll_top = this.getScroll(event);
            this.setNewPosition(new_scroll_top);

            // debugging
            const scroller_bar_height = this._scroller.parentElement.clientHeight;
            const scroller_controller_height = this._scroller.clientHeight;
            if ((new_scroll_top + scroller_controller_height) > 
            scroller_bar_height) {
                console.log("ha superado el maximo en move");
            }
        }
    };

    onMouseUp = (event) => {
        this.resetScollerMovementStatus();
        if (event.currentTarget != this._scroller
            && event.currentTarget != this._scroller.parentElement) {
            this.onMouseLeaveFunction(event);
        }
        event.stopPropagation();
    };

    resetScollerMovementStatus() {
        this.setState({
            isScrolling: false,

        });
        this.innerMouseIsDown = false;
        this.innerClientY = 0;
    }

    getScroll(event) {
        const { scrollTop } = this.state;
        let new_scroll_top = 0;
        const scroller_bar_height = this._scroller.parentElement.clientHeight;
        const scroller_controller_height = this._scroller.clientHeight;
        if (this.innerMouseIsDown) {
            new_scroll_top =
                + event.clientY // nueva zona de la barra de scroll donde se ha hecho click
                - this.innerClientY; // zona dentro del manejador de scroll donde se hizo click
        } else {
            new_scroll_top =
                + event.clientY // nueva zona de la barra de scroll donde se ha hecho click
                - scroller_controller_height / 2; // el click se hizo fuera del controlador, así que elegimos su puto medion
        }
        if (new_scroll_top < 0) {
            new_scroll_top = 0;
        } else if ((scroller_controller_height + new_scroll_top) > scroller_bar_height) {
            new_scroll_top = (scroller_bar_height - scroller_controller_height);
        }
        // console.log('ahora toca q no supere la pantalla el control del scroll');
        return new_scroll_top;
    }

    setNewPosition(new_scroll_top) {
        this.setState(
            {
                isScrolling: true,
                scrollTop: new_scroll_top,
                //clientY: event.clientY,
                inner_bar1:
                    Object.assign(
                        {},
                        this.state.inner_bar1,
                        {
                            top: `${new_scroll_top}px`
                        }),
            }
        );
    }

    onMouseDown = (event) => {
        event.preventDefault();
        let new_scroll_top = this.getScroll(event);
        this.setNewPosition(new_scroll_top);

        const scroller_bar_height = this._scroller.parentElement.clientHeight;
        const scroller_controller_height = this._scroller.clientHeight;
        if ((new_scroll_top + scroller_controller_height) > scroller_bar_height) {
            console.log("ha superado el maximo en down");
        }
    };

    onInnerMouseDown(event) {
        let relative_height = this.getRelativeHeight(event);
        this.innerClientY = relative_height;
        this.innerMouseIsDown = true;
    }

    getRelativeHeight(ev) {
        const element = ev.currentTarget;
        const rect = element.getBoundingClientRect();

        const top = ev.clientY - rect.top - element.clientTop + element.scrollTop;
        return top;
    }

    attachScroller = (scroller) => {
        this._scroller = scroller;
    };

    attachExternalBar = (bar) => {
        this._externalBar = bar;
    }
}

export default ScrollBar;