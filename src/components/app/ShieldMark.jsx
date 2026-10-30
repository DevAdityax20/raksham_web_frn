// Raksham shield with a star, drawn in the brand yellow. Decorative; the wordmark carries the name.
function ShieldMark({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 40 46" fill="none" aria-hidden="true" focusable="false">
      <path
        d="M20 2.5 35.5 8v13.2c0 10.2-6.6 17.4-15.5 21.3C11.1 38.6 4.5 31.4 4.5 21.2V8z"
        stroke="#ffc400"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="m20 13.6 2.2 4.6 5 .6-3.7 3.4 1 5-4.5-2.5-4.5 2.5 1-5-3.7-3.4 5-.6z"
        fill="#ffc400"
      />
    </svg>
  )
}

export default ShieldMark
