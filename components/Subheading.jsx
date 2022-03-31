/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { shortEther, toBN, toWei } from '../utils';
// import { totalPresale } from '../config';
// import addresses from '../contracts/addresses';

export default function Subheading({
  totalEth,
  totalDepositors,
  accountEthDeposit,
  accountShares,
  maxShares,
  // stakingLid
}) {
  return (
    <div>
      
            {/* <h1 className='text-center'>
              Verified XFI Presale Contract
            </h1> */}
            
            {/* {addresses.presale ? (
              <a className='text-center'
                href={'https://etherscan.io/address/' + addresses.presale}>
                {addresses.presale}
              </a>
            ) : (
              <p className='text-center'>TBD</p>
            )}
            <img
              src="/ethereum-eth-logo-white.png"
              alt="Lid Website"
            /> */}
            <div className='flex justify-between md:flex-col flex-row'>
              {/* <div>
            <p>
              Your ETH Deposits
            </p>
            <p>
              {shortEther(accountEthDeposit)}
            </p>
            </div>
            <div>
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
            </div> */}
            <div className='p-6 border-2 border-black'>
            <p className='font-serif text-4xl font-bold'>
              Total Presale Depositors
            </p>
            <p className='text-center text-3xl font-semibold'>
              100
              {/* {totalDepositors} */}
            </p>
            </div>
            <div>
            <p className='font-serif text-4xl font-bold'>
              Total ETH Deposited
            </p>
            <p className='text-center text-3xl font-semibold'>
              100
              {/* {shortEther(totalEth)} */}
            </p>
            </div>
            <div>
            <p className='font-serif text-4xl font-bold'>
              Total Presale XFI
            </p>
            <p className='text-center text-3xl font-semibold'>
              100
              {/* {shortEther(toWei(totalPresale))} */}
            </p>
            </div>
      
          <div>
            <p className='font-serif text-4xl font-bold'>
              Your Staking Lid Tokens
            </p>
            <p className='text-center text-3xl font-semibold'>
              100
              {/* {shortEther(stakingLid)} */}
            </p>
            </div>
</div>
    </div>
  );
}