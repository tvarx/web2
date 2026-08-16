import React from "react";
import logoUrl from "../assets/images/logo.webp";

interface TarxLogoProps {
  className?: string;
  size?: number;
}

export function TarxLogo({ className = "", size = 40 }: TarxLogoProps) {
  return (
    <img
      src={logoUrl}
      alt="TvarX Logo"
      id="tvarx-brand-logo"
      className={`inline-block object-contain ${className}`}
      style={{ width: size, height: size }}
      referrerPolicy="no-referrer"
    />
  );
}

export default TarxLogo;


