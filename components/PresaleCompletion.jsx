import React from 'react';

export default function PresaleCompletion({
  isEnded,
  handleSendToUniswap,
  handleIssueTokens
}) {
  return (
    <div>
      <p >
        To Complete XFI Presale:
      </p>
      {!isEnded && (
        <p >
          This section unlocks at presale end.
        </p>
      )}
      <p >
        Each button called once globally in order.
      </p>
      {isEnded && (
        <>
          <button
            onClick={handleSendToUniswap}>
            Send to Uniswap
          </button>
          <button
            onClick={handleIssueTokens}>
            Issue Tokens
          </button>
        </>
      )}
    </div>
  );
}