import type { ReactNode } from "react";

export const richEm = { em: (chunks: ReactNode) => <em>{chunks}</em> };

export const richTedx = {
  tedx: (chunks: ReactNode) => (
    <span style={{ textTransform: "none" }}>{chunks}</span>
  ),
};

export const richEmTedx = { ...richEm, ...richTedx };
