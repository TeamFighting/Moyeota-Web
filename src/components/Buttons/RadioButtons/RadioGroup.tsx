interface RadioGroupProps {
    children: React.ReactNode;
}
function RadioGroup({ children }: RadioGroupProps) {
    return <fieldset style={{ border: 'none' }}>{children}</fieldset>;
}

export default RadioGroup;
