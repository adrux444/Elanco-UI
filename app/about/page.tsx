import Image from "next/image";
import styles from "./page.module.css";
import Logo from "next/image";
import NavBar from "../navbar/page";
export default function Login() {
  return (
    <main>
        <div>
          <NavBar/>
          <div>
          <p>
            About Page ELANCO
          </p>
        </div>
        </div>
    </main>
  );
}
