import type { SetState, SortableHeader, Sorting, Strategy } from '~/types'
import { formatNumberWithStyle } from '~/utils'

import styled from 'styled-components'
import { Flex, Grid, Text } from '~/styles'
import { RewardsTokenPair, TokenPair } from '~/components/TokenPair'
import { StrategyTableButton } from './StrategyTableButton'
import { Table } from '~/components/Table'

type StrategyTableProps = {
    headers: SortableHeader[]
    rows: Strategy[]
    sorting: Sorting
    setSorting: SetState<Sorting>
}
export function StrategyTable({ headers, rows, sorting, setSorting }: StrategyTableProps) {
    return (
        <Table
            headers={headers}
            headerContainer={TableHeader}
            sorting={sorting}
            setSorting={setSorting}
            rows={rows.map(({ pair, rewards, tvl, apy, userPosition, earnPlatform }, i) => (
                <Table.Row
                    key={i}
                    container={TableRow}
                    headers={headers}
                    items={[
                        {
                            content: (
                                <Grid $columns="1fr min-content 12px" $align="center" $gap={12}>
                                    <Flex $justify="flex-start" $align="center" $gap={8}>
                                        <TokenPair tokens={pair} hideLabel />
                                        <Text $fontWeight={700}>{pair.join('/')}</Text>
                                    </Flex>
                                    <RewardsTokenPair tokens={rewards} />
                                </Grid>
                            ),
                            props: { $fontSize: 'inherit' },
                            fullWidth: true,
                        },
                        {
                            content: <Text $fontWeight={700}>{earnPlatform ? 'FARM' : 'BORROW'}</Text>,
                        },
                        {
                            content: (
                                <Text $fontWeight={700}>
                                    {tvl
                                        ? formatNumberWithStyle(tvl, {
                                              style: 'currency',
                                              maxDecimals: 1,
                                              suffixed: true,
                                          })
                                        : '-'}
                                </Text>
                            ),
                        },
                        // {
                        //     content: (
                        //         <Text $fontWeight={700}>
                        //             {vol24hr
                        //                 ? formatNumberWithStyle(vol24hr, {
                        //                     style: 'currency',
                        //                     maxDecimals: 1,
                        //                     suffixed: true,
                        //                 })
                        //                 : '-'
                        //             }
                        //         </Text>
                        //     ),
                        // },
                        {
                            content: (
                                <Text $fontWeight={700}>
                                    {formatNumberWithStyle(apy, {
                                        style: 'percent',
                                        maxDecimals: 1,
                                    })}
                                </Text>
                            ),
                        },
                        {
                            content: (
                                <Text $fontWeight={700}>
                                    {userPosition
                                        ? formatNumberWithStyle(userPosition, {
                                              style: 'currency',
                                              maxDecimals: 1,
                                              suffixed: true,
                                          })
                                        : '-'}
                                </Text>
                            ),
                        },
                        // {
                        //     content: (
                        //         <Text $fontWeight={700}>
                        //             {userApy
                        //                 ? formatNumberWithStyle(userApy, { style: 'percent' })
                        //                 : '-'
                        //             }
                        //         </Text>
                        //     ),
                        // },
                        {
                            content: (
                                <ButtonContainer>
                                    <StrategyTableButton earnPlatform={earnPlatform} />
                                </ButtonContainer>
                            ),
                            unwrapped: true,
                        },
                    ]}
                />
            ))}
        />
    )
}

const TableHeader = styled(Grid)`
    grid-template-columns: 3fr minmax(100px, 1fr) minmax(100px, 1fr) minmax(100px, 1fr) minmax(100px, 1fr) 224px;
    align-items: center;
    padding: 0px;
    padding-left: 6px;
    font-size: 0.8rem;

    & > *:not(:last-child) {
        padding: 0 4px;
    }
`
const TableRow = styled(TableHeader)`
    border-radius: 999px;
    &:hover {
        background-color: rgba(0, 0, 0, 0.1);
    }

    ${({ theme }) => theme.mediaWidth.upToSmall`
        padding: 24px;
        grid-template-columns: 1fr 1fr;
        grid-gap: 12px;
        border-radius: 0px;

        &:not(:first-child) {
            border-top: ${theme.border.medium};
        }
        &:hover {
            background-color: unset;
        }
    `}
`

const ButtonContainer = styled(Flex).attrs((props) => ({
    $justify: 'flex-end',
    $align: 'center',
    ...props,
}))`
    ${({ theme }) => theme.mediaWidth.upToSmall`
        justify-content: flex-start;
        grid-column: 1 / -1;
    `}
`
