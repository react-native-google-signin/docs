import React, { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import './styles.css';

type CreemEmbeddedCheckoutProps = {
  checkoutUrl: string;
};

const CREEM_ORIGIN = 'https://www.creem.io';

export default function CreemEmbeddedCheckout({
  checkoutUrl,
}: CreemEmbeddedCheckoutProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [shouldLoadCheckout, setShouldLoadCheckout] = useState(false);
  const titleId = useId();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);

  const loadCheckout = () => {
    setShouldLoadCheckout(true);
  };

  const openCheckout = () => {
    loadCheckout();
    setIsOpen(true);
  };

  useEffect(() => {
    if (document.querySelector(`link[rel="preconnect"][href="${CREEM_ORIGIN}"]`)) {
      return;
    }

    const link = document.createElement('link');
    link.href = CREEM_ORIGIN;
    link.rel = 'preconnect';
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const previousActiveElement = document.activeElement;
    const getFocusableElements = () =>
      Array.from(
        modalContentRef.current?.querySelectorAll<HTMLElement>(
          'button, iframe, [data-focus-sentinel]',
        ) ?? [],
      ).filter(
        (element) =>
          !element.hasAttribute('disabled') &&
          element.getAttribute('aria-hidden') !== 'true',
      );

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        return;
      }

      if (event.key !== 'Tab') {
        return;
      }

      if (
        event.shiftKey &&
        document.activeElement === closeButtonRef.current
      ) {
        event.preventDefault();
        iframeRef.current?.focus();
        return;
      }

      const focusableElements = getFocusableElements();
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (!firstElement || !lastElement) {
        event.preventDefault();
        return;
      }

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
        return;
      }

      if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;

      if (previousActiveElement instanceof HTMLElement) {
        previousActiveElement.focus();
      }
    };
  }, [isOpen]);

  return (
    <section className="creem-embed" aria-labelledby="creem-embed-title">
      <div className="creem-embed__header">
        <div>
          <p className="creem-embed__eyebrow">Universal Sign In license</p>
          <h2 id="creem-embed-title">Ready to install Universal Sign In?</h2>
          <p>
            Buy a license, then use the private npm registry setup below to add
            the package to your app.
          </p>
        </div>
        <button
          className="button button--primary creem-embed__button"
          type="button"
          onClick={openCheckout}
          onFocus={loadCheckout}
          onPointerEnter={loadCheckout}
        >
          Buy license
        </button>
      </div>
      {shouldLoadCheckout &&
        createPortal(
          <div
            className={`creem-embed-modal ${
              isOpen ? '' : 'creem-embed-modal--preload'
            }`}
            role={isOpen ? 'dialog' : undefined}
            aria-modal={isOpen ? 'true' : undefined}
            aria-labelledby={isOpen ? titleId : undefined}
            aria-hidden={!isOpen}
          >
            <button
              className="creem-embed-modal__backdrop"
              type="button"
              aria-label="Close embedded checkout"
              onClick={() => setIsOpen(false)}
            />
            <div className="creem-embed-modal__content" ref={modalContentRef}>
              <div className="creem-embed-modal__header">
                <div>
                  <p className="creem-embed-modal__eyebrow">Secure checkout</p>
                  <h2 id={titleId}>Complete your purchase</h2>
                </div>
                <button
                  className="creem-embed-modal__close"
                  ref={closeButtonRef}
                  type="button"
                  aria-label="Close embedded checkout"
                  onClick={() => setIsOpen(false)}
                />
              </div>
              <span
                className="creem-embed-modal__sentinel"
                data-focus-sentinel
                tabIndex={0}
                onFocus={() => iframeRef.current?.focus()}
              />
              <iframe
                className="creem-embed-modal__frame"
                ref={iframeRef}
                src={checkoutUrl}
                title="Universal Sign In checkout"
                allow="payment *; publickey-credentials-get *"
              />
              <span
                className="creem-embed-modal__sentinel"
                data-focus-sentinel
                tabIndex={0}
                onFocus={() => closeButtonRef.current?.focus()}
              />
            </div>
          </div>,
          document.body,
        )}
    </section>
  );
}
