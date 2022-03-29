
import CountDownShort from './CountDownShort';
import { shortEther, toBN, toWei } from '../utils';
import { totalPresale } from '../config';


export default function Claimer({
  finalEndTime,
  accountShares,
  accountRedeemable,
  maxShares,
  accountClaimedTokens,
  handleLidClaim
}) {
  return (
<>
        <p >
          Claim Your XFI
        </p>
        <p >
          4% released / hour
        </p>
        <p>
          XFI to Claim: {shortEther(accountRedeemable)}
        </p>
        <button
          isDisabled={accountRedeemable === '0'}
          onClick={handleLidClaim}>
          Claim
        </button>
   
          <p >
            Total XFI Claimed
          </p>
          <p>
            {shortEther(accountClaimedTokens)}
          </p>
       
          <p >
            XFI / Hour
          </p>
          <p >
            {maxShares !== '0'
              ? shortEther(
                  toBN(accountShares)
                    .mul(toBN(toWei(totalPresale)))
                    .div(toBN(maxShares))
                    .mul(toBN('2'))
                    .div(toBN('100'))
                )
              : '0'}
          </p>
        
        <p >
          More XFI available to claim in
        </p>
        <CountDownShort
          expiryTimestamp={
            new Date(
              toBN(finalEndTime)
                .add(toBN('3600').mul(toBN('50')))
                .mul(toBN('1000'))
                .toNumber()
            )
          }
        />
        </>
  );
}