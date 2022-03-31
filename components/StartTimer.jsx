import React from 'react';
import CountDown from './CountDown';
import { shortEther, toBN, toWei } from '../utils';

export default function StartTimer({ startTime, accessTime, stakingLid }) {
  console.log('accessTime', accessTime);
  console.log('startTime', startTime);
  return (
    <div>
      <p>
        Your XFI Access Starts In:
      </p>
      <CountDown expiryTimestamp={accessTime} />
      <p>
        Stake more LID at{' '}
        <a  href="https://stake.lid.sh">
          stake.lid.sh
        </a>{' '}
        to get access sooner.
      </p>
      <p>
        Your {shortEther(stakingLid)} staked LID gets you access{' '}
        {(
            (startTime + 960000 - (accessTime)) / 60000
          ).toFixed(0)}{' '}
        minutes early.
      </p>
    </div>
  );
}