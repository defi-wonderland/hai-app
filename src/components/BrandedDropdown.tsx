import { type HTMLProps, useState } from 'react'

import type { ReactChildren } from '~/types'
import { useOutsideClick } from '~/hooks'

import styled, { css } from 'styled-components'
import { CenteredFlex, Flex, HaiButton, type HaiButtonProps, Popout } from '~/styles'
import { Caret } from './Icons/Caret'
import { ArrowUpRight } from 'react-feather'
import { InternalLink } from './InternalLink'
import { ExternalLink } from './ExternalLink'

type ButtonProps = Omit<HTMLProps<HTMLButtonElement>, 'ref' | 'as' | 'type' | 'label' | 'children'>
type BrandedDropdownProps = ButtonProps &
    HaiButtonProps & {
        width?: string
        label: ReactChildren
        children: ReactChildren
    }
export function BrandedDropdown({ width, label, children, ...props }: BrandedDropdownProps) {
    const [container, setContainer] = useState<HTMLElement | null>(null)
    const [expanded, setExpanded] = useState(false)

    useOutsideClick(container, () => setExpanded(false))

    return (
        <Container ref={setContainer} {...props} onClick={() => setExpanded((e) => !e)}>
            {label}
            <IconContainer $rotate={expanded}>
                <Caret direction="down" />
            </IconContainer>
            <Dropdown $width={width} $float="left" $margin="20px" hidden={!expanded}>
                {children}
            </Dropdown>
        </Container>
    )
}

BrandedDropdown.Item = DropdownItem

const Container = styled(HaiButton)`
    position: relative;
    height: 48px;
    z-index: 1;
`

const IconContainer = styled(CenteredFlex)<{ $rotate?: boolean }>`
    transition: all 0.5s ease;
    transform: ${({ $rotate }) => ($rotate ? 'rotate(-180deg)' : 'rotate(0deg)')};
    margin-left: 12px;
`

const Dropdown = styled(Popout)`
    width: ${({ $width = 'fit-content' }) => $width};
    padding: 24px;
    margin-right: -16px;
    gap: 12px;
    z-index: 2;
`

export const DropdownOption = styled(Flex).attrs((props) => ({
    $width: '100%',
    $align: 'center',
    $gap: 12,
    ...props,
}))<{ $active?: boolean }>`
    min-width: 160px;
    padding: 8px 16px;
    border-radius: 999px;
    border: 2px solid rgba(0, 0, 0, 0.1);
    cursor: pointer;

    ${({ $active }) =>
        !!$active &&
        css`
            background-color: rgba(0, 0, 0, 0.1);
        `}
    &:hover {
        background-color: rgba(0, 0, 0, 0.1);
    }
`

type DropdownItemProps = {
    icon: ReactChildren
    children: ReactChildren
} & (
    | {
          href: string
          type?: 'internal' | 'external'
          onClick?: undefined
      }
    | {
          href?: undefined
          type?: undefined
          onClick: () => void
      }
)
function DropdownItem({ icon, children, href, type, onClick }: DropdownItemProps) {
    const item = (
        <DropdownOption onClick={onClick}>
            {icon}
            <Flex $width="100%" $justify="space-between" $align="center" $gap={8}>
                {children}
                {(type === 'external' || (!!href && !href.startsWith('/'))) && <ArrowUpRight size={18} />}
            </Flex>
        </DropdownOption>
    )

    if (onClick) return item

    if (type === 'internal' || href.startsWith('/'))
        return <InternalLink href={href} $width="100%" $textDecoration="none" content={item} />

    return (
        <ExternalLink href={href} $textDecoration="none">
            {item}
        </ExternalLink>
    )
}
