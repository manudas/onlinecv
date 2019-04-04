import React, { Component } from "react";

import { connect } from "react-redux";

class ScrollBar extends Component {

	static softScrollingTime = 1500; // in milliseconds

    static EasingFunctions = {
        // no easing, no acceleration
        linear: function(t) {
            return t;
        },
        // accelerating from zero velocity
        easeInQuad: function(t) {
            return t * t;
        },
        // decelerating to zero velocity
        easeOutQuad: function(t) {
            return t * (2 - t);
        },
        // acceleration until halfway, then deceleration
        easeInOutQuad: function(t) {
            return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        },
        // accelerating from zero velocity
        easeInCubic: function(t) {
            return t * t * t;
        },
        // decelerating to zero velocity
        easeOutCubic: function(t) {
            return --t * t * t + 1;
        },
        // acceleration until halfway, then deceleration
        easeInOutCubic: function(t) {
            return t < 0.5
                ? 4 * t * t * t
                : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
        },
        // accelerating from zero velocity
        easeInQuart: function(t) {
            return t * t * t * t;
        },
        // decelerating to zero velocity
        easeOutQuart: function(t) {
            return 1 - --t * t * t * t;
        },
        // acceleration until halfway, then deceleration
        easeInOutQuart: function(t) {
            return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
        },
        // accelerating from zero velocity
        easeInQuint: function(t) {
            return t * t * t * t * t;
        },
        // decelerating to zero velocity
        easeOutQuint: function(t) {
            return 1 + --t * t * t * t * t;
        },
        // acceleration until halfway, then deceleration
        easeInOutQuint: function(t) {
            return t < 0.5
                ? 16 * t * t * t * t * t
                : 1 + 16 * --t * t * t * t * t;
        }
	};
	
	static updateFrequencySoftScrolling = 120; // in frames per second

