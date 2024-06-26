import type { SVGProps } from 'react';
const SvgStar = (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" {...props}>
        <g clipPath="url(#Star_svg__a)">
            <path
                stroke="#606060"
                strokeWidth={2}
                d="M11.049 2.927c.3-.922 1.603-.922 1.902 0L14.47 7.6a1 1 0 0 0 .95.69h4.915c.97 0 1.372 1.24.588 1.81l-3.976 2.888a1 1 0 0 0-.363 1.118l1.519 4.675c.299.92-.756 1.687-1.54 1.117l-3.975-2.888a1 1 0 0 0-1.176 0L7.436 19.9c-.783.569-1.838-.197-1.539-1.118l1.519-4.675a1 1 0 0 0-.363-1.117L3.077 10.1c-.784-.569-.381-1.808.588-1.808h4.914A1 1 0 0 0 9.53 7.6l1.519-4.674Z"
            />
        </g>
        <defs>
            <clipPath id="Star_svg__a">
                <path fill="#fff" d="M0 0h24v24H0z" />
            </clipPath>
        </defs>
    </svg>
);
export default SvgStar;
