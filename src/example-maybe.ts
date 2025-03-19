import * as option from 'fp-ts/Option'
import { doNotation } from './doNotation'

const numbers = [-2, -1, 0, 1, 2]

const results = numbers
    .map(sqrtAndBack)
    .filter(option.isSome)

// [0, 1, 2]
console.dir(results)

function sqrtAndBack(x: number): option.Option<number> {
    return doNotation(option.Monad, function* (assign) {
        const y = yield* assign(sqrt(x))
        return y ** 2
    })
}

/**
 * Not defined for x < 0
 */
function sqrt(x: number): option.Option<number> {
    if (x < 0) {
        return option.none
    }

    return option.some(Math.sqrt(x))
}
