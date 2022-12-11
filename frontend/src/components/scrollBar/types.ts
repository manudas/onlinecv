export type StateDef = {
    scroll_handler: {
        width: string
        height: string
        transition: string
    },
    isScrolling: boolean
    scrollTop: number
    windowHeight: number
    scroll_handler_height: number
    scroll_bar: {
        backgroundColor: string
    },
    scrollToComponentData: {
        component: {
            current: HTMLElement | null
        },
        unique_id: string
    } | null
}
