
import React, { useEffect , useState } from 'react';
import { useWeb3Context } from "../contexts/useWeb3Context";
import UploadImage from "../components/UploadImage.jsx";
import GetImage from "../components/GetImage.jsx";



export default function Home() {
  const spans = Array(200).fill(null);
  const [reload,setReload]=useState(false)
  useEffect(() => {
    const spanElements = document.querySelectorAll('section span');
    spanElements.forEach((span) => {
      const delay = Math.random() * 5;
      span.style.animationDelay = `${delay}s`;
    });
  }, []);


  const reloadEffect=()=>{
    setReload(!reload)
  }

  return (
    <div className="wrapper">
      <section>
        {spans.map((_, index) => (
          <span key={index} className="animate-span"></span>
        ))}
        <div className="signin">
          <div className="content">
            <h2>Crypted Vault ₿</h2>
            <div className="form">
            <UploadImage reloadEffect={reloadEffect}/>
            <GetImage reload={reload} />
              <div className="inputBx">
                <input type="submit" value="Login" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
