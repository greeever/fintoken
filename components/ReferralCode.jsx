import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { shortEther } from '../utils';

export default function ReferralCode({
  address,
  earnedReferrals,
  referralCounts
}) {
  return (
    <div>
        <CopyToClipboard p={'https://xfi.lid.sh/#/' + address}>
          <button>
            Copy
          </button>
        </CopyToClipboard>
        <p >
          Referral Code
        </p>
        <p>
          2.5% rewards when anyone uses to deposit
        </p>
        <p>
          https://xfi.lid.sh/#/{address}
        </p>
     
          <p>
            Account number of referrals
          </p>
          <p >
            {referralCounts}
          </p>
        <div>
          <p >
            Referral Eth Earned
          </p>
          <p>
            {shortEther(earnedReferrals)}
          </p>
        </div>
    </div>
  );
}