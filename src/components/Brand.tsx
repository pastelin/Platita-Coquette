import { storeConfig } from '../config/store';

export function SparkleMark({ small = false }: { small?: boolean }) {
  return <svg width={small ? 22 : 34} height={small ? 22 : 34} viewBox="0 0 36 36" fill="none" aria-hidden="true">
    <path d="M18 1.5C19.49 11.76 24.24 16.51 34.5 18c-10.26 1.49-15.01 6.24-16.5 16.5C16.51 24.24 11.76 19.49 1.5 18 11.76 16.51 16.51 11.76 18 1.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    <circle cx="29.5" cy="6.5" r="1.6" fill="currentColor" />
  </svg>;
}

export function Brand({ inverted = false }: { inverted?: boolean }) {
  return <a href="#inicio" className={`brand ${inverted ? 'brand--inverse' : ''}`} aria-label={`${storeConfig.name}, ir al inicio`}>
    <SparkleMark />
    <span className="brand__type"><strong>{storeConfig.name}</strong><small>{storeConfig.descriptor}</small></span>
  </a>;
}
