import { Trans } from '@lingui/macro'
import { useWeb3React } from '@web3-react/core'
import { useShowClaimPopup, useToggleSelfClaimModal } from 'state/application/hooks'
import { useUserHasAvailableClaim } from 'state/claim/hooks'
import { useUserHasSubmittedClaim } from 'state/transactions/hooks'
import styled from 'styled-components/macro'

import { ThemedText } from '../../theme'
import { CardNoise } from '../earn/styled'
import Menu from '../Menu'
import { Dots } from '../swap/styleds'
import Web3Status from '../Web3Status'
import NetworkSelector from './NetworkSelector'

const HeaderFrame = styled.div<{ showBackground: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  width: 100%;
  max-width: 320px;
  top: 0;
  position: relative;
  padding: 10px 0;
  z-index: 21;
  position: relative;
  position: relative;
  /* Background slide effect on scroll. */
  background-image: ${({ theme }) => `linear-gradient(to bottom, transparent 50%, ${theme.deprecated_bg0} 50% )}}`};
  background-position: ${({ showBackground }) => (showBackground ? '0 -100%' : '0 0')};
  background-size: 100% 200%;
  box-shadow: 0px 0px 0px 1px ${({ theme, showBackground }) => (showBackground ? theme.deprecated_bg2 : 'transparent;')};
  transition: background-position 0.1s, box-shadow 0.1s;
  background-blend-mode: hard-light;

  // ${({ theme }) => theme.deprecated_mediaWidth.deprecated_upToLarge`
  //   grid-template-columns: 48px 1fr 1fr;
  // `};

  // ${({ theme }) => theme.deprecated_mediaWidth.deprecated_upToMedium`
  //   padding:  1rem;
  //   grid-template-columns: 1fr 1fr;
  // `};

  // ${({ theme }) => theme.deprecated_mediaWidth.deprecated_upToSmall`
  //   padding:  1rem;
  //   grid-template-columns: 36px 1fr;
  // `};
`

const HeaderControls = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  max-width: 320px;
`

const HeaderElement = styled.div`
  display: flex;
  align-items: center;

  &:not(:first-child) {
    margin-left: 0.5em;
  }

  /* addresses safaris lack of support for "gap" */
  & > *:not(:first-child) {
    margin-left: 8px;
  }

  ${({ theme }) => theme.deprecated_mediaWidth.deprecated_upToMedium`
    align-items: center;
  `};
`

const AccountElement = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme, active }) => (!active ? theme.deprecated_bg0 : theme.deprecated_bg0)};
  border-radius: 16px;
  white-space: nowrap;
  width: 100%;
  height: 40px;

  :focus {
    border: 1px solid blue;
  }
`

const UNIAmount = styled(AccountElement)`
  color: white;
  padding: 4px 8px;
  height: 36px;
  font-weight: 500;
  background-color: ${({ theme }) => theme.deprecated_bg3};
  background: radial-gradient(174.47% 188.91% at 1.84% 0%, #ff007a 0%, #2172e5 100%), #edeef2;
`

const UNIWrapper = styled.span`
  width: fit-content;
  position: relative;
  cursor: pointer;

  :hover {
    opacity: 0.8;
  }

  :active {
    opacity: 0.9;
  }
`

// can't be customized under react-router-dom v6
// so we have to persist to the default one, i.e., .active

export default function Header() {
  const { account } = useWeb3React()

  const toggleClaimModal = useToggleSelfClaimModal()

  const availableClaim: boolean = useUserHasAvailableClaim(account)

  const { claimTxn } = useUserHasSubmittedClaim(account ?? undefined)

  const showClaimPopup = useShowClaimPopup()

  // work around https://github.com/remix-run/react-router/issues/8161
  // as we can't pass function `({isActive}) => ''` to className with styled-components

  return (
    <HeaderFrame showBackground={false}>
      {/* <ClaimModal /> */}
      <HeaderControls>
        <HeaderElement>
          <NetworkSelector />
        </HeaderElement>
        <HeaderElement>
          {availableClaim && !showClaimPopup && (
            <UNIWrapper onClick={toggleClaimModal}>
              <UNIAmount active={!!account && !availableClaim} style={{ pointerEvents: 'auto' }}>
                <ThemedText.DeprecatedWhite padding="0 2px">
                  {claimTxn && !claimTxn?.receipt ? (
                    <Dots>
                      <Trans>Claiming UNI</Trans>
                    </Dots>
                  ) : (
                    <Trans>Claim UNI</Trans>
                  )}
                </ThemedText.DeprecatedWhite>
              </UNIAmount>
              <CardNoise />
            </UNIWrapper>
          )}
          <AccountElement active={!!account}>
            <Web3Status />
          </AccountElement>
        </HeaderElement>
        <HeaderElement>
          <Menu />
        </HeaderElement>
      </HeaderControls>
    </HeaderFrame>
  )
}
