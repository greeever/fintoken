import React, { useState, useEffect } from 'react';

import { shortenDecimal, toBN, toWei, fromWei } from '../utils.js';
import { referralBP, basisPoint } from '../config';

export default function DepositForm({
  rate,
  cap,
  accountDeposit,
  setVal,
  val,
  hardcap,
  totalEth,
  handleClick
}) {
  const [displayVal, setDisplayVal] = useState('');

  const availableByAccountDeposit = toBN(cap).gte(toBN(accountDeposit))
    ? toBN(cap)
        .sub(toBN(accountDeposit))
    : toBN('1');
  const availableByTotalDeposit = toBN(hardcap).gte(toBN(totalEth))
    ? toBN(hardcap)
        .sub(toBN(totalEth))
        .add(
          toBN(hardcap)
            .sub(toBN(totalEth))
            .mul(toBN(referralBP))
            .div(toBN(basisPoint))
        )
    : toBN('1');

  const availableMax = availableByAccountDeposit.gte(availableByTotalDeposit)
    ? availableByTotalDeposit
    : availableByAccountDeposit;

  useEffect(() => {
    if (displayVal !== '' && !isNaN(displayVal)) setVal(toWei(displayVal));
  }, [displayVal]);

  return (
    <div>
        <p >
          Deposit ETH for XFI
        </p>
        <p>
          Minimum 0.01 ETH, Maximum {shortenDecimal(fromWei(cap))} ETH
        </p>
        <p>
          Your Available Max: {shortenDecimal(fromWei(availableMax))} ETH
        </p>
        <p >
          Estimated XFI:{' '}
          {!val
            ? '0'
            : shortenDecimal(
                fromWei(
                  toBN(val)
                    .mul(toBN(rate))
                    .mul(toBN('10000'))
                    .div(toBN('10250'))
                    .div(toBN(toWei('1')))
                )
              )}
        </p>

        <input
          value={displayVal}
          min={0.01}
          max={fromWei(availableMax)}>
          <input
            placeholder="Amount of ETH to deposit."
            onChange={(e) => {
              if (isNaN(e.target.value)) return;
              if (e.target.value === '') {
                setDisplayVal('');
              } else if (Number(e.target.value) > 140000000) {
                setDisplayVal('140000000');
              } else if (Number(e.target.value) < 0) {
                setDisplayVal('0');
              } else {
                setDisplayVal(e.target.value);
              }
            }}
          />
          <button
            onClick={() => setDisplayVal(fromWei(availableMax))}>
            Max
          </button>
        </input>
        <button
          onClick={handleClick}>
          Deposit
        </button>
    </div>
  );
          }