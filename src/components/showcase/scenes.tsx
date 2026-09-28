/**
 * Flat illustrations standing in for the ad creatives' photos and video.
 * Drawn in SVG so they stay sharp at every size and cost nothing to load.
 */

/** Onam sadya on a banana leaf, seen from above. Portrait, for the Reel. */
export function SadyaScene({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 90 160" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      {/* Table */}
      <rect width="90" height="160" fill="#2e1f17" />
      {[22, 48, 74, 100, 126, 152].map((y) => (
        <rect key={y} x="0" y={y} width="90" height="0.6" fill="#24170f" />
      ))}

      {/* Banana leaf */}
      <path d="M12 10 Q6 84 14 152 L80 154 Q86 80 78 6 Q44 0 12 10 Z" fill="#3b8a37" />
      <path d="M12 10 Q6 84 14 152 L20 152 Q13 84 18 10 Z" fill="#2f7a2c" />
      <path d="M19 9 Q15 84 20 153" stroke="#9cc58e" strokeWidth="0.9" fill="none" />
      {Array.from({ length: 14 }, (_, i) => 16 + i * 10).map((y) => (
        <path key={y} d={`M20 ${y} Q48 ${y - 3} 80 ${y - 6}`} stroke="#4a9b44" strokeWidth="0.35" fill="none" />
      ))}

      {/* Top row: chips, sharkara upperi, pickles, inji curry, salt */}
      {[
        [30, 20], [34, 22], [31, 25], [35, 18],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2.6" fill="#e6b52a" stroke="#c9961a" strokeWidth="0.4" />
      ))}
      <ellipse cx="44" cy="21" rx="3.4" ry="2.6" fill="#7c3f19" />
      <ellipse cx="54" cy="20" rx="3" ry="2.4" fill="#a3261d" />
      <ellipse cx="63" cy="21" rx="3" ry="2.3" fill="#c4581f" />
      <ellipse cx="71" cy="22" rx="2.8" ry="2.2" fill="#4f2410" />
      <circle cx="75" cy="15" r="1.2" fill="#f4f1ea" />

      {/* Curries: thoran, avial, olan, kaalan, pachadi */}
      <ellipse cx="32" cy="38" rx="6" ry="4.6" fill="#94b447" />
      {[[30, 37], [33, 39], [35, 36.5]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="0.6" fill="#f3efdc" />
      ))}
      <ellipse cx="46" cy="37" rx="6" ry="4.4" fill="#ece0bd" />
      {[[44, 36, '#e08b2c'], [47, 38, '#6f9a3b'], [49, 35.5, '#e08b2c']].map(([x, y, c], i) => (
        <rect key={i} x={x as number} y={y as number} width="2" height="0.8" fill={c as string} />
      ))}
      <ellipse cx="60" cy="38" rx="5.6" ry="4.3" fill="#efe8d4" />
      <ellipse cx="72" cy="39" rx="5" ry="4" fill="#e3b843" />
      <ellipse cx="38" cy="52" rx="5" ry="3.8" fill="#c7396b" opacity="0.9" />
      <ellipse cx="52" cy="53" rx="5.4" ry="3.8" fill="#dcc9a0" />

      {/* Pappadam */}
      <circle cx="67" cy="60" r="10.5" fill="#f0d79a" />
      {[[63, 57], [70, 56], [66, 63], [72, 62], [61, 62]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="1.1" fill="#e2c07a" />
      ))}

      {/* Banana */}
      <path d="M26 70 Q24 92 34 106 Q37 104 36 101 Q28 90 30 70 Z" fill="#f0cc38" />
      <path d="M26 70 L30 70 L29 67 Z" fill="#6b4b1c" />

      {/* Rice, with parippu and ghee */}
      <ellipse cx="54" cy="104" rx="18" ry="14" fill="#f6f2e8" />
      {Array.from({ length: 22 }, (_, i) => i).map((i) => (
        <rect
          key={i}
          x={42 + ((i * 7) % 24)}
          y={95 + ((i * 5) % 18)}
          width="1.6"
          height="0.6"
          rx="0.3"
          fill="#e7e1d2"
          transform={`rotate(${(i * 37) % 180} ${42 + ((i * 7) % 24)} ${95 + ((i * 5) % 18)})`}
        />
      ))}
      <ellipse cx="50" cy="101" rx="7" ry="4.6" fill="#e7b33d" />
      <ellipse cx="48.5" cy="100" rx="2.4" ry="1.4" fill="#f6d77a" />

      {/* Payasam in a steel cup */}
      <circle cx="70" cy="132" r="8.5" fill="#c9cdd3" />
      <circle cx="70" cy="132" r="6.8" fill="#d59a57" />
      <circle cx="68" cy="130.5" r="1" fill="#8a4f1f" />
      <circle cx="71.5" cy="133" r="0.8" fill="#f2e6cf" />

      {/* Steel tumbler of water */}
      <circle cx="84" cy="150" r="7" fill="#d7dadf" />
      <circle cx="84" cy="150" r="5.4" fill="#b9bec5" />
    </svg>
  );
}

