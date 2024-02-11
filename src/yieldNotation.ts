import { Kind, URIS } from 'fp-ts/HKT'
import { Monad1 } from 'fp-ts/Monad'

export function yieldNotation<F extends URIS>(monad: Monad1<F>) {
    type TheGenerator<T> = Generator<Kind<F, unknown>, T, unknown> 
    const assignFn = assign(monad)

    return wrap

    function wrap<Args extends unknown[], T>(
        fn: (assign: AssignFn<F>, ...args: Args) => TheGenerator<T>
    ) {
        return (...args: Args): Kind<F, T> => {
            const generator = fn(assignFn, ...args)

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

        function stepGenerator(
            g: TheGenerator<T>,
            arg: NextArgument
        ): Kind<F, T> {
            const result = arg.type === 'firstTime'
                ? g.next()
                : g.next(arg.value)

            if (result.done) {
                return monad.of(result.value)
            }

            return monad.chain(result.value, value => {
                return stepGenerator(g, {
                    type: 'nextTime',
                    value
                })
            })
        }
    }
}

type AssignFn<F extends URIS> = 
    <T>(m: Kind<F, T>) => Generator<Kind<F, T>, T, T>

function assign<F extends URIS>(monad: Monad1<F>)  {
    return function*<T>(m: Kind<F, T>): Generator<Kind<F, T>, T, T> {
        const value = yield m
        return value
    }
}
