export type StateDef = {
    scroll_handler: {
        width: string,
        top: string,
        height: string
    },
    isScrolling: boolean,
    scrollTop: number,
    windowHeight: number,
    scroll_handler_height: number,
    scroll_bar: {
        backgroundColor: string,
    },
    isSoftScrolling: boolean,
    lastScrollingUpdateTime: number,
    firstScrollingUpdateTime: number,
    scrollToComponentData: React.Ref<any>,
}
