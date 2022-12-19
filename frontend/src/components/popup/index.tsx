import React, { useState, useEffect } from 'react'

import { translateString } from 'helpers/translations'

import './styles.scss'

const ControlledPopup = ({
    title,
    message,
    openFlag,
    onClose,
    onOpen,
} : {
    title?: string | undefined,
    message: string | React.ReactNode,
    openFlag: boolean
    onClose?: Function,
    onOpen?: Function,
}) => {
    const [open, setOpen] = useState(openFlag)
    const closeModal = () => {
        onClose?.()
        setOpen(false)
    }
    const openModal = () => {
        onOpen?.()
        setOpen(true)
    }

    useEffect(() => {
        if (openFlag) openModal()
        else closeModal()
    }, [openFlag])

    const avoidEventCapturing = (e: React.MouseEvent) => {
        e.stopPropagation()
    }

    return (
        open
        ? <section className='popUp__Modal' onClick={closeModal}>
            <div
                onClick={avoidEventCapturing}
                className='popUp__container'
            >
                {
                    title
                        ? <div
                            className='popUp__title'
                        >
                            { title }
                        </div>
                        : null
                }
                <span
                    className='popUp__close'
                    onClick={closeModal}
                    title={ translateString('Close', 'ControlledPopup') }
                >
                    X
                </span>
                <div
                    className='popUp__content'
                >
                    { message }
                </div>
            </div>
        </section>
        : null
    )
}

export default ControlledPopup