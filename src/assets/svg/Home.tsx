import type { SVGProps } from 'react';
const SvgHome = (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 26 26" {...props}>
        <path
            stroke="#606060"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="m3.25 13 2.167-2.167m0 0L13 3.25l7.583 7.583m-15.166 0v10.834c0 .598.485 1.083 1.083 1.083h3.25m10.833-11.917L22.75 13m-2.167-2.167v10.834c0 .598-.485 1.083-1.083 1.083h-3.25m-6.5 0c.598 0 1.083-.485 1.083-1.083v-4.334c0-.598.485-1.083 1.084-1.083h2.166c.599 0 1.084.485 1.084 1.083v4.334c0 .598.485 1.083 1.083 1.083m-6.5 0h6.5"
        />
    </svg>
);
export default SvgHome;
