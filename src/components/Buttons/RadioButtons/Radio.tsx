import RadioContext from '@pages/SelectGenderAge/RadioContext';
import { useContext } from 'react';
import styled from 'styled-components';

interface RadioProps {
    children: React.ReactNode;
    value: string;
    name: string;
    defaultChecked?: boolean;
    disabled?: boolean;
}

export function Radio({ children, value, name, defaultChecked, disabled }: RadioProps) {
    return (
        <>
            <input type="radio" value={value} name={name} defaultChecked={defaultChecked} disabled={disabled} />
            {children}
        </>
    );
}

const StyledRadio = styled.input`
    display: none;
    background-color: aliceblue;
`;
