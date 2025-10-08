const Error = ({ error }) => (error ?? null) === null ? null : <div className = "notification-error">
  {error}
</div>

export default Error