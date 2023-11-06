declare module "*.svg" {
  import React = require("react");
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

declare module "ios-style-picker" {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export function DatePicker(props: any): JSX.Element;
}

declare module "react-ios-time-picker";

declare global {
  interface Window {
    ReactNativeWebView: {
      postMessage: (message: string) => void;
    };
  }
}
