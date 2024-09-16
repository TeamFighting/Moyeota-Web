import { CheckCircle } from '@assets/svg';
import React from 'react';
import styled from 'styled-components';

export const ErrorToast: React.FC<{ message: string }> = ({ message }) => (
    <ToastWrapper>
        <div>{message}</div>
    </ToastWrapper>
);

export const SuccessToast: React.FC<{ message: string }> = ({ message }) => (
    <ToastWrapper>
        <CheckCircle width={24} />
        <div>{message}</div>
    </ToastWrapper>
);

const ToastWrapper = styled.div`
    text-align: center;
    display: flex;
    align-items: center;
    gap: 9px;
    font-family: Pretendard;
    font-size: 16px;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 0.48px;
    color: white;
`;
