import { useMemo, useState } from 'react'
import { BigNumber } from 'ethers'

import type { AvailableVaultPair, SortableHeader, Sorting } from '~/types'
import { arrayToSorted } from '~/utils'
import { useStoreState } from '~/store'

const sortableHeaders: SortableHeader[] = [
    { label: 'Pair' },
    { label: 'Coll. Factor' },
    { label: 'Net APY' },
    { label: 'My Eligible Collateral' },
    { label: 'My Vaults' },
    {
        label: '',
        unsortable: true,
    },
]

export function useAvailableVaults() {
    const {
        connectWalletModel: { tokensData, tokensFetchedData },
        vaultModel: vaultState,
    } = useStoreState((state) => state)

    const symbols = useMemo(
        () =>
            Object.values(tokensData || {})
                .filter(({ isCollateral }) => isCollateral)
                .map(({ symbol }) => symbol),
        [tokensData]
    )

    const availableVaults: AvailableVaultPair[] = useMemo(() => {
        return symbols.map((symbol) => {
            const { liquidationCRatio, totalAnnualizedStabilityFee } =
                vaultState.liquidationData?.collateralLiquidationData[symbol] || {}
            return {
                collateralName: symbol,
                collateralizationFactor: liquidationCRatio || '',
                apy: totalAnnualizedStabilityFee || '',
                eligibleBalance: tokensFetchedData[symbol]?.balanceE18,
                myVaults: vaultState.list.filter(({ collateralName }) => collateralName === symbol),
            }
        })
    }, [symbols, tokensFetchedData, vaultState.list, vaultState.liquidationData])

    const [eligibleOnly, setEligibleOnly] = useState(false)

    const filteredAvailableVaults = useMemo(() => {
        if (!eligibleOnly) return availableVaults

        return availableVaults.filter(({ collateralName }) => {
            const balance = tokensFetchedData[collateralName]?.balanceE18 || '0'
            return !BigNumber.from(balance).isZero()
        })
    }, [availableVaults, eligibleOnly])

    const [sorting, setSorting] = useState<Sorting>({
        key: 'Coll. Factor',
        dir: 'desc',
    })

    const sortedRows = useMemo(() => {
        switch (sorting.key) {
            case 'Pair':
                return arrayToSorted(filteredAvailableVaults, {
                    getProperty: (vault) => vault.collateralName,
                    dir: sorting.dir,
                    type: 'alphabetical',
                })
            case 'Net APY':
                return arrayToSorted(filteredAvailableVaults, {
                    getProperty: (vault) => vault.apy || '0',
                    dir: sorting.dir,
                    type: 'parseFloat',
                })
            case 'My Eligible Collateral':
                return arrayToSorted(filteredAvailableVaults, {
                    getProperty: (vault) => vault.eligibleBalance,
                    dir: sorting.dir,
                    type: 'bigInt',
                    checkValueExists: true,
                })
            case 'My Vaults':
                return arrayToSorted(filteredAvailableVaults, {
                    getProperty: (vault) => vault.myVaults?.length,
                    dir: sorting.dir,
                    type: 'numerical',
                    checkValueExists: true,
                })
            case 'Coll. Factor':
            default:
                return arrayToSorted(filteredAvailableVaults, {
                    getProperty: (vault) => vault.collateralizationFactor || '0',
                    dir: sorting.dir,
                    type: 'parseFloat',
                })
        }
    }, [filteredAvailableVaults, sorting])

    return {
        headers: sortableHeaders,
        rows: sortedRows,
        rowsUnmodified: availableVaults,
        sorting,
        setSorting,
        eligibleOnly,
        setEligibleOnly,
    }
}