/** A finished modular kitchen. Landscape, for the YouTube frame. */
export function KitchenScene({ className = '' }: { className?: string }) {
  const sage = '#6f8a73';
  const seam = '#5d7662';
  const handle = '#d9c5a3';
  return (
    <svg className={className} viewBox="0 0 160 90" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="160" height="90" fill="#efe8dc" />
      {/* Window */}
      <rect x="62" y="6" width="36" height="28" fill="#f8fbfd" />
      <rect x="64.5" y="8.5" width="31" height="23" fill="#cfe2ee" />
      <rect x="79.6" y="8.5" width="0.8" height="23" fill="#f8fbfd" />
      {/* Upper cabinets */}
      <rect x="6" y="4" width="50" height="30" fill={sage} />
      <rect x="104" y="4" width="50" height="30" fill={sage} />
      {[31, 129].map((x) => (
        <rect key={x} x={x - 0.25} y="4" width="0.5" height="30" fill={seam} />
      ))}
      {[28.4, 32.4, 126.4, 130.4].map((x) => (
        <rect key={x} x={x} y="27" width="1.2" height="4" rx="0.6" fill={handle} />
      ))}
      {/* Pendant lights */}
      {[70, 90].map((x) => (
        <g key={x}>
          <rect x={x - 0.2} y="0" width="0.4" height="38" fill="#3a3a3a" />
          <circle cx={x} cy="41" r="8" fill="#fff6d6" opacity="0.4" />
          <path d={`M${x - 4} 40 a4 4 0 0 1 8 0 z`} fill="#2c2c2c" />
        </g>
      ))}
      {/* Splashback */}
      <rect x="0" y="34" width="160" height="18" fill="#e6dfd2" />
      {[38, 42, 46, 50].map((y) => (
        <rect key={y} x="0" y={y} width="160" height="0.3" fill="#d8cfbf" />
      ))}
      {/* Things on the worktop */}
      <rect x="16" y="44" width="6" height="8" rx="1" fill="#f2efe9" />
      <ellipse cx="17" cy="40" rx="3" ry="5" fill="#4e7a4f" />
      <ellipse cx="21" cy="39.5" rx="2.6" ry="5.5" fill="#5f8c5e" />
      <rect x="128" y="46" width="4" height="6" rx="0.8" fill="#c8b597" />
      <rect x="133.5" y="44" width="4" height="8" rx="0.8" fill="#b9a27f" />
      <path d="M100 52 L100 47 Q104 44 108 47 L108 52 Z" fill="#2f2f2f" />
      {/* Worktop */}
      <rect x="0" y="52" width="160" height="3.2" fill="#faf8f4" />
      <rect x="0" y="55.2" width="160" height="0.8" fill="#ddd6c9" />
      {/* Base cabinets */}
      <rect x="0" y="56" width="160" height="26" fill={sage} />
      {[40, 80, 120].map((x) => (
        <rect key={x} x={x} y="56" width="0.5" height="26" fill={seam} />
      ))}
      <rect x="0" y="68" width="160" height="0.5" fill={seam} />
      {[17, 57, 97, 137].map((x) => (
        <g key={x}>
          <rect x={x} y="61" width="6" height="1" rx="0.5" fill={handle} />
          <rect x={x} y="74" width="6" height="1" rx="0.5" fill={handle} />
        </g>
      ))}
      {/* Floor */}
      <rect x="0" y="82" width="160" height="8" fill="#c9a27e" />
      <rect x="0" y="86" width="160" height="0.4" fill="#b58d69" />
    </svg>
  );
}

/** Clear aligner tray, drawn as a simple U. Used on the dental feed ad. */
export function AlignerMark({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 90" aria-hidden="true">
      <path
        d="M16 20 C16 70, 104 70, 104 20"
        fill="none"
        stroke="#ffffff"
        strokeWidth="16"
        strokeLinecap="round"
      />
      <path
        d="M16 20 C16 70, 104 70, 104 20"
        fill="none"
        stroke="#9fd6cd"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeDasharray="0.5 6"
      />
      {[0.08, 0.22, 0.36, 0.5, 0.64, 0.78, 0.92].map((t) => {
        // Point on the same cubic curve as the tray, so each tooth sits on it.
        const u = 1 - t;
        const x = 16 * u ** 3 + 48 * u ** 2 * t + 312 * u * t ** 2 + 104 * t ** 3;
        const y = 20 * u ** 3 + 210 * u ** 2 * t + 210 * u * t ** 2 + 20 * t ** 3;
        return <rect key={t} x={x - 3} y={y - 5} width="6" height="10" rx="3" fill="#e9f6f3" />;
      })}
    </svg>
  );
}
