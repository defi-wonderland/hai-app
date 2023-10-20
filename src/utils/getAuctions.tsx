import { Geb, ICollateralAuction, IDebtAuction, ISurplusAuction } from '@hai-on-op/sdk'

async function fetchAuctions(
    fetchFunction: (startBlock: number, endBlock: number) => Promise<{ auctions: any[] }>,
    startBlock: number,
    endBlock: number,
    blockAmount: number,
    accumulatedAuctions: any[]
): Promise<{ auctions: any[] }> {
    // Check if endBlock is negative, and if so, set it to the lowest possible block number (usually 0).
    if (endBlock < 0) {
        endBlock = 0
    }

    // Check if blockAmount is greater than or equal to startBlock.
    if (blockAmount >= startBlock) {
        blockAmount = startBlock - 1
    }

    // Ensure that startBlock is never smaller than endBlock.
    if (endBlock <= startBlock) {
        return { auctions: accumulatedAuctions }
    }

    const auctionsFetched = await fetchFunction(startBlock, endBlock)
    const totalAuctions = accumulatedAuctions.concat(auctionsFetched.auctions)
    // temporary log
    console.log('totalAuctions', totalAuctions.length, startBlock, endBlock)

    if (totalAuctions.length >= 40 || endBlock <= startBlock) {
        return { auctions: totalAuctions }
    } else {
        return fetchAuctions(fetchFunction, startBlock - blockAmount, startBlock - 1, blockAmount, totalAuctions)
    }
}

export const getSurplusAuctions = async (
    geb: Geb,
    startBlock: number,
    endBlock: number,
    blockAmount: number = 1000000,
    accumulatedAuctions: ISurplusAuction[] = []
): Promise<{ auctions: ISurplusAuction[] }> => {
    return fetchAuctions(
        geb.auctions.getSurplusAuctions.bind(geb.auctions),
        startBlock,
        endBlock,
        blockAmount,
        accumulatedAuctions
    )
}

export const getDebtAuctions = async (
    geb: Geb,
    startBlock: number,
    endBlock: number,
    blockAmount: number = 100000,
    accumulatedAuctions: IDebtAuction[] = []
): Promise<{ auctions: IDebtAuction[] }> => {
    return fetchAuctions(
        geb.auctions.getDebtAuctions.bind(geb.auctions),
        startBlock,
        endBlock,
        blockAmount,
        accumulatedAuctions
    )
}

export const getCollateralAuctions = async (
    geb: Geb,
    collateral: string,
    startBlock: number,
    endBlock: number,
    blockAmount: number = 100000,
    accumulatedAuctions: ICollateralAuction[] = []
): Promise<{ auctions: ICollateralAuction[] }> => {
    return fetchAuctions(
        (start, end) => geb.auctions.getCollateralAuctions(collateral, start, end),
        startBlock,
        endBlock,
        blockAmount,
        accumulatedAuctions
    )
}
