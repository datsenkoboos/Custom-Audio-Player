export default function throttle(f, ms) {
    let isThrottled = false
    let savedArgs
    let savedThis
    function wrapper() {

        if (isThrottled) {
            savedArgs = arguments
            savedThis = this
            return
        }

        f.apply(this, arguments)

        isThrottled = true

        setTimeout(() => {
            isThrottled = false

            if (savedArgs) {
                wrapper.apply(savedThis, savedArgs)
                savedArgs = savedThis = null
            }

        }, ms)
    }
    return wrapper
}