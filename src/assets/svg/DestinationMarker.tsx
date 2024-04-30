import * as React from 'react';
import type { SVGProps } from 'react';
const SvgDestinationMarker = (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 98 101" {...props}>
        <g filter="url(#DestinationMarker_svg__a)">
            <path
                fill="#1EDD81"
                fillRule="evenodd"
                d="M73.255 19.846c13.395 13.395 13.395 35.113 0 48.508L49 92.607 24.747 68.354c-13.395-13.395-13.395-35.113 0-48.508 13.395-13.395 35.113-13.395 48.508 0ZM48.999 53.901c5.413 0 9.8-4.388 9.8-9.8 0-5.413-4.387-9.8-9.8-9.8-5.412 0-9.8 4.387-9.8 9.8 0 5.412 4.388 9.8 9.8 9.8Z"
                clipRule="evenodd"
            />
        </g>
        <circle cx={49} cy={44} r={10} fill="#fff" />
        <defs>
            <filter
                id="DestinationMarker_svg__a"
                width={106}
                height={106}
                x={-4}
                y={0}
                colorInterpolationFilters="sRGB"
                filterUnits="userSpaceOnUse"
            >
                <feFlood floodOpacity={0} result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                <feOffset dy={4} />
                <feGaussianBlur stdDeviation={2} />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix values="0 0 0 0 0.671667 0 0 0 0 0.671667 0 0 0 0 0.671667 0 0 0 0.25 0" />
                <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_2306_3557" />
                <feBlend in="SourceGraphic" in2="effect1_dropShadow_2306_3557" result="shape" />
            </filter>
        </defs>
    </svg>
);
export default SvgDestinationMarker;
