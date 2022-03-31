import React from 'react';

export default function Header({ address, onConnect }) {
  return (
    <div >
        <a
          display="inline-block"
          href="https://xfinance.io/"
          m="0px"
          ml="-3px">
          <img
            src="/logo.png"
            alt="XFI Logo"
          />
          <p>
            XFI Presale
          </p>
        </a>
        {address ? (
          <div ml="auto" display="inline-block">
            <p>
              {address.substring(0, 6)}
            </p>
          </div>
        ) : (
          <button
            onClick={onConnect}>
            Connect
          </button>
        )}
      <div>
        {/*
        <p float="right">
        Whitelisted? {isWhitelisted ? "Yes" : "No"}
        </p>
      */}
        <a href="https://lid.sh">
          <img
            src="/logo-lid.png"
            alt="Lid Logo"
          />
          <p >
            Lid Simplified Presale v1.0.0
          </p>
        </a>
        <p>
          Lid Certification only protects against exit scams.
          <br />
          It does not provide any other guarantees.
        </p>
      </div>
    </div>
  );
}