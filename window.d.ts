interface Ethereum {
  isMetaMask: boolean
}

interface window {
  ethereum: Ethereum | undefined
}
