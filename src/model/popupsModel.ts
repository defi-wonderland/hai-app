import { type Action, action } from 'easy-peasy'

import type {
    // IAlert,
    IAuctionOperation,
    // IOperation,
    IWaitingPayload,
    // LoadingPayload,
} from '~/types'
import { ActionState } from '~/utils/constants'

export interface PopupsModel {
    // alertPayload: IAlert
    // setAlertPayload: Action<PopupsModel, IAlert | undefined>

    // isLoadingModalOpen: LoadingPayload
    // setIsLoadingModalOpen: Action<PopupsModel, LoadingPayload>

    isWaitingModalOpen: boolean
    setIsWaitingModalOpen: Action<PopupsModel, boolean>
    waitingPayload: IWaitingPayload
    setWaitingPayload: Action<PopupsModel, IWaitingPayload | undefined>

    // hasFLXClaim: boolean
    // setHasFLXClaim: Action<PopupsModel, boolean>

    // isSettingsModalOpen: boolean
    // setIsSettingsModalOpen: Action<PopupsModel, boolean>

    isClaimPopupOpen: boolean
    setIsClaimPopupOpen: Action<PopupsModel, boolean>

    // isVotingModalOpen: boolean
    // setIsVotingModalOpen: Action<PopupsModel, boolean>

    auctionOperationPayload: IAuctionOperation
    setAuctionOperationPayload: Action<PopupsModel, IAuctionOperation | undefined>

    // ESMOperationPayload: IOperation
    // setESMOperationPayload: Action<PopupsModel, IOperation>

    // vaultOperationPayload: IOperation & { isCreate: boolean }
    // setVaultOperationPayload: Action<PopupsModel, (IOperation & { isCreate: boolean }) | undefined>

    // returnProxyFunction: ((actions: any) => void) | null
    // setReturnProxyFunction: Action<PopupsModel, ((storeActions: any) => void) | null>
}

const DEFAULT_WAITING_PAYLOAD: PopupsModel['waitingPayload'] = {
    title: '',
    text: '',
    hint: '',
    status: ActionState.NONE,
    isCreate: false,
}
const DEFAULT_AUCTION_OPERATION_PAYLOAD: PopupsModel['auctionOperationPayload'] = {
    isOpen: false,
    type: '',
    auctionType: '',
}
// const DEFAULT_VAULT_OPERATION_PAYLOAD: PopupsModel['vaultOperationPayload'] = {
//     isOpen: false,
//     type: '',
//     isCreate: false,
// }

export const popupsModel: PopupsModel = {
    // alertPayload: {
    //     type: '',
    //     text: '',
    // },
    // setAlertPayload: action((state, payload) => {
    //     state.alertPayload = payload || {
    //         type: '',
    //         text: '',
    //     }
    // }),

    // isLoadingModalOpen: {
    //     isOpen: false,
    //     text: '',
    // },
    // setIsLoadingModalOpen: action((state, isOpen) => {
    //     state.isLoadingModalOpen = isOpen
    // }),

    isWaitingModalOpen: false,
    setIsWaitingModalOpen: action((state, isOpen) => {
        state.isWaitingModalOpen = isOpen
        if (!isOpen) {
            state.waitingPayload = DEFAULT_WAITING_PAYLOAD
        }
    }),
    waitingPayload: DEFAULT_WAITING_PAYLOAD,
    setWaitingPayload: action((state, payload = DEFAULT_WAITING_PAYLOAD) => {
        state.waitingPayload = payload
    }),

    // hasFLXClaim: false,
    // setHasFLXClaim: action((state, hasClaim) => {
    //     state.hasFLXClaim = hasClaim
    // }),

    // isSettingsModalOpen: false,
    // setIsSettingsModalOpen: action((state, isOpen) => {
    //     state.isSettingsModalOpen = isOpen
    // }),

    isClaimPopupOpen: false,
    setIsClaimPopupOpen: action((state, isOpen) => {
        state.isClaimPopupOpen = isOpen
    }),

    // isVotingModalOpen: false,
    // setIsVotingModalOpen: action((state, isOpen) => {
    //     state.isVotingModalOpen = isOpen
    // }),

    auctionOperationPayload: DEFAULT_AUCTION_OPERATION_PAYLOAD,
    setAuctionOperationPayload: action((state, payload = DEFAULT_AUCTION_OPERATION_PAYLOAD) => {
        state.auctionOperationPayload = payload
    }),

    // ESMOperationPayload: {
    //     isOpen: false,
    //     type: '',
    // },
    // setESMOperationPayload: action((state, payload) => {
    //     state.ESMOperationPayload = payload
    // }),

    // vaultOperationPayload: DEFAULT_VAULT_OPERATION_PAYLOAD,
    // setVaultOperationPayload: action((state, payload = DEFAULT_VAULT_OPERATION_PAYLOAD) => {
    //     state.vaultOperationPayload = payload
    // }),

    // returnProxyFunction: null,
    // setReturnProxyFunction: action((state, payload) => {
    //     state.returnProxyFunction = payload
    // }),
}
