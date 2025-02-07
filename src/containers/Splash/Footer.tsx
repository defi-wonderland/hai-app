import { LINK_TO_DISCORD, LINK_TO_DOCS, LINK_TO_TELEGRAM, LINK_TO_TWITTER } from '~/utils'

import styled from 'styled-components'
import { CenteredFlex, Flex, Grid, Text } from '~/styles'
import { Elf } from '~/components/BrandElements/Elf'
import { Twitter } from '~/components/Icons/Twitter'
import { Telegram } from '~/components/Icons/Telegram'
import { Discord } from '~/components/Icons/Discord'
// import { InternalLink } from '~/components/InternalLink'
import { ExternalLink } from '~/components/ExternalLink'

import haiLogo from '~/assets/logo.png'

export function Footer() {
    return (
        <Container as="footer">
            <Inner>
                <Description>
                    <Logo src={haiLogo} width={701} height={264} alt="HAI" />
                    <Text $fontSize="0.8em" $fontWeight={700}>
                        HAI is a multi-collateral, over-collateralized CDP-minted stablecoin, using a PID controller to
                        induce stability.
                    </Text>
                    <Text $fontSize="0.8em">
                        {`HAI adopts a mechanism familiar to stablecoin protocols; it is minted from over-collateralized debt positions (CDPs). In essence, every HAI token in circulation corresponds to a greater amount of collateral locked by individual protocol users, also known as minters. These minters can generate or annihilate HAI, depending on their collateral's value. This approach aligns with systems employed by other cryptocurrencies like DAI, RAI, and many others.`}
                    </Text>
                </Description>
                <LinksContainer>
                    <Grid $columns="1fr min-content" $gap={12}>
                        {/* <Flex
                            $column
                            $gap={12}>
                            <Text $fontWeight={700}>About</Text>
                            <InternalLink
                                href="/privacy"
                                $textDecoration="none">
                                Privacy
                            </InternalLink>
                            <InternalLink
                                href="/terms"
                                $textDecoration="none">
                                Terms
                            </InternalLink>
                        </Flex> */}
                        <Flex $column $gap={12}>
                            <Text $fontWeight={700}>Resources</Text>
                            <ExternalLink href={LINK_TO_DOCS} $textDecoration="none">
                                Docs
                            </ExternalLink>
                        </Flex>
                        <IconContainer>
                            <ExternalLink href={LINK_TO_TWITTER} $textDecoration="none">
                                <Twitter size={28} />
                            </ExternalLink>
                            <ExternalLink href={LINK_TO_TELEGRAM} $textDecoration="none">
                                <Telegram size={32} />
                            </ExternalLink>
                            <ExternalLink href={LINK_TO_DISCORD} $textDecoration="none">
                                <Discord size={32} />
                            </ExternalLink>
                        </IconContainer>
                    </Grid>
                </LinksContainer>
                <ElfContainer $shrink={0}>
                    <Elf variant={5} width="100%" animated />
                </ElfContainer>
            </Inner>
            <Bottom>© 2024 HAI</Bottom>
        </Container>
    )
}

const Container = styled(Flex).attrs((props) => ({
    $width: '100%',
    $column: true,
    $justify: 'stretch',
    $align: 'stretch',
    ...props,
}))`
    position: relative;
    overflow: hidden;
    background: ${({ theme }) => theme.colors.gradient};
    border-top: ${({ theme }) => theme.border.medium};
    margin-top: 80vh;
    scroll-snap-align: end;

    z-index: 3;
`

const Inner = styled(Flex).attrs((props) => ({
    $width: '100%',
    $justify: 'space-between',
    $align: 'flex-start',
    $gap: 48,
    ...props,
}))`
    padding: 48px;
    padding-top: 60px;
    ${({ theme }) => theme.mediaWidth.upToMedium`
        flex-direction: column;
        align-items: center;
    `}
    ${({ theme }) => theme.mediaWidth.upToSmall`
        padding: 24px;
        padding-top: 36px;
        gap: 24px;
    `}
`
const Description = styled(Grid).attrs((props) => ({
    $columns: '1fr',
    $align: 'flex-start',
    $gap: 24,
    ...props,
}))`
    max-width: 520px;

    ${({ theme }) => theme.mediaWidth.upToMedium`
        max-width: 480px;
    `}
    ${({ theme }) => theme.mediaWidth.upToSmall`
        max-width: 100%;
        font-size: 0.8rem;
    `}
    ${({ theme }) => theme.mediaWidth.upToExtraSmall`
        grid-template-columns: min-content 1fr;
        & > *:last-child {
            grid-column: 1 / -1;
        }
    `}
`
const Logo = styled.img`
    width: 200px;
    height: auto;

    ${({ theme }) => theme.mediaWidth.upToSmall`
        width: 160px;
    `}
    ${({ theme }) => theme.mediaWidth.upToExtraSmall`
        width: min(100px, 25vw);
    `}
`

const LinksContainer = styled(Flex).attrs((props) => ({
    $width: '100%',
    $column: true,
    $justify: 'space-between',
    $align: 'stretch',
    $gap: 48,
    ...props,
}))`
    max-width: min(calc(100vw - 48px), 400px);

    ${({ theme }) => theme.mediaWidth.upToSmall`
        max-width: 100%;
        gap: 24px;
        & > ${Grid} {
            width: fit-content;
            grid-gap: 48px;
        }
    `}
`
const IconContainer = styled(Flex).attrs((props) => ({
    $justify: 'center',
    $align: 'flex-start',
    $gap: 24,
    ...props,
}))`
    & svg {
        height: 24px;
        width: auto;
        fill: black;
        stroke: none;
    }
`

const ElfContainer = styled(CenteredFlex)`
    position: relative;
    width: 100%;
    max-width: 280px;
    align-self: flex-end;
    flex-shrink: 1;
    margin-left: -100px;
    & > * {
        left: 48px;
        bottom: -120px;
        transform: rotate(-10deg);
    }
    ${({ theme }) => theme.mediaWidth.upToSmall`
        max-width: 40vw;
        left: auto;
        right: -10vw;
        z-index: 0;
        margin-top: -24px;
    `}
`

const Bottom = styled(Flex).attrs((props) => ({
    $width: '100%',
    $justify: 'flex-start',
    $align: 'center',
    ...props,
}))`
    padding: 24px 48px;
    border-top: ${({ theme }) => theme.border.thin};
    font-size: 0.8rem;

    ${({ theme }) => theme.mediaWidth.upToExtraSmall`
        padding: 12px;
    `}
`
