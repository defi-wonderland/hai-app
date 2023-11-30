import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

import type { ReactChildren } from '~/types'

import styled from 'styled-components'
import { CenteredFlex, Flex } from '~/styles'
import { X } from '../Icons/X'
import { BrandedTitle } from '../BrandedTitle'
import { FloatingElements, type FloatingElementsProps } from '../BrandElements/FloatingElements'

export type ModalProps = {
    heading?: ReactChildren,
    children?: ReactChildren,
    footerContent?: ReactChildren,
    overrideContent?: ReactChildren,
    onClose?: () => void,
    maxWidth?: string
}
export function Modal({
    heading,
    children,
    footerContent,
    overrideContent,
    onClose,
    maxWidth
}: ModalProps) {
    const [container, setContainer] = useState<HTMLElement | null>(null)

    useEffect(() => {
        if (!container) return

        const duration = 1000

        let start = 0
        let anim: number
        const onLoop = (timestamp: number) => {
            start = start || timestamp
            const p = Math.min((timestamp - start) / duration, 1)
            const progress = 1 - Math.pow(1 - p, 3) // ease-out cubic
            container.style.transform = `translateZ(${200 * (1 - progress)}px)`

            if (progress < 1) anim = requestAnimationFrame(onLoop)
        }
        anim = requestAnimationFrame(onLoop)

        return () => {
            Object.assign(container, { transform: null })
            cancelAnimationFrame(anim)
        }
    }, [container])

    return createPortal(
        <Overlay onClick={onClose}>
            <ModalContainer
                ref={setContainer}
                $maxWidth={maxWidth}
                onClick={(e: any) => e.stopPropagation()}>
                {overrideContent || (<>
                    <ModalHeader>
                        {typeof heading === 'string'
                            ? (
                                <BrandedTitle
                                    textContent={heading.toUpperCase()}
                                    $fontSize="2.5em"
                                />
                            )
                            : heading
                        }
                        {onClose && (
                            <CloseContainer onClick={onClose}>
                                <X size={14}/>
                            </CloseContainer>
                        )}
                    </ModalHeader>
                    <ModalBody>
                        {children}
                    </ModalBody>
                    <ModalFooter>{footerContent}</ModalFooter>
                </>)}
                <FloatingElements clouds={clouds}/>
            </ModalContainer>
        </Overlay>,
        document.body
    )
}

const Overlay = styled(CenteredFlex)`
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;

    perspective-origin: 50% 50%;
    perspective: 190px;

    background-color: rgba(0,0,0,0.6);
    z-index: 998;
`

export const ModalContainer = styled(Flex).attrs(props => ({
    $column: true,
    $justify: 'stretch',
    $align: 'stretch',
    ...props
}))<{ $maxWidth?: string }>`
    position: absolute;
    width: 100%;
    max-width: min(${({ $maxWidth = '720px' }) => $maxWidth}, calc(100vw - 48px));
    max-height: calc(100vh - 320px);
    z-index: 999;
    background-color: ${({ theme }) => theme.colors.background};
    border: ${({ theme }) => theme.border.medium};
    border-radius: 24px;
    transform-style: preserve-3d;

    ${({ theme }) => theme.mediaWidth.upToExtraSmall`
        max-height: calc(100vh - 240px);
    `}
`

export const ModalHeader = styled(Flex).attrs(props => ({
    $width: '100%',
    $justify: 'space-between',
    $align: 'center',
    $gap: 12,
    $grow: 0,
    $shrink: 0,
    ...props
}))`
    padding: 24px 36px;

    ${({ theme }) => theme.mediaWidth.upToExtraSmall`
        padding: 12px 16px;
    `}
`
export const CloseContainer = styled(CenteredFlex)`
    width: 36px;
    height: 36px;
    cursor: pointer;
`

export const ModalBody = styled(Flex).attrs(props => ({
    $width: '100%',
    $column: true,
    $justify: 'stretch',
    $align: 'center',
    $grow: 1,
    ...props
}))`
    overflow: hidden auto;
    & > * {
        padding: 24px 36px;
    }

    ${({ theme }) => theme.mediaWidth.upToExtraSmall`
        & > * {
            padding: 16px;
        }
    `}
`

export const ModalFooter = styled(ModalHeader)``

const clouds: FloatingElementsProps['clouds'] = [
    {
        index: 0,
        width: '160px',
        style: {
            right: '-140px',
            bottom: '-190px',
            filter: 'brightness(0.6)'
        },
        flip: true,
        zIndex: -3
    },
    {
        index: 1,
        width: '220px',
        style: {
            right: '-220px',
            bottom: '-120px',
            filter: 'brightness(0.8)'
        },
        zIndex: -2
    },
    {
        index: 0,
        width: '200px',
        style: {
            left: '-90px',
            top: '-100px'
        },
        zIndex: 2
    }
]
