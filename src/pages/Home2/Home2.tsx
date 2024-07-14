import Navbar from "../../components/Navbar/Navbar";
import Location_det from "../../components/Location_det/Location_det";

import "../Home2/Home2.css";

const App = () => {
  return (
    <>
      <div className="container">
        <Navbar></Navbar>
        <div>
          <Location_det />
        </div>
      </div>
      <div>
        {/* <img src={cabimg} alt="" className="cabim" /> */}
      </div>
    </>
  );
};

export default App;