import Image from "next/image";
import styles from "./page.module.css";
import Logo from "next/image";


export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
      <Image src="/images/logo.png" alt="Logo" width={200} height={100} /> {/* Adjust width and height according to your logo dimensions */}
        <p>
          Home Page ELANCO
        </p>
        <div>
        </div>
      </div>

    </main>
  );
}