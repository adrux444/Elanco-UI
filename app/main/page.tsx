import "./main.css";
import NavBar from "../navbar/page";
import Footer from "../footer/page";
export default function Main() {
  return (
    <main>
        <div>
          <NavBar/>
          <div className="title">
            <h1>Welcome Your pet's health at a glance</h1>
          </div>
          <div className="cards">
            <div className="card">Activity Level <a className="viewmore">View more</a></div>
            <div className="card">Calories <a className="viewmore">View more</a></div>
            <div className="card">Sleep <a className="viewmore">View more</a></div>
            <div className="card">Water Intake <a className="viewmore">View more</a></div>
            <div className="card">Heart Rate <a className="viewmore">View more</a></div>
            <div className="card">Breathing Rate <a className="viewmore">View more</a></div>
            <div className="card">Temperature <a className="viewmore">View more</a></div>
            <div className="card">Weight <a className="viewmore">View more</a></div>
            <div className="card">Extra card <a className="viewmore">View more</a></div>
          </div>
          <br />
        </div>
        <Footer/>
    </main>
  );
}