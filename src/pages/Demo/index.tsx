import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { SwapWidget } from 'lib'

export default function Demo() {
  const { library } = useActiveWeb3React()

  const url = 'https://mainnet.infura.io/v3/099fc58e0de9451d80b18d7c74caa7c1'

  return (
    <div>
      <SwapWidget jsonRpcEndpoint={url} />
      <SwapWidget jsonRpcEndpoint={url} />
      <SwapWidget jsonRpcEndpoint={url} />
    </div>
  )
}
