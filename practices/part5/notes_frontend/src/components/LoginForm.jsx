const LoginForm = ({handleLogin, handleUsernameChange, handlePasswordChange, username, password }) => (
  <form onSubmit={handleLogin}>
    <div>
      <label>
        username
        <input
          type="username"
          value={username}
          onChange={({ target }) => handleUsernameChange(target.value)}
        />
      </label>
    </div>
    <div>
      <label>
        password
        <input
          type="password"
          value={password}
          onChange={({ target }) => handlePasswordChange(target.value)}
        />
      </label>
    </div>
    <button type="submit">login</button>
  </form>
)

export default LoginForm;