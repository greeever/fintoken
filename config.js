const { ether } = require("@openzeppelin/test-helpers");

const config = {};

config.timer = {
  startTime: 1600962240,
  hardCapTimer: 43200,
  softCap: ether("500"),
};

config.redeemer = {
  redeemBP: 400,
  redeemInterval: 3600,
  bonusRangeStart: [
    ether("0"),
    ether("100"),
    ether("200"),
    ether("300"),
    ether("400"),
    ether("500"),
    ether("1000"),
    ether("2000")
  ],
  bonusRangeBP: [
    4000,
    3000,
    2000,
    1000,
    500,
    250,
    100,
    0
  ],
};

config.presale = {
  maxBuyPerAddress: ether("50"),
  uniswapEthBP: 5000,
  uniswapLidEthBP: 1000,
  lidEthBP: 500,
  referralBP: 250,
  hardcap: ether("3750"),
  token: "0x86d1d12523B65203851c571FcC029bF90903fB6d",
  uniswapRouter: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
  lidFund: "0xb63c4F8eCBd1ab926Ed9Cb90c936dffC0eb02cE2",
  access: "0xfD8e59814D601219bddd53879ADa1Ff75fD316e2",
  marketingFund: "0x5080548BB1f23cEbC43C78442B4a65CFb63Ff856",
  projectFund: "0xBf8f642644387B871A33c88DbAf3b6C8Ec74ddd0",
  teamFund: "0x0C63dC0F4bF53DCB03E9D595AdA89F6e75840Ff6",
  lidLiqLocker: "0x5d05eEF83499789fD2d3e6b2A7483430B40A0325",
  tokenPoolsBP: {
    marketing: 500,
    team: 1500,
    lidFee: 100,
    project: 3400,
    liquidity: 1250,
    presale: 3000,
    lidLiq: 250
  }
};

config.timelock = {
  releaseInterval: 2592000,
  releaseBP: 1000,
  owner: "0x4735581201F4cAD63CCa0716AB4ac7D6d9CFB0ed"
}

module.exports = config;
