// Thin progress bar; `label` is the accessible name.
function ProgressBar({ percent, label }) {
  return (
    <div className="progress" role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={100} aria-valuenow={percent}>
      <span style={{ width: `${percent}%` }} />
    </div>
  )
}

export default ProgressBar
