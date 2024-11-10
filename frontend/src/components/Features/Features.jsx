import './Features.css'
import FeatureCard from '../FeatureCard/FeatureCard'
import securityImg from './../../images/security_img.jpg'
import decentralizedImg from './../../images/blockchain-cartoon.jpg'
import realTimeImg from "../..//images/realTimeVoting.jpg"
const Features = () => {
  return (
    <div id='features-outer'>
        <div id="features-main" className="container">
          <div className="row g-2">

            <div className="col-lg-4 d-flex justify-content-center">
            <FeatureCard title="Security" text="Blockchain-based decentralized voting systems provide a secure way to vote, making sure votes are safely recorded and can't be altered" img={securityImg} btn="false" />       
            </div>

            <div className="col-lg-4 d-flex justify-content-center">
            <FeatureCard title="Decentralized Governance" text="The voting process is decentralized, relying on distributed consensus mechanisms to ensure no single entity can bias or manipulate the outcome." img={decentralizedImg} btn="false" />       
            </div>

            <div className="col-lg-4 d-flex justify-content-center">
            <FeatureCard title="Real-Time Results" text="Provides faster tallying and reporting, as votes are recorded instantly on the blockchain, enabling real-time results and instant outcome verification without manual counting." img={realTimeImg} btn="false" />       
            </div>

          </div>
        </div>
    </div>

  )
}



export default Features