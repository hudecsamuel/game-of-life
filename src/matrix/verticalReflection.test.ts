import { verticalReflection } from "./verticalReflection";

describe('verticalReflection', () => {
    it('first example - N * N matrix (where N = 5)', () => {
        const input = [
            [1,2,3,4,5],
            [6,7,8,9,10],
            [11,12,13,14,15],
            [16,17,18,19,20],
            [21,22,23,24,25],
        ]

        const expectedOutput = [
            [5,4,3,2,1],
            [10,9,8,7,6],
            [15,14,13,12,11],
            [20,19,18,17,16],
            [25,24,23,22,21],
        ]
        const result = verticalReflection(input);
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
            [5,4,3,2,1],
            [10,9,8,7,6],
            [15,14,13,12,11],
            [20,19,18,17,16],
        ]
        const result = verticalReflection(input);
        expect(result).toEqual(expectedOutput)
    })
})
