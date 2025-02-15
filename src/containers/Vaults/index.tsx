import { useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'

import { VaultAction } from '~/utils'
import { useStoreState } from '~/store'
import { VaultProvider } from '~/providers/VaultProvider'
import { useVaultRouting } from '~/hooks'

import styled from 'styled-components'
import { HaiButton, Text } from '~/styles'
import { Caret } from '~/components/Icons/Caret'
import { ManageVault } from './Manage'
import { VaultsList } from './VaultsList'
import { VaultsByOwner } from './VaultsByOwner'
import { VaultById } from './VaultById'

export function Vaults() {
    const history = useHistory()
    const { idOrOwner } = useParams<{ idOrOwner?: string }>()

    const {
        vaultModel: { singleVault },
    } = useStoreState((state) => state)

    const { action, setAction } = useVaultRouting()

    const [navIndex, setNavIndex] = useState(0)

    if (idOrOwner) {
        if (idOrOwner.startsWith('0x')) return <VaultsByOwner />
        return <VaultById id={idOrOwner} />
    }

    return (
        <VaultProvider action={action} setAction={setAction}>
            {action === VaultAction.CREATE || singleVault ? (
                <ManageVault
                    headerContent={
                        <BackButton onClick={() => history.push(`/vaults`)}>
                            <Caret direction="left" />
                            <Text>Back to {navIndex === 0 ? 'Available' : 'My'} Vaults</Text>
                        </BackButton>
                    }
                />
            ) : (
                <VaultsList navIndex={navIndex} setNavIndex={setNavIndex} />
            )}
        </VaultProvider>
    )
}

const BackButton = styled(HaiButton)`
    height: 48px;
`
