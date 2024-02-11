import { Maybe } from './Maybe'

export function* assign<T>(m: Maybe<T>): Generator<Maybe<T>, T, T> {
    const value = yield m
    return value
}

type MaybeGenerator<T> = Generator<Maybe<unknown>, T, unknown>

export function doNotation<Args extends unknown[], T>(
    fn: (...args: Args) => MaybeGenerator<T>
): (...args: Args) => Maybe<T> {
    return (...args) => {
        const generator = fn(...args)

        return stepGenerator(generator, {
            type: 'firstTime'
        })
    }

    type NextArgument = {
        type: 'firstTime'
    } | {
        type: 'nextTime'
        value: unknown
    }

    function stepGenerator(g: MaybeGenerator<T>, arg: NextArgument): Maybe<T> {
        const result = arg.type === 'firstTime'
            ? g.next()
            : g.next(arg.value)

        if (result.done) {
            return Maybe.just(result.value)
        }

        return Maybe.flatMap(
            result.value,

            value => {
                return stepGenerator(g, {
                    type: 'nextTime',
                    value
                })
            }
        )
    }
}
