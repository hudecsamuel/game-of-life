import { transpose } from './transpose'

describe('transpose', () => {
    it('first example - N * N matrix (where N = 5)', () => {
        const input = [
            [1,2,3,4,5],
            [6,7,8,9,10],
            [11,12,13,14,15],
            [16,17,18,19,20],
            [21,22,23,24,25],
        ]

        const expectedOutput = [
            [1,6,11,16,21],
            [2,7,12,17,22],
            [3,8,13,18,23],
            [4,9,14,19,24],
            [5,10,15,20,25],
        ]
        const result = transpose(input);
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
            [1,6,11,16],
            [2,7,12,17],
            [3,8,13,18],
            [4,9,14,19],
            [5,10,15,20],
        ]
        const result = transpose(input);
        expect(result).toEqual(expectedOutput)
    })
})
