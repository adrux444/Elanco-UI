import Link from "next/link"
import Image from "next/image"
import "./footer.css"

export default function Footer(){
    return (
        <div className="footer-container">
            <div className="content-container">
                <div className="text-container">
                    <p>Created and designed by Elanco</p>
                    <p className="bottom-line">&copy; All right reserved</p>
                </div>
                <div className="image-container">
                    <Image className="elanco-logo2" src="/images/cropfblogo.jpg" alt="Logo" width={150} height={50}/>
                </div>
            </div>
        </div>
    )
}