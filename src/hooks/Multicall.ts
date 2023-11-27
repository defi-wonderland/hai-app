import { BigNumber } from 'ethers'

import { Call } from '~/utils/interfaces'

export interface Result extends ReadonlyArray<any> {
    readonly [key: string]: any
}
export interface ListenerOptions {
    // how often this data should be fetched, by default 1
    readonly blocksPerFetch?: number
}

type MethodArg = string | number | BigNumber

export type OptionalMethodInputs = Array<MethodArg | MethodArg[] | undefined> | undefined

const ADDRESS_REGEX = /^0x[a-fA-F0-9]{40}$/
const LOWER_HEX_REGEX = /^0x[a-f0-9]*$/

export function toCallKey(call: Call): string {
    if (!ADDRESS_REGEX.test(call.address)) {
        throw new Error(`Invalid address: ${call.address}`)
    }
    if (!LOWER_HEX_REGEX.test(call.callData)) {
        throw new Error(`Invalid hex: ${call.callData}`)
    }
    let key = `${call.address}-${call.callData}`
    if (call.gasRequired) {
        if (!Number.isSafeInteger(call.gasRequired)) {
            throw new Error(`Invalid number: ${call.gasRequired}`)
        }
        key += `-${call.gasRequired}`
    }
    return key
}

export function parseCallKey(callKey: string): Call {
    const pcs = callKey.split('-')
    if (![2, 3].includes(pcs.length)) {
        throw new Error(`Invalid call key: ${callKey}`)
    }
    return {
        address: pcs[0],
        callData: pcs[1],
        ...(pcs[2] ? { gasRequired: Number.parseInt(pcs[2]) } : {}),
    }
}

interface CallResult {
    readonly valid: boolean
    readonly data: string | undefined
    readonly blockNumber: number | undefined
}

const INVALID_RESULT: CallResult = {
    valid: false,
    blockNumber: undefined,
    data: undefined,
}

// use this options object
export const NEVER_RELOAD: ListenerOptions = {
    blocksPerFetch: Infinity,
}

export interface CallState {
    readonly valid: boolean
    // the result, or undefined if loading or errored/no data
    readonly result: Result | undefined
    // true if the result has never been fetched
    readonly loading: boolean
    // true if the result is not for the latest block
    readonly syncing: boolean
    // true if the call was made and is synced, but the return data is invalid
    readonly error: boolean
}

const INVALID_CALL_STATE: CallState = {
    valid: false,
    result: undefined,
    loading: false,
    syncing: false,
    error: false,
}
const LOADING_CALL_STATE: CallState = {
    valid: true,
    result: undefined,
    loading: true,
    syncing: true,
    error: false,
}
