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
