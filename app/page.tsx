import Image from "next/image";
import styles from "./page.module.css";
import Logo from "next/image";
import NavBar from "./navbar/page";

export default function Home() {
  return (
    <main>
        <div>
          <NavBar/>
        </div>

        <div>
          <p>
            Home Page ELANCO
          </p>
        </div>
    </main>
  );
}