// lib/devUtils.js

import React from 'react';

/**
 * Wrap your getServerSideProps to 404 on non-dev
 * @param {Function} fn the actual getServerSideProps implementation
 */
export function withDevOnly(fn) {
    return async (context) => {
        if (process.env.NODE_ENV !== 'development') {
            return { notFound: true };
        }

        return fn ? await fn(context) : { props: {} };
    };
}

/**
 * Component that only renders its children in development
 */
export function DevOnly({ children }) {
    if (process.env.NODE_ENV !== 'development') {
        return null;
    }
    return <>{children}</>;
}
