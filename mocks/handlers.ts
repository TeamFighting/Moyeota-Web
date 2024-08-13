import { http, HttpResponse } from 'msw';

export const handlers = [
    http.get('/user', () => {
        return HttpResponse.json(
            [
                { bankName: '우리은행', accountNumber: '1002-123-456789', accountHolder: '홍길동' },
                { bankName: '신한은행', accountNumber: '1002-123-456789', accountHolder: '홍길동' },
                {
                    bankName: '국민은행',
                    accountNumber: '1002-123-456789',
                    accountHolder: '홍길동',
                },
                {
                    bankName: '하나은행',
                    accountNumber: '1002-123-456789',
                    accountHolder: '홍길동',
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
