export const useIsAuthenticated = (): boolean => {
    return !!localStorage.getItem('accessToken');
};
