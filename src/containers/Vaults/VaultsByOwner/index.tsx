import { useState } from 'react'
import { useParams } from 'react-router-dom'

import { Status, formatNumberWithStyle, returnWalletAddress } from '~/utils'
import { useStoreState } from '~/store'
import { useMediaQuery, useVaultsByOwner } from '~/hooks'

import styled from 'styled-components'
import { BlurContainer, CenteredFlex, Flex, Grid, TableButton, Text } from '~/styles'
import { BrandedTitle } from '~/components/BrandedTitle'
import { Pagination } from '~/components/Pagination'
import { StatusLabel } from '~/components/StatusLabel'
import { BrandedDropdown, DropdownOption } from '~/components/BrandedDropdown'
import { TokenPair } from '~/components/TokenPair'
import { LiquidateVaultModal } from '~/components/Modal/LiquidateVaultModal'
import { SortByDropdown } from '~/components/SortByDropdown'
import { Table, TableContainer } from '~/components/Table'

const RECORDS_PER_PAGE = 10

export function VaultsByOwner() {
    const { idOrOwner } = useParams<{ idOrOwner?: string }>()

    const {
        connectWalletModel: { tokensData },
    } = useStoreState((state) => state)

    const symbols = Object.values(tokensData || {})
        .filter(({ isCollateral }) => isCollateral)
        .map(({ symbol }) => symbol)

    const isLargerThanSmall = useMediaQuery('upToSmall')

    const {
        invalidAddress,
        error,
        loading,
        headers,
        rows,
        sorting,
        setSorting,
        collateralFilter,
        setCollateralFilter,
    } = useVaultsByOwner(idOrOwner)

    const [offset, setOffset] = useState(0)

    const [liquidateVault, setLiquidateVault] = useState<{
        id: string
        collateralRatio: string
        status: Status
    }>()

    return (
        <>
            {!!liquidateVault && (
                <LiquidateVaultModal onClose={() => setLiquidateVault(undefined)} {...liquidateVault} />
            )}
            <Container>
                <Header>
                    <BrandedTitle
                        textContent={`${
                            !invalidAddress ? returnWalletAddress(idOrOwner as string) : 'UNKNOWN'
                        }'S VAULTS`}
                        $fontSize={isLargerThanSmall ? '3rem' : '2.4rem'}
                    />
                    <CenteredFlex $column={!isLargerThanSmall} $gap={24}>
                        <BrandedDropdown
                            label={
                                <Text $fontWeight={400} $textAlign="left">
                                    Collateral: <strong>{collateralFilter || 'All'}</strong>
                                </Text>
                            }
                        >
                            {['All', ...symbols].map((label) => (
                                <DropdownOption
                                    key={label}
                                    onClick={() => {
                                        // e.stopPropagation()
                                        setCollateralFilter(label === 'All' ? undefined : label)
                                    }}
                                >
                                    {label}
                                </DropdownOption>
                            ))}
                        </BrandedDropdown>
                        {!isLargerThanSmall && (
                            <SortByDropdown headers={headers} sorting={sorting} setSorting={setSorting} />
                        )}
                    </CenteredFlex>
                </Header>
                <Table
                    container={StyledTableContainer}
                    headers={headers}
                    headerContainer={TableHeader}
                    sorting={sorting}
                    setSorting={setSorting}
                    loading={loading}
                    error={error?.message || (invalidAddress ? 'Invalid address' : undefined)}
                    errorContent={error?.message ? undefined : invalidAddress ? 'Invalid address' : undefined}
                    isEmpty={!rows.length}
                    rows={rows
                        .slice(RECORDS_PER_PAGE * offset, RECORDS_PER_PAGE * (offset + 1))
                        .map(({ safeId, collateral, debt, collateralRatio, collateralToken, status }) => (
                            <Table.Row
                                key={safeId}
                                container={TableRow}
                                headers={headers}
                                items={[
                                    {
                                        content: <Text>#{safeId}</Text>,
                                    },
                                    {
                                        content: isLargerThanSmall ? (
                                            <Grid $columns="1fr 24px 48px" $align="center" $gap={8}>
                                                <Text $textAlign="right">
                                                    {formatNumberWithStyle(collateral, {
                                                        maxDecimals: 4,
                                                    })}
                                                </Text>
                                                <TokenPair tokens={[collateralToken as any]} hideLabel size={48} />
                                                <Text>{collateralToken}</Text>
                                            </Grid>
                                        ) : (
                                            <Flex $justify="flex-start" $align="center" $gap={8}>
                                                <Text $textAlign="right">
                                                    {formatNumberWithStyle(collateral, {
                                                        maxDecimals: 4,
                                                    })}
                                                </Text>
                                                <TokenPair tokens={[collateralToken as any]} hideLabel size={48} />
                                                <Text>{collateralToken}</Text>
                                            </Flex>
                                        ),
                                    },
                                    {
                                        content: isLargerThanSmall ? (
                                            <Grid $columns="1fr 24px" $gap={8}>
                                                <Text $textAlign="right">
                                                    {formatNumberWithStyle(debt, {
                                                        maxDecimals: 4,
                                                    })}
                                                </Text>
                                                <Text>HAI</Text>
                                            </Grid>
                                        ) : (
                                            <Flex $justify="flex-start" $align="center" $gap={8}>
                                                <Text $textAlign="right">
                                                    {formatNumberWithStyle(debt, {
                                                        maxDecimals: 4,
                                                    })}
                                                </Text>
                                                <Text>HAI</Text>
                                            </Flex>
                                        ),
                                    },
                                    {
                                        content: (
                                            <Flex $justify="center" $align="center" $gap={12}>
                                                <Text>
                                                    {collateralRatio === Infinity.toString()
                                                        ? '--'
                                                        : formatNumberWithStyle(collateralRatio, {
                                                              style: 'percent',
                                                              scalingFactor: 0.01,
                                                          })}
                                                </Text>
                                                <StatusLabel status={status} size={0.8} />
                                            </Flex>
                                        ),
                                    },
                                    {
                                        content: (
                                            <TableButton
                                                onClick={() =>
                                                    setLiquidateVault({
                                                        id: safeId,
                                                        collateralRatio,
                                                        status,
                                                    })
                                                }
                                            >
                                                Liquidate
                                            </TableButton>
                                        ),
                                        unwrapped: true,
                                    },
                                ]}
                            />
                        ))}
                    footer={
                        <Pagination
                            totalItems={rows.length}
                            perPage={RECORDS_PER_PAGE}
                            handlePagingMargin={setOffset}
                        />
                    }
                />
            </Container>
        </>
    )
}

