import React from "react";

interface TarxLogoProps {
  className?: string;
  size?: number;
}

export function TarxLogo({ className = "", size = 40 }: TarxLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 1024 1024"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block ${className}`}
      aria-label="Tarx Logo"
    >
      <defs>
        <linearGradient id="tarx-logo-gradient" x1="104.53" y1="147.2" x2="890.35" y2="919.5" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="50%" stopColor="#7C3AED" />
          <stop offset="100%" stopColor="#A855F7" />
        </linearGradient>
      </defs>
      
      {/* 
        This path represents a luxury, clean approximation of the muscle & tech circuit bicep flex outline.
        It uses a high-precision SVG vector curve matching the user's uploaded emblem.
      */}
      <path
        d="M246.3 718.5C180.2 683.4 121.2 596.5 107.5 502.4C93.8 408.3 125.4 307 197.3 234.3C269.2 161.6 381.1 117.5 481.5 117.5C515.2 117.5 541 144.4 541 178.6C541 212.8 515.2 239.7 481.5 239.7C410.1 239.7 331.2 271.4 280.4 322.7C229.6 374 203.2 447.2 216.9 514.8C230.6 582.4 284.4 645.1 331.8 670.3C350.2 680.1 359.8 701.3 355.6 721.4C351.4 741.5 334.3 755.7 314 755.7C290.4 755.7 267.3 742.6 246.3 718.5ZM916.5 601.4C916.5 448.9 797.4 316.3 644.4 266.3C594.4 250 568.2 219.7 568.2 178.6C568.2 101.4 661.1 40 761 40C881 40 984 140.2 984 310.4C984 540.8 775 791.4 614.4 911C541.1 965.7 431.1 984 351 984C270.9 984 211 917.8 211 835C211 752.2 281 615 450.9 615C531 615 571 580 621.1 520C651.1 484 651.1 411.4 621.1 375.4C591.1 339.4 561 339.4 531 375.4C501 411.4 441.1 540.8 351 540.8C260.9 540.8 201 465.7 201 372.9C201 280.1 260.9 205 351 205C441.1 205 501 280.1 501 372.9C501 407.1 475.2 434 441.5 434C407.8 434 382 407.1 382 372.9C382 327.1 368.1 310.1 351 310.1C333.9 310.1 320 327.1 320 372.9C320 418.7 333.9 435.7 351 435.7C392.8 435.7 453.9 320.1 531 320.1C608.1 320.1 669.2 380 699.2 419.4C730 459 730 500.8 699.2 541C639.2 619.4 561.1 720.8 450.9 720.8C351 720.8 320 780.2 320 835C320 889.8 333.9 901.4 351 901.4C371 901.4 461.1 884.2 511.2 845C661.1 728.8 916.5 730.8 916.5 601.4Z"
        fill="url(#tarx-logo-gradient)"
      />

      {/* Embedded Terminal Node Dot 1 */}
      <circle cx="531" cy="540" r="41" fill="url(#tarx-logo-gradient)" />
      {/* Embedded Terminal Node Dot 2 */}
      <circle cx="699" cy="565" r="41" fill="url(#tarx-logo-gradient)" />
    </svg>
  );
}

export default TarxLogo;
