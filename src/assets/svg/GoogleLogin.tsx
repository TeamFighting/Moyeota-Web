import type { SVGProps } from 'react';
const SvgGoogleLogin = (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 40 40" {...props}>
        <circle cx={20} cy={20} r={20} fill="#F5F0F4" />
        <g clipPath="url(#GoogleLogin_svg__a)">
            <path
                fill="#4285F4"
                d="M33 20.101c0-.903-.072-1.812-.224-2.701H20.52v5.119h7.018c-.291 1.651-1.488 3.313-2.858 4.241l.261 3.12h3.899c2.459-2.315 4.16-5.734 4.16-9.779Z"
            />
            <path
                fill="#34A853"
                d="M20.203 33c3.514 0 6.478-1.14 8.637-3.106l-4.16-3.134c-1.168.785-2.715 1.149-4.472 1.149-3.4 0-6.454-2.265-7.488-5.309H8.56v3.314C10.772 30.258 15.277 33 20.203 33Z"
            />
            <path
                fill="#FBBC04"
                d="M12.72 22.6c-.596-1.582-.336-3.618.26-5.2l.26-3.12-4.68-.26c-2.018 3.6-2.065 8.1-.046 11.7l4.206-3.12Z"
            />
            <path
                fill="#EA4335"
                d="M20.454 12.09a7.374 7.374 0 0 1 5.106 1.927l3.8-3.671c-2.406-2.183-5.6-3.383-8.906-3.345C15.422 7 10.82 9.673 8.56 14.02l4.421 3.38c1.052-3.047 4-5.31 7.473-5.31Z"
            />
        </g>
        <defs>
            <clipPath id="GoogleLogin_svg__a">
                <path fill="#fff" d="M7 7h26v26H7z" />
            </clipPath>
        </defs>
    </svg>
);
export default SvgGoogleLogin;
