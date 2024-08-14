import { http, HttpResponse } from 'msw';

export const handlers = [
    http.get('/users/account', () => {
        return HttpResponse.json(
            [
                { bankName: '우리은행', accountNumber: '1002-123-456789' },
                { bankName: '신한은행', accountNumber: '1002-123-456789' },
                {
                    bankName: '국민은행',
                    accountNumber: '1002-123-456789',
                },
                {
                    bankName: '하나은행',
                    accountNumber: '1002-123-456789',
                },
            ],
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                status: 200,
            },
        );
    }),
];
