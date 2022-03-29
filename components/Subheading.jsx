import React from 'react';
import { shortEther, toBN, toWei } from '../utils';
import { totalPresale } from '../config';
import addresses from '../contracts/addresses';

export default function Subheading({
  totalEth,
  totalDepositors,
  accountEthDeposit,
  accountShares,
  maxShares,
  stakingLid
}) {
  return (
    <div>
      
            <p fontSize="18px" m="0" p="0" color="lid.fgMed">
              Verified XFI Presale Contract
            </p>
            {addresses.presale ? (
              <a
                wordBreak="break-word"
                color="lid.brand"
                href={'https://etherscan.io/address/' + addresses.presale}
                mt="15px"
                display="block">
                {addresses.presale}
              </a>
            ) : (
              <p>TBD</p>
            )}
            <img
              src="/ethereum-eth-logo-white.png"
              alt="Lid Website"
            />
            <p>
              Your ETH Deposits
            </p>
            <p>
              {shortEther(accountEthDeposit)}
            </p>
            <img
              src="/logo.png"
              alt="Lid Website"
            />
            <p >
              Your XFI Tokens
            </p>
            <p >
              {maxShares !== '0'
                ? shortEther(
                    toBN(accountShares)
                      .mul(toBN(toWei(totalPresale)))
                      .div(toBN(maxShares))
                  )
                : '0'}
            </p>
            <img
              src="/Depositor.png"
              alt="Lid Website"
            />
            <p >
              Total Presale Depositors
            </p>
            <p>
              {totalDepositors}
            </p>
            <img
              src="/ethereum-eth-logo.png"
              alt="Lid Website"
            />
            <p >
              Total ETH Deposited
            </p>
            <p >
              {shortEther(totalEth)}
            </p>
            <img
              src="/logo.png"
              alt="Lid Website"
            />
            <p >
              Total Presale XFI
            </p>
            <p >
              {shortEther(toWei(totalPresale))}
            </p>
            <img
              src="/logo-lid.png"
              alt="Lid Website"

            />
            <p>
              Your Staking Lid Tokens
            </p>
            <p >
              {shortEther(stakingLid)}
            </p>

    </div>
  );
}