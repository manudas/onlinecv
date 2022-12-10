import { EventType } from 'helpers/customEvents'
import ScrollBar from '.'

export const unregisterEvents = ({
    onFirstTouch,
    onTouchEnd,
    onTouchMove,
    onMouseWheel,
    scrollToSection,
    onMouseMove,
    onMouseUp
}: ScrollBar ) => {
    document.removeEventListener('touchstart', onFirstTouch)
    document.removeEventListener('touchend', onTouchEnd)
    document.removeEventListener('touchmove', onTouchMove)
    document.removeEventListener('wheel', onMouseWheel)
    document.removeEventListener(EventType[EventType.SCROLL_TO_SECTION], scrollToSection)
    document.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mouseup', onMouseUp)
}

export const registerEvents = ({
    onFirstTouch,
    onTouchEnd,
    onTouchMove,
    onMouseWheel,
    scrollToSection,
    onMouseMove,
    onMouseUp
}: ScrollBar ) => {
    document.addEventListener('touchstart', onFirstTouch)
    document.addEventListener('touchend', onTouchEnd)
    document.addEventListener('touchmove', onTouchMove)
    document.addEventListener('wheel', onMouseWheel)
    document.addEventListener(EventType[EventType.SCROLL_TO_SECTION], scrollToSection)
    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
}

export const EasingFunctions = {
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

export const calculateSoftScrollToStep = (
    destinationHeight: number,
    start_time: number,
    current_time: number,
    max_time: number,
    easing = ScrollBar.EasingFunctions.easeInOutQuint
) => {
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
    return destinationHeight * nextScrollStep
}