function Auth() {
  return (
    <div class="auth-page">
        <div class="login">
            <form action="post">
                <input type="text" placeholder="Username" />
                <input type="password" placeholder="Password" />
                <button type="submit">Login</button>
            </form>
        </div>
        <div class="vl"></div>
        <div class="register">
            <form action="post">
                <input type="text" placeholder="Username" />
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Password" />
                <button type="submit">Register</button>
            </form>
        </div>
    </div>
  );
}
export default Auth;