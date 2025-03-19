import { doNotation } from './doNotation'
import { PromiseMonad } from './PromiseMonad'

void main()

function main() {
    doNotation(PromiseMonad, function* (assign) {
        const text = yield* assign(fetchExample())
        console.log(text)
    })
}

function fetchExample() {
    return doNotation(PromiseMonad, function* (assign) {
        const response = yield* assign(fetch('https://example.com'))
        const text = yield* assign(response.text())

        return text
    })
}
