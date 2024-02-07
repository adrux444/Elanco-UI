import Image from "next/image";
import styles from "./page.module.css";
import Logo from "next/image";
import NavBar from "../navbar/page";
export default function Main() {
  return (
    <main>
        <div>
          <NavBar/>
          <div>
          <p>
            Main Page ELANCO
          </p>
        </div>
        </div>
    </main>
  );
}
