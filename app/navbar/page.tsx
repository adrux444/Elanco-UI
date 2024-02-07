import Link from "next/link"
import "./navbar.css"
export default function Nav(){

    return (
        <div className="link-container">
            <Link className="redirect" href='../'><p>Home</p></Link>
            <Link className="redirect" href='/login'><p>Login</p></Link>
            <Link className="redirect" href='/register'><p>Sign Up</p></Link>
            <Link className="redirect" href='/about'><p>About</p></Link>
        </div>

    )

}