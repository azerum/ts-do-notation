import { Maybe } from './Maybe'
import { yieldNotation } from './yieldNotation'

function main() {
    console.log('abc', compute('abc'))
    console.log('-1', compute('-1'))
    console.log('4', compute('4'))
}

const compute = yieldNotation(Maybe)(function* (
    assign, 
    input: string
) {
    const x = yield* assign(parseNumber(input))
    const y = yield* assign(sqrt(x))

    return y + 10
})

function parseNumber(s: string): Maybe<number> {
    const n = Number(s)

    if (Number.isFinite(n)) {
        return Maybe.of(n)
    }

    return { type: 'nothing' }
}

function sqrt(n: number): Maybe<number> {
    return n < 0 ? { type: 'nothing' } : Maybe.of(Math.sqrt(n))
}

main()
