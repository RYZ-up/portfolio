"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight02Icon } from "@hugeicons/core-free-icons";
import type { MouseEventHandler } from "react";
import { cn } from "@/lib/utils";
import "./discover-button.css";

export interface DiscoverButtonProps {
  label?: string;
  href?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

export function DiscoverButton({
  label = "Discover Components",
  href,
  onClick,
  className,
}: DiscoverButtonProps) {
  const buttonFace = (
    <>
      <span className="obsidian-discover-button__fill" aria-hidden="true" />
      <span className="obsidian-discover-button__icon" aria-hidden="true">
        <HugeiconsIcon icon={ArrowRight02Icon} size={25} strokeWidth={2.25} />
      </span>
      <span className="obsidian-discover-button__text">{label}</span>
    </>
  );

  if (href) {
    return (
      <a className={cn("obsidian-discover-button", className)} href={href}>
        {buttonFace}
      </a>
    );
  }

  return (
    <button className={cn("obsidian-discover-button", className)} type="button" onClick={onClick}>
      {buttonFace}
    </button>
  );
}

export default DiscoverButton;
