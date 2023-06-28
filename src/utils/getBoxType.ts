export function getBoxType(input: string) {
    try {
        switch (input) {
            case `gold`:
                return 0
            case `platinum`:
                return 1
            case `diamond`:
                return 2
            default:
                throw new Error(`boxType is invalid`)
        }
    } catch (e) {
        throw e
    }
}