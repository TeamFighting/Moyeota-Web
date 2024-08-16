import * as React from 'react';
import type { SVGProps } from 'react';
const SvgRadioButtonSelected = (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 25 25" {...props}>
        <circle cx={12.5} cy={12.5} r={12.5} fill="#1EDD81" />
        <circle cx={12.5} cy={12.5} r={5.5} fill="#fff" />
    </svg>
);
export default SvgRadioButtonSelected;
