import type { SVGProps } from 'react';
import { forwardRef, memo, Ref } from 'react';

export type EHLogoProps = SVGProps<SVGSVGElement>;

const SvgEHLogo = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    fill='none'
    ref={ref}
    viewBox='0 0 200 200'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <rect
      fill='#35a8e2'
      height='156'
      rx='38'
      strokeWidth='14'
      width='156'
      x='22'
      y='22'
    />

    <text
      fill='#fff'
      fontFamily='system-ui, -apple-system, sans-serif'
      fontSize='88'
      fontWeight='900'
      letterSpacing='-5px'
      textAnchor='middle'
      x='100'
      y='128'
    >
      EH
    </text>
  </svg>
);

const ForwardRef = forwardRef(SvgEHLogo);
const Memo = memo(ForwardRef);

export { Memo as EHLogo };
