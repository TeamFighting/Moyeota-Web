import * as React from 'react';
import type { SVGProps } from 'react';
const SvgAlbum = (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 45 44" {...props}>
        <rect width={44} height={44} x={0.5} fill="#A5DD9B" rx={22} />
        <path
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12.5 18.377c0-.35 0-.525.015-.673a3 3 0 0 1 2.69-2.69c.147-.014.331-.014.7-.014.143 0 .214 0 .274-.004a2 2 0 0 0 1.735-1.25c.023-.056.044-.12.086-.246.042-.127.063-.19.086-.246a2 2 0 0 1 1.735-1.25c.06-.004.127-.004.26-.004h4.838c.133 0 .2 0 .26.004a2 2 0 0 1 1.735 1.25c.023.056.044.12.086.246.042.127.063.19.086.246a2 2 0 0 0 1.735 1.25c.06.004.131.004.273.004.37 0 .554 0 .702.015a3 3 0 0 1 2.69 2.69c.014.147.014.322.014.672V26.2c0 1.68 0 2.52-.327 3.162a3 3 0 0 1-1.311 1.311C30.22 31 29.38 31 27.7 31H17.3c-1.68 0-2.52 0-3.162-.327a3 3 0 0 1-1.311-1.311C12.5 28.72 12.5 27.88 12.5 26.2v-7.823Z"
        />
        <path
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M22.5 26.5a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
        />
    </svg>
);
export default SvgAlbum;
