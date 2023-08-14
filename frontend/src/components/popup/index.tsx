import React, { memo, useState, useEffect, useCallback } from 'react'

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
    const closeModal = useCallback(() => {
        if (open === true) {
            onClose?.()
            setOpen(false)
        }
    }, [onClose, open])
    const openModal = useCallback(() => {
        if (open === false) {
            onOpen?.()
            setOpen(true)
        }
    }, [onOpen, open])

    useEffect(() => {
        if (openFlag) openModal()
        else closeModal()
    }, [openFlag, closeModal, openModal])

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

export default memo(ControlledPopup)