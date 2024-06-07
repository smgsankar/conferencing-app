import { SVGProps } from "react";

export const TickIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 16 16"
    fill="none"
    stroke="var(--primary-theme-color)"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M13.25 4.75L6 12L2.75 8.75" />
  </svg>
);
