import type { TValues } from '../../utils/type';

export const OAUTH_PROVIDER = {
    KAKAO: 'kakao',
    GOOGLE: 'google',
    NAVER: 'naver',
} as const;

export type TOauthProvider = TValues<typeof OAUTH_PROVIDER>;

export const OAUTH_REQUEST_URLS = {
    kakao: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${
        import.meta.env.VITE_KAKAO_REST_API_KEY
    }&redirect_uri=${import.meta.env.VITE_REDIRECT_URI}`,
    naver: `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${
        import.meta.env.VITE_NAVERLOGIN_CLIENT_ID
    }&redirect_uri=${import.meta.env.VITE_REDIRECT_URI}&state=nid/me`,
    google: `https://accounts.google.com/o/oauth2/v2/auth?client_id=${
        import.meta.env.VITE_GOOGLELOGIN_CLIENT_ID
    }&redirect_uri=${import.meta.env.VITE_REDIRECT_URI}&response_type=code&scope=email%20profile`,
} as const satisfies Record<TOauthProvider, string>;
