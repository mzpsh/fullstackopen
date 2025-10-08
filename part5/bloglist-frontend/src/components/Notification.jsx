const Notification = ({ message }) => (message ?? null) === null ? null : <div className = "notification">
  {message}
</div>

export default Notification