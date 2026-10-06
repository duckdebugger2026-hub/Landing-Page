// The studio's rubber duck, drawn flat in brand yellows.
export default function Duck({ className = "h-auto w-full" }) {
  return (
    <svg viewBox="0 0 220 200" className={className} aria-hidden>
      {/* tail */}
      <path d="M40 118 C 26 104, 24 84, 34 74 C 44 92, 54 100, 66 104 Z" fill="#e5a03a" />
      {/* body */}
      <path
        d="M36 124 C 36 96, 66 88, 92 100 C 104 106, 120 106, 132 98 C 162 80, 200 100, 194 134 C 188 168, 150 178, 112 178 C 66 178, 36 160, 36 124 Z"
        fill="#f2b63c"
      />
      {/* wing */}
      <path d="M78 124 C 92 110, 126 112, 140 128 C 128 146, 96 150, 78 124 Z" fill="#e5a03a" />
      {/* head */}
      <circle cx="146" cy="70" r="38" fill="#f2b63c" />
      {/* beak */}
      <path d="M176 68 C 196 64, 210 70, 206 80 C 200 90, 184 88, 174 82 Z" fill="#d9682b" />
      <path d="M176 80 C 186 84, 198 84, 204 80" fill="none" stroke="#b5501c" strokeWidth="2" strokeLinecap="round" />
      {/* eye */}
      <circle cx="156" cy="60" r="6" fill="#2a1630" />
      <circle cx="158" cy="58" r="2" fill="#ffffff" />
      {/* cheek */}
      <circle cx="140" cy="82" r="7" fill="#f08a5d" opacity="0.35" />
    </svg>
  )
}
