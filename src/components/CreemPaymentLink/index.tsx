import React from 'react';
import './styles.css';

type CreemPaymentLinkProps = {
  paymentUrl: string;
};

export default function CreemPaymentLink({ paymentUrl }: CreemPaymentLinkProps) {
  return (
    <section className="creem-payment" aria-labelledby="creem-payment-title">
      <div>
        <p className="creem-payment__eyebrow">Universal Sign In license</p>
        <h2 id="creem-payment-title">Ready to install Universal Sign In?</h2>
        <p>
          Buy a license, then use the private npm registry setup below to add
          the package to your app.
        </p>
      </div>
      <a
        className="button button--primary creem-payment__button"
        href={paymentUrl}
        rel="noreferrer"
        target="_blank"
      >
        Buy license
      </a>
    </section>
  );
}
