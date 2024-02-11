import { PromiseMonad } from './PromiseMonad'
import { yieldNotation } from './yieldNotation'

async function main() {
    console.log(await compute(42))
}

const compute = yieldNotation(PromiseMonad)(function* (assign, value: number) {
    const x = yield* assign(delay(value + 10, 1_000))
    const y = yield* assign(delay(value - 10, 1_000))

    return x + y
})

function delay<T>(value: T, ms: number) {
    return new Promise<T>(resolve => {
        setTimeout(() => {
            resolve(value)
        }, ms)
    })
}

main()
