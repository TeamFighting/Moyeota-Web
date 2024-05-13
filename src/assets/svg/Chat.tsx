import * as React from 'react';
import type { SVGProps } from 'react';
const SvgChat = (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 26 26" {...props}>
        <path
            stroke="#606060"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8.667 13h.01M13 13h.01m4.323 0h.011m5.406 0c0 4.787-4.365 8.667-9.75 8.667-1.668 0-3.237-.372-4.61-1.028l-5.14 1.028 1.511-4.03C3.804 16.296 3.25 14.706 3.25 13c0-4.786 4.365-8.667 9.75-8.667s9.75 3.88 9.75 8.667Z"
        />
    </svg>
);
export default SvgChat;
