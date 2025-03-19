import { Kind, URIS } from 'fp-ts/HKT'
import * as monad from 'fp-ts/Monad'

export type DoNotationGenerator<F extends URIS, TResult> = 
    Generator<Kind<F, any>, TResult, any> 

export function doNotation<F extends URIS, TResult>(
    monad: monad.Monad1<F>,
    body: (assign: AssignFn<F>) => DoNotationGenerator<F, TResult>
): Kind<F, TResult> {
    const assign = assignForTypeConstructor<F>()
    const generator = body(assign)

    return stepGenerator(generator, {
        type: 'firstTime'
    })

    function stepGenerator(
        g: DoNotationGenerator<F, TResult>,
        arg: NextArgument
    ): Kind<F, TResult> {
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

type NextArgument = {
    type: 'firstTime'
} | {
    type: 'nextTime'
    value: unknown
}

export type AssignFn<F extends URIS> =
    <T>(m: Kind<F, T>) => Generator<Kind<F, T>, T, T>

function assignForTypeConstructor<F extends URIS>()  {
    return function*<T>(m: Kind<F, T>): Generator<Kind<F, T>, T, T> {
        const value = yield m
        return value
    }
}
