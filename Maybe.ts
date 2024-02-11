export type Maybe<T> = {
    type: 'nothing'
} | {
    type: 'something'
    value: T
}

export namespace Maybe {
    export function just<T>(value: T): Maybe<T> {
        return {
            type: 'something',
            value
        }
    }

    export function flatMap<T, R>(m: Maybe<T>, fn: (value: T) => Maybe<R>): Maybe<R> {
        if (m.type === 'nothing') {
            return m
        }

        return fn(m.value)
    }
}