const Container = styled(BlurContainer)`
    width: 100%;
    margin-bottom: 48px;
    & > * {
        padding: 0px;
    }
`

const Header = styled(Flex).attrs((props) => ({
    $width: '100%',
    $justify: 'space-between',
    $align: 'center',
    $gap: 24,
    ...props,
}))`
    position: relative;
    padding: 48px;
    border-bottom: ${({ theme }) => theme.border.medium};

    ${({ theme }) => theme.mediaWidth.upToSmall`
        flex-direction: column;
        padding: 24px;
        & > * {
            width: 100%;
            &:nth-child(2) {
                gap: 12px;
                & > * {
                    width: 100%;
                    &:nth-child(1) {
                        z-index: 5;
                    }
                    &:nth-child(2) {
                        z-index: 4;
                    }
                    &:nth-child(3) {
                        z-index: 3;
                    }
                    &:nth-child(4) {
                        z-index: 2;
                    }
                    &:nth-child(5) {
                        z-index: 1;
                    }
                }
            }
        }
    `}

    z-index: 1;
`

const StyledTableContainer = styled(TableContainer)`
    padding: 48px;
    padding-top: 24px;

    ${({ theme }) => theme.mediaWidth.upToSmall`
        padding: 0px;
    `}
`
const TableHeaderBase = styled(Grid)`
    grid-template-columns: 80px 180px 180px 1fr 120px;
    align-items: center;
    grid-gap: 12px;
    padding: 8px 16px;
    font-size: 0.8rem;

    & > * {
        padding: 0 4px;
    }
`
const TableHeader = styled(TableHeaderBase)`
    & > *:nth-child(2),
    & > *:nth-child(3),
    & > *:nth-child(4) {
        width: 100%;
    }
`
const TableRow = styled(TableHeaderBase)`
    border-radius: 999px;
    padding: 0px;
    padding-left: 16px;
    &:hover {
        background-color: rgba(0, 0, 0, 0.1);
    }

    ${({ theme }) => theme.mediaWidth.upToSmall`
        padding: 24px;
        grid-template-columns: 1fr 1fr;
        grid-gap: 12px;
        border-radius: 0px;
        border-bottom: ${theme.border.medium};
        &:hover {
            background-color: unset;
        }
    `}
`
