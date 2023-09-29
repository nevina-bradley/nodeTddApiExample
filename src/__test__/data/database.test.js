const { createComment, getComments } = require('../../data/database');

jest.mock('mysql2', () => {
    const mPool = {
        promise: jest.fn().mockReturnThis(),
        query: jest.fn(),
    };
    return {
        createPool: jest.fn(() => mPool),
    };
});

describe('Database Functions', () => {
    test('createComment', async () => {
        const insertId = 1;
        require('mysql2').createPool().query.mockResolvedValueOnce([{ insertId }]);
        const result = await createComment('Test Name', 'Test Description');
        expect(result).toBe(insertId);
    });

    test('getComments', async () => {
        const rows = [{ name: 'Test Name', description: 'Test Description' }];
        require('mysql2').createPool().query.mockResolvedValueOnce([rows]);
        const result = await getComments();
        expect(result).toEqual(rows);
    });
});
