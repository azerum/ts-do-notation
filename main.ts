import { Maybe } from './Maybe'
import { assign, yieldNotation } from './yieldNotation'

const main = yieldNotation(function* (input: string) {
    const x = yield* assign(parseNumber(input))
    const y = yield* assign(sqrt(x))
    
    return y + 10
})

console.log('abc', main('abc'))
console.log('-1', main('-1'))
console.log('4', main('4'))

function parseNumber(s: string): Maybe<number> {
    const n = Number(s)

    if (Number.isFinite(n)) {
        return Maybe.just(n)
    }

    return { type: 'nothing' }
}

function sqrt(n: number): Maybe<number> {
    return n < 0 ? { type: 'nothing' } : Maybe.just(Math.sqrt(n))
}
