const EpnLogo = () => (
  <svg
    className="header-logo"
    viewBox="0 0 64 64"
    role="img"
    aria-label="Logo Escuela Politécnica Nacional"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="epn-bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#0a5aa8" />
        <stop offset="100%" stopColor="#00234d" />
      </linearGradient>
    </defs>
    <rect width="64" height="64" rx="14" fill="url(#epn-bg)" />
    <rect x="0" y="52" width="64" height="6" fill="#B30006" />
    {/* Torre de vigía / linterna - símbolo Politécnico estilizado */}
    <path
      d="M32 8 L44 24 L38 24 L38 44 L26 44 L26 24 L20 24 Z"
      fill="#FFFFFF"
      opacity="0.95"
    />
    <circle cx="32" cy="18" r="3.5" fill="#B30006" />
    <rect x="24" y="46" width="16" height="4" rx="1" fill="#FFFFFF" opacity="0.9" />
  </svg>
);

export default EpnLogo;
