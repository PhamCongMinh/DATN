declare module '*.svg' {
  const content: string;
  export default content;
}
declare module '*.png' {
  const value: string;
  export default value;
}

declare module '*.svg' {
  const value: string;
  import React from 'react';
  const ReactComponent: React.VFC<React.SVGProps<SVGSVGElement>>;
  export const ReactComponent;
  export default value;
}
