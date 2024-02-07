import NavBar from "../navbar/page";
import Input from '@mui/joy/Input';


export default function Login() {

  return (
    <main>
        <div>
          <NavBar/>
          <div className="login-container">
            <form>
              <h1>Login</h1>
              <input type="text" placeholder="Username" />
              <Input placeholder="Type in here…" />
              <input type="password" placeholder="Password" />
              <button type="submit">Login</button>
            </form>
          </div>
        </div>
    </main>
  );
}
