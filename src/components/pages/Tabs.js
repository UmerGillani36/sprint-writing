import React, { useState } from "react";
import CreateNovel from "./CreateNovel";
import ViewNovel from "./ViewNovel";

function Tabs() {
  const [activeTab, setActiveTab] = useState("tab1");
  return (
    <>
      <div id="tabs">
        {/* Render the tabs */}
        <div
          id="tab-1"
          className={`tab ${activeTab === "tab1" ? "active" : ""}`}
          onClick={() => setActiveTab("tab1")}
        >
          Create Novel
        </div>
        <div
          id="tab-2"
          className={`tab ${activeTab === "tab2" ? "active" : ""}`}
          onClick={() => setActiveTab("tab2")}
        >
          View Novels
        </div>

        {/* Render the active tab content */}
        {activeTab === "tab1" && (
          <div id="tab-content-1" className="tab-content">
            {/* Tab 1 content goes here */}
            <CreateNovel />
          </div>
        )}
        {activeTab === "tab2" && (
          <div id="tab-content-2" className="tab-content">
            {/* Tab 2 content goes here */}
            <ViewNovel />
          </div>
        )}
      </div>
    </>
  );
}

export default Tabs;