    constructor(props) {
        super(props);
        this.state = {
            inner_bar1: {
                width: "6px",
                top: "0px"
            },
            isScrolling: false,
            scrollTop: 0
        };
        this.innerClientY = 0;
        this.innerMouseIsDown = false;

        const body = document.getElementsByTagName("body")[0];
        body.style.overflowY = "hidden";

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

    registerWheelEvent() {
        // window.onWheel = this.onMouseWheel.bind(this);
        window.addEventListener("wheel", this.onMouseWheel.bind(this));
    }

    onMouseWheel(event) {
        const mousedownEvent = document.createEvent("HTMLEvents");
        mousedownEvent.initEvent("mousedown", true, false);
        mousedownEvent.clientY =
            event.deltaY + parseInt(this.state.inner_bar1.top, 10);
        this._externalBar.dispatchEvent(mousedownEvent);

        const mouseupEvent = document.createEvent("HTMLEvents");
        mouseupEvent.initEvent("mouseup", true, false);
        this._externalBar.dispatchEvent(mouseupEvent);
    }

    onMouseEnterFunction() {
        this.setState({
            bar1: {
                backgroundColor: "rgb(206, 208, 211)"
            },
            inner_bar1: Object.assign({}, this.state.inner_bar1, {
                width: "10px"
            })
        });
    }

    onMouseLeaveFunction() {
        if (!this.state.isScrolling) {
            this.setState({
                bar1: {
                    backgroundColor: "transparent"
                },
                inner_bar1: Object.assign({}, this.state.inner_bar1, {
                    width: "6px",
                    transition: "width 0.15s"
                })
            });
        }
    }

    render() {
        const bar1_bc =
            this.state && this.state.bar1 && this.state.bar1.backgroundColor
                ? this.state.bar1.backgroundColor
                : null;
        const bar1_struct = bar1_bc ? { backgroundColor: bar1_bc } : {};
        const inner_bar1_struct = this.state.inner_bar1;

        return (
            <div
                key="bar1"
                id="ascrail2000"
                className="nicescroll-rails"
                ref={this.attachExternalBar}
                style={{
                    width: "12px",
                    zIndex: "auto",
                    cursor: "default",
                    position: "fixed",
                    top: "0px",
                    height: "100%",
                    right: "0px",
                    opacity: "0.8",
                    borderRadius: "10px",
                    ...bar1_struct
                }}
                onMouseEnter={this.onMouseEnterFunction.bind(this)}
                onMouseLeave={this.onMouseLeaveFunction.bind(this)}
                onMouseDown={this.onMouseDown.bind(this)}
                onMouseUp={this.bindedOnUp}>
                <div
                    onMouseDown={this.onInnerMouseDown.bind(this)}
                    ref={this.attachScroller}
                    style={{
                        position: "relative",
                        float: "right",
                        height: `${this.innerBarHeight}px`,
                        backgroundColor: "rgb(0, 0, 0)",
                        border: "1px solid rgb(255, 255, 255)",
                        backgroundClip: "padding-box",
                        borderRadius: "10px",
                        ...inner_bar1_struct
                    }}
                />
            </div>
        );
    }

    updateDocumentScroll(updateScroll = true, scrollTo = null) {


		const _scrollTo = scrollTo || this.state.scrollTop

		const top_inner_bar = parseInt(
			
			
			_scrollTo, // will it be correct?
			
			
			
			
			10);
		


















        const bottom_inner = top_inner_bar + this.innerBarHeight;
        const inner_bar_middle_point = (bottom_inner + top_inner_bar) / 2;

        const document_height = document.documentElement.scrollHeight;

        const min_inner_middle_point_allowed = 0 + this.innerBarHeight / 2;
        const max_inner_middle_bar_allowed =
            this.windowHeight - this.innerBarHeight / 2;

        const _top_scroll_to_percentage =
            (inner_bar_middle_point - min_inner_middle_point_allowed) /
            max_inner_middle_bar_allowed;
        let _top_scroll_to =
            (document_height - this.windowHeight) * _top_scroll_to_percentage;

		if (updateScroll)
			window.scroll(0, _top_scroll_to);
		
		return _top_scroll_to;
    }

    getSnapshotBeforeUpdate = (nextProps, nextState) => {
        if (this.state.isScrolling !== nextState.isScrolling) {
			if (this.state.isScrolling && this.state.isSoftScrolling) {
				this.toggleScrolling(false);
			} else {
				this.toggleScrolling(this.state.isScrolling);
			}
		}
		return null;
    };

    toggleScrolling = isEnable => {
        if (isEnable) {
            window.addEventListener("mousemove", this.bindedOnMove);
            window.addEventListener("mouseup", this.bindedOnUp);
        } else {
            window.removeEventListener("mousemove", this.bindedOnMove);
        }
    };

    onMouseMove = event => {
        if (this.state.isScrolling) {
            let new_scroll_top = this.getScroll(event);
            this.setNewPosition(new_scroll_top);

            // debugging
            const scroller_bar_height = this._scroller.parentElement
                .clientHeight;
            const scroller_controller_height = this._scroller.clientHeight;
            if (
                new_scroll_top + scroller_controller_height >
                scroller_bar_height
            ) {
                console.log("ha superado el maximo en move");
            }
        }
    };

    onMouseUp = event => {
        this.resetScollerMovementStatus();
        if (
            event.currentTarget !== this._scroller &&
            event.currentTarget !== this._scroller.parentElement
        ) {
            this.onMouseLeaveFunction(event);
        }
        event.stopPropagation();
    };

    resetScollerMovementStatus() {
        this.setState({
            isScrolling: false
        });
        this.innerMouseIsDown = false;
        this.innerClientY = 0;
    }

    getScroll(event) {
        let new_scroll_top = 0;
        const scroller_bar_height = this._scroller.parentElement.clientHeight;
        const scroller_controller_height = this._scroller.clientHeight;
        if (this.innerMouseIsDown) {
            new_scroll_top =
                +event.clientY - this.innerClientY; // nueva zona de la barra de scroll donde se ha hecho click // zona dentro del manejador de scroll donde se hizo click
        } else {
            new_scroll_top =
                +event.clientY - // nueva zona de la barra de scroll donde se ha hecho click
                scroller_controller_height / 2; // el click se hizo fuera del controlador, así que elegimos su puto medion
        }
        if (new_scroll_top < 0) {
            new_scroll_top = 0;
        } else if (
            scroller_controller_height + new_scroll_top >
            scroller_bar_height
        ) {
            new_scroll_top = scroller_bar_height - scroller_controller_height;
        }
        // console.log('ahora toca q no supere la pantalla el control del scroll');
        return new_scroll_top;
    }

    setNewPosition(new_scroll_top) {
        this.setState({
            isScrolling: true,
            scrollTop: new_scroll_top,
            //clientY: event.clientY,
            inner_bar1: Object.assign({}, this.state.inner_bar1, {
                top: `${new_scroll_top}px`
            })
        });
    }

    static getDerivedStateFromProps(nextProps, prevState) {
		let newDerivedState = prevState;
		if (nextProps.scrollToComponentData && 
				!ScrollBar.alreadyScrolledToComponent(nextProps.scrollToComponentData, prevState) &&
				!ScrollBar.alreadyScrollingToAnotherComponent(nextProps.scrollToComponentData, prevState)) {
			const currentMillseconds = Date.now();
			if (!prevState.isSoftScrolling) { // hey, it is deactivated, let's activate it!
				newDerivedState = {...prevState};
				newDerivedState.lastScrollingUpdateTime = currentMillseconds;
				newDerivedState.isSoftScrolling = true;
				newDerivedState.firstScrollingUpdateTime = currentMillseconds;
				// newDerivedState.finishedScrollingTo = null;
				// newDerivedState.newSoftScrollingUniqueID = nextProps.scrollToComponentData.unique_id;

				// height to scroll from
				newDerivedState.scrollToComponentData = nextProps.scrollToComponentData;
				newDerivedState.scrollFrom = prevState.scrollTop;
			}
		}
		return newDerivedState;
	}

	/**
	 * Any state update different of a new
	 * softscrolling to component, such as 
	 * scrolling with mouse, will trigger 
	 * a new getDerivedStateFromProps 
	 * execution. As we cannot remove a prop
	 * once the sotfrsrolling is done, we
	 * need to check if the prop event was
	 * already consumed by the component.
	 * 
	 * @param {*} componentData 
	 * @param {*} state 
	 */
	static alreadyScrolledToComponent(componentData, state) {
		if (!state.lastFinishedSoftScrollingUniqueID) return false; // no softscroll before
		const new_processed_unique_id = componentData.unique_id;
		if (new_processed_unique_id === state.lastFinishedSoftScrollingUniqueID) {
			return true;
		} else {
			return false;
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
	static alreadyScrollingToAnotherComponent(componentData, state) {
		if (!state.scrollToComponentData) {
			return false;
		} else if (componentData.component.unique_id !== state.scrollToComponentData.unique_id) {
			return true;
		} else {
			return false;
		}
	}

	static calculateSoftScrollToStep(windowHeight, start_time, current_time, max_time, easing = ScrollBar.EasingFunctions.easeInOutQuint) {
		/*
		* max_time -> 100%
		* current_time -> x%
		* 
		* x = (current_time * 100) / max_time
		* 
		* Como el sistema maneja de 0 a 1, x deberá dividirse entre 100 para conseguir 
		* el total a aplicar a la función de tiempo.
		*/
		
		// Normalized max time = 1.0
		// const normalized_max_time = 1.0;
		// Normalized min time = 0.0;
		// const normalized_min_time = 0.0;
		// Normalized current time
		const normalized_current_time = (current_time - start_time) / (max_time - start_time);
		const nextScrollStep = easing(normalized_current_time);
		return windowHeight * nextScrollStep;
	}

	componentDidUpdate() {
		this.updateDocumentScroll(true);	

		if (this.state.isSoftScrolling === true) {
			const timeOutFunction = () => { 
				const lastScrollingUpdateTime = this.state.lastScrollingUpdateTime;
				const firstScrollingUpdateTime = this.state.firstScrollingUpdateTime;
							
				const scrollToComponent = this.state.scrollToComponentData.component;
				const positionObj = scrollToComponent.current.getBoundingClientRect();
				const scrollingUniqueID = scrollToComponent.unique_id;

				/*	
					100 -> x
					2000 -> 900 window.innerHeight

					x = (900*100) / 2000
							
					const document_height = document.documentElement.scrollHeight;
					x = (window.innerHeight * 100 ) / document_height
					
					siendo 100 la altura proporcional del ejemplo tenemos si la sustituimos por la profundidad buscada del documento:
					x = (window.innerHeight * y ) / document_height

				*/

				const height_to_scroll_to = (positionObj.top + window.scrollY) + (this.innerBarHeight/2);

				const document_height = document.documentElement.scrollHeight;
				const calculated_height_top_innerScrollbar_to_top_component = (window.innerHeight * height_to_scroll_to ) / document_height ;

				const scrollBarTop = this.updateDocumentScroll(false, calculated_height_top_innerScrollbar_to_top_component );	
				const normalizedScrollBarTop = (window.innerHeight * scrollBarTop ) / document_height;

				const diff = (normalizedScrollBarTop - calculated_height_top_innerScrollbar_to_top_component) ;

				const calculated_height = (calculated_height_top_innerScrollbar_to_top_component - diff) ;

				let newDerivedState = {};
				if (lastScrollingUpdateTime > firstScrollingUpdateTime + ScrollBar.softScrollingTime) { // we went so far, we will fix it
					newDerivedState.lastScrollingUpdateTime = firstScrollingUpdateTime + ScrollBar.softScrollingTime;
					newDerivedState = Object.assign(newDerivedState,
													{
														// isScrolling: true,
														scrollTop: calculated_height,
														inner_bar1: Object.assign({}, this.state.inner_bar1, {
															top: `${calculated_height}px`
														})
													}
					);
				} else if (lastScrollingUpdateTime ===
								firstScrollingUpdateTime + ScrollBar.softScrollingTime) { // did we go so far last time? let's fix it
					newDerivedState.isSoftScrolling = false;
					newDerivedState.isScrolling = false;
					// newDerivedState.finishedScrollingTo = scrollToComponent;
					newDerivedState.lastFinishedSoftScrollingUniqueID = scrollingUniqueID;
					// newDerivedState.newSoftScrollingUniqueID = null;
					newDerivedState.scrollFrom = null;
					newDerivedState.scrollToComponentData = null ;
				} else {
					const currentMillseconds = Date.now();
					const scrollFrom = this.state.scrollFrom;
					const next_scrolling_step = ScrollBar.calculateSoftScrollToStep(
						calculated_height - scrollFrom,
						firstScrollingUpdateTime,
						currentMillseconds,
						firstScrollingUpdateTime + ScrollBar.softScrollingTime
					) + scrollFrom;
					


					newDerivedState.lastScrollingUpdateTime = currentMillseconds;
					newDerivedState = Object.assign(newDerivedState,
													{
														isScrolling: true,
														scrollTop: next_scrolling_step,
														inner_bar1: Object.assign({}, this.state.inner_bar1, {
															top: `${next_scrolling_step}px`
														})
													}
					);
				}
				this.setState(newDerivedState);
			};
			const bindedTimeOutFunction = timeOutFunction.bind(this);
			setTimeout(bindedTimeOutFunction
							, ScrollBar.softScrollingTime / ScrollBar.updateFrequencySoftScrolling);
		}
    }

    onMouseDown = event => {
        event.preventDefault();
        let new_scroll_top = this.getScroll(event);
        this.setNewPosition(new_scroll_top);

        const scroller_bar_height = this._scroller.parentElement.clientHeight;
        const scroller_controller_height = this._scroller.clientHeight;
        if (new_scroll_top + scroller_controller_height > scroller_bar_height) {
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

        const top =
            ev.clientY - rect.top - element.clientTop + element.scrollTop;
        return top;
    }

    attachScroller = scroller => {
        this._scroller = scroller;
    };

    attachExternalBar = bar => {
        this._externalBar = bar;
    };
}

function mapStateToProps(state) {
    const component_clicked_data =
        state && state.component_clicked_data ? state.component_clicked_data : null;

    return {
        scrollToComponentData: component_clicked_data
    };
}

export default connect(mapStateToProps)(ScrollBar);
