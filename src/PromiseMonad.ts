import { Monad1 } from 'fp-ts/lib/Monad'

declare module 'fp-ts/HKT' {
    export interface URItoKind<A> {
        Promise: Promise<A>
    }
}

/**
 * Note: Promise<A> is not really a monad. But Promise<A> is a monad when
 * A is itself not a Promise (which is majority of uses of Promise in practice)
 *
 * See https://buzzdecafe.github.io/2018/04/10/no-promises-are-not-monads
 */
export const PromiseMonad: Monad1<'Promise'> = {
    URI: 'Promise',

    async of(a) {
        return a
    },

    async map(fa, f) {
        const a = await fa
        return f(a)
    },

    async ap(fab, fa) {
        const f = await fab
        const a = await fa
        return f(a)
    },

    async chain(fa, f) {
        const a = await fa
        return await f(a)
    },
}
