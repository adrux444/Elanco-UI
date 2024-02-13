import NavBar from "../navbar/page";
import "./main.css";
import Footer from "../footer/page";
import Link from "next/link";
export default function Main() {
  return (
    <main>
        <div>
          <NavBar/>
          <div className="title">
            <h1>Welcome <div style={{fontWeight: 'lighter'}}>Your pet's health at a glance</div></h1>
          </div>
          <div className="cards">
            <div className="card">
              Activity Level 
              <Link href={'/activity'}><div className="viewmore">View more {">"}</div></Link>
              <br/>
              <p>Average x steps a day</p>
            </div>
            <div className="card">
              Calories 
              <Link href={'/calories'}><div className="viewmore">View more {">"}</div></Link>
              <br/>
              <p>Average x calories burned a day</p>
            </div>
            <div className="card">
              Sleep 
              <Link href={'/sleep'}><div className="viewmore">View more {">"}</div></Link>
              <br/>
              <p>Average x hours a day</p>
            </div>
            <div className="card">
              Water Intake 
              <Link href={'/water'}><div className="viewmore">View more {">"}</div></Link>
              <br/>
              <p>Average x ml a day</p>
            </div>
            <div className="card">
              Heart Rate 
              <Link href={'/heart'}><div className="viewmore">View more {">"}</div></Link>
              <br/>
              <p>Average x beats per minute</p>
            </div>
            <div className="card">
              Breathing Rate 
              <Link href={'/breathing'}><div className="viewmore">View more {">"}</div></Link>
              <br/>
              <p>Average x breaths per minute</p>
            </div>
            <div className="card">
              Temperature 
              <Link href={'/temp'}><div className="viewmore">View more {">"}</div></Link>
              <br/>
              <p>Average x°c</p>
            </div>
            <div className="card">
              Weight 
              <Link href={'/weight'}><div className="viewmore">View more {">"}</div></Link>
              <br/>
              <p>Average xkg</p>
            </div>
            <div className="card">
              Extra card 
              <Link href={'/activity'}><div className="viewmore">View more {">"}</div></Link>
            </div>
          </div>
          <br />
        </div>
        <Footer/>
    </main>
  );
}