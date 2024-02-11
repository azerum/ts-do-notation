import { Monad1 } from 'fp-ts/Monad'

declare module 'fp-ts/HKT' {
    export interface URItoKind<A> {
        Promise: Promise<A>
    }
}

/**
 * Note: Promise<T> isn't really a monad when T is itself a Promise,
 * because chain(Promise<Promise<T>>, x => x) is T, not Promise<T>
 * 
 * But in our case, we only use Promise when T is not a Promise, so
 * we consider this to be a monad
 */
export const PromiseMonad: Monad1<'Promise'> = {
    URI: 'Promise',

    of(a) {
        return Promise.resolve(a)
    },

    chain(fa, f) {
        return fa.then(f)
    },

    map(fa, f) {
        return fa.then(f)
    },

    ap(fab, fa) {
        return fab.then(f => fa.then(f))
    },
}
