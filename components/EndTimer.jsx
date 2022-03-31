import React from 'react';
import CountDown from './CountDown';
import { fromWei } from '../utils';

export default function EndTimer({ expiryTimestamp, hardcap }) {
  return (
    <div
      >
      <p >
        XFI Presale ends in
      </p>
      <CountDown
        expiryTimestamp={expiryTimestamp == null ? new Date() : expiryTimestamp}
      />
      <p>
        48 hour timer.
      </p>
      <p>
        Ends after 48 hours or {fromWei(hardcap)} ETH.
      </p>
    </div>
  );
}