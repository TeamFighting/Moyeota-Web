import type { TValues } from '@utils/type';

export const ADD_ACCOUNT_FROM = {
    CREATE_POT: 'createPot',
    MY_PAGE: 'mypage',
} as const;

export type TAddAccountFrom = TValues<typeof ADD_ACCOUNT_FROM>;

export const ErrorToastStyle = {
    background: 'red',
    color: 'white',
    borderRadius: '99px',
    textAlign: 'center',
    fontFamily: 'Pretendard',
    fontSize: '16px',
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 'normal',
    letterSpacing: '0.48px',
} as React.CSSProperties;
