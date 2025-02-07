import type { IFetchVaultsPayload, IUserVaultList } from '~/types'
import { formatUserVault, gebManager } from '~/utils'

export const fetchUserVaults = async (config: IFetchVaultsPayload) => {
    const response = await fetchUserVaultsRaw(config)
    if (!response) return

    const vaultsResponse: IUserVaultList = response

    const liquidationData = {
        collateralLiquidationData: vaultsResponse.collateralLiquidationData,
        currentRedemptionPrice: vaultsResponse.systemState.currentRedemptionPrice.value,
        currentRedemptionRate: vaultsResponse.systemState.currentRedemptionRate.annualizedRate,
        globalDebt: vaultsResponse.systemState.globalDebt,
        globalDebtCeiling: vaultsResponse.systemState.globalDebtCeiling,
        perVaultDebtCeiling: vaultsResponse.systemState.perSafeDebtCeiling,
    }

    const userVaults = formatUserVault(vaultsResponse.vaults, liquidationData, config.tokensData)
    return {
        userVaults,
        availableHAI: vaultsResponse.erc20Balances?.length ? vaultsResponse.erc20Balances[0].balance : '0',
        liquidationData,
    }
}

export const fetchUserVaultsRaw = async (config: IFetchVaultsPayload) => {
    const { address, geb } = config

    if (!geb || !config.tokensData) return
    const response = await gebManager.getUserVaultsRpc({
        address: address.toLowerCase(),
        geb,
        tokensData: config.tokensData,
    })

    return response
}
