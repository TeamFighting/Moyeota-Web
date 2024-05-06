import type { SVGProps } from 'react';
const SvgCamera = (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 45 44" {...props}>
        <rect width={44} height={44} x={0.5} fill="#C5EBAA" rx={22} />
        <path
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M26.7 31h-9.269c-.605 0-.908 0-1.049-.12a.5.5 0 0 1-.173-.42c.014-.183.228-.397.657-.826l8.503-8.503c.396-.396.594-.594.822-.668a1 1 0 0 1 .618 0c.228.074.426.272.822.668L31.5 25v1.2M26.7 31c1.68 0 2.52 0 3.162-.327a3 3 0 0 0 1.311-1.311c.327-.642.327-1.482.327-3.162M26.7 31h-8.4c-1.68 0-2.52 0-3.162-.327a3 3 0 0 1-1.311-1.311C13.5 28.72 13.5 27.88 13.5 26.2v-8.4c0-1.68 0-2.52.327-3.162a3 3 0 0 1 1.311-1.311C15.78 13 16.62 13 18.3 13h8.4c1.68 0 2.52 0 3.162.327a3 3 0 0 1 1.311 1.311c.327.642.327 1.482.327 3.162v8.4M21 18.5a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"
        />
    </svg>
);
export default SvgCamera;
