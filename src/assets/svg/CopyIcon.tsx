import type { SVGProps } from 'react';
const SvgCopyIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 10" {...props}>
        <g clipPath="url(#CopyIcon_svg__a)">
            <path
                stroke="#606060"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.334 3.333V2.167c0-.467 0-.7.09-.878A.833.833 0 0 1 3.79.923c.178-.09.412-.09.878-.09h3.167c.467 0 .7 0 .878.09.157.08.285.208.364.364.091.179.091.412.091.879v3.167c0 .466 0 .7-.09.878a.833.833 0 0 1-.365.364c-.178.09-.411.09-.878.09H6.667m-4.5 2.5h3.167c.467 0 .7 0 .878-.09a.833.833 0 0 0 .364-.364c.091-.178.091-.412.091-.878V4.667c0-.467 0-.7-.09-.878a.833.833 0 0 0-.365-.365c-.178-.09-.411-.09-.878-.09H2.167c-.466 0-.7 0-.878.09a.833.833 0 0 0-.364.365c-.091.178-.091.411-.091.878v3.167c0 .466 0 .7.09.878.08.157.208.284.365.364.178.09.412.09.878.09Z"
            />
        </g>
        <defs>
            <clipPath id="CopyIcon_svg__a">
                <path fill="#fff" d="M0 0h10v10H0z" />
            </clipPath>
        </defs>
    </svg>
);
export default SvgCopyIcon;
