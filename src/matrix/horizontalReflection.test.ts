import { horizontalReflection } from "./horizontalReflection";

describe('horizontalReflection', () => {
    it('first example - N * N matrix (where N = 5)', () => {
        const input = [
            [1,2,3,4,5],
            [6,7,8,9,10],
            [11,12,13,14,15],
            [16,17,18,19,20],
            [21,22,23,24,25],
        ]

        const expectedOutput = [
            [21,22,23,24,25],
            [16,17,18,19,20],
            [11,12,13,14,15],
            [6,7,8,9,10],
            [1,2,3,4,5],
        ]
        const result = horizontalReflection(input);
        expect(result).toEqual(expectedOutput)
    })

    it('second example - N * M matrix (where N = 4, M = 5)', () => {
        const input = [
            [1,2,3,4,5],
            [6,7,8,9,10],
            [11,12,13,14,15],
            [16,17,18,19,20],
        ]

        const expectedOutput = [
            [16,17,18,19,20],
            [11,12,13,14,15],
            [6,7,8,9,10],
            [1,2,3,4,5],
        ]
        const result = horizontalReflection(input);
        expect(result).toEqual(expectedOutput)
    })
})
