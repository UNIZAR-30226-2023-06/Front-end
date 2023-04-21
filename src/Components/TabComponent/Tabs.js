import React from "react";
import { useState } from "react";

import FirstTab from "../AllTabs/FirstTab";
import SecondTab from "../AllTabs/SecondTab";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("tab1");

  const handleTab1 = () => {
    // update the state to tab1
    setActiveTab("tab1");
  };
  const handleTab2 = () => {
    // update the state to tab2
    setActiveTab("tab2");
  };

  return (
    <div className="Tabs_partida">

      {/* Tab nav */}
      <ul className="nav_partida">

        <li
          className={activeTab === "tab1" ? "active" : "inactive"}
          onClick={handleTab1}
        >
          Chat
        </li>

        <li
          className={activeTab === "tab2" ? "active" : "inactive"}
          onClick={handleTab2}
        >
          Recursos
        </li>

      </ul>

      <div className="outlet">
        {activeTab === "tab1" ? <FirstTab /> : <SecondTab />}
      </div>

    </div>
  );
};

export default Tabs;