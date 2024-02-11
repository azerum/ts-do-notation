import { Monad1 } from 'fp-ts/lib/Monad'
import { } from 'fp-ts/Option'

export type Maybe<T> = {
    type: 'nothing'
} | {
    type: 'something'
    value: T
}

declare module 'fp-ts/HKT' {
    export interface URItoKind<A> {
        Maybe: Maybe<A>
    }
}

export const Maybe: Monad1<'Maybe'> = {
    URI: 'Maybe',

    of(a) {
        return {
            type: 'something',
            value: a
        }
    },

    chain(fa, f) {
        if (fa.type === 'nothing') {
            return fa
        }

        return f(fa.value)
    },

    map(fa, f) {
        return Maybe.chain(fa, a => Maybe.of(f(a)))
    },

    ap(fab, fa) {
        if (fab.type === 'nothing') {
            return fab
        }

        if (fa.type === 'nothing') {
            return fa
        }

        return Maybe.of(fab.value(fa.value))
    },
}

export const Nothing: Maybe<never> = { type: 'nothing' }
