import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AlertTriangle } from 'react-feather'

import { ActionState, Status, formatNumberWithStyle } from '~/utils'
import { liquidateVault } from '~/services/blockchain'
import { useStoreActions } from '~/store'
import { handleTransactionError, useGeb } from '~/hooks'

import styled from 'styled-components'
import { CenteredFlex, Flex, HaiButton, Text } from '~/styles'
import { Modal, type ModalProps } from './index'
import { CheckBox } from '~/components/CheckBox'
import { TransactionSummary } from '../TransactionSummary'
import { StatusLabel } from '../StatusLabel'

type Props = ModalProps & {
    id: string
    collateralRatio: string
    status: Status
}
export function LiquidateVaultModal({ id, collateralRatio, status, ...props }: Props) {
    const { t } = useTranslation()
    const geb = useGeb()

    const { popupsModel: popupsActions, transactionsModel: transactionsActions } = useStoreActions((actions) => actions)

    const [accepted, setAccepted] = useState(false)

    const startVaultLiquidation = async () => {
        if (!geb || !accepted) return

        popupsActions.setIsWaitingModalOpen(true)
        popupsActions.setWaitingPayload({
            text: `Starting liquidation for vault #${id}...`,
            title: 'Waiting For Confirmation',
            hint: 'Confirm this transaction in your wallet',
            status: ActionState.LOADING,
        })

        try {
            const txResponse = await liquidateVault(geb, id)
            if (!txResponse) return
            const { hash, chainId, from } = txResponse
            transactionsActions.addTransaction({
                chainId,
                hash,
                from,
                summary: `Liquidate Vault #${id}`,
                addedTime: new Date().getTime(),
                originalTx: txResponse,
            })
            popupsActions.setWaitingPayload({
                title: 'Transaction Submitted',
                text: `Starting liquidation for vault #${id}...`,
                hash: txResponse.hash,
                status: ActionState.LOADING,
            })
            await txResponse.wait()
            popupsActions.setIsWaitingModalOpen(false)
            props.onClose?.()
        } catch (error: any) {
            handleTransactionError(error)
        }
    }

    return (
        <Modal
            heading="LIQUIDATE VAULT"
            maxWidth="560px"
            {...props}
            footerContent={
                <Flex $width="100%" $justify="flex-end" $align="center">
                    <HaiButton $variant="yellowish" disabled={!accepted} onClick={startVaultLiquidation}>
                        {t('liquidate_button')}
                        {id}
                    </HaiButton>
                </Flex>
            }
        >
            <AlertContainer $column $gap={32}>
                <AlertTriangle size="90px" />
                <Flex $column $gap={12}>
                    <Text>{t('liquidate_vault_warning')}</Text>
                    <TransactionSummary
                        heading="Vault Details"
                        items={[
                            {
                                label: 'Vault ID',
                                value: { after: id },
                            },
                            {
                                label: 'Collateral Ratio',
                                value: {
                                    after:
                                        collateralRatio === Infinity.toString()
                                            ? '--'
                                            : formatNumberWithStyle(collateralRatio, {
                                                  style: 'percent',
                                                  scalingFactor: 0.01,
                                              }),
                                },
                            },
                            {
                                label: 'Status',
                                value: {
                                    after: '',
                                    label: <StatusLabel status={status} size={0.8} textOnly />,
                                },
                            },
                        ]}
                    />
                    <Flex $justify="flex-start" $align="center" $gap={8}>
                        <CheckBox checked={accepted} onChange={setAccepted} />
                        <Text $fontSize="13px" onClick={() => setAccepted(!accepted)}>
                            {t('liquidate_confirmation')}
                        </Text>
                    </Flex>
                </Flex>
            </AlertContainer>
        </Modal>
    )
}

const AlertContainer = styled(CenteredFlex)`
    font-size: 13px;
    /* color: ${({ theme }) => theme.colors.warningColor}; */
`
