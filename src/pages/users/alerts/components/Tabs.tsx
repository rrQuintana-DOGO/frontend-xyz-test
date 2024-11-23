import "./Tabs.css";
import { TabsProps } from "./Types";

const Tabs: React.FC<TabsProps> = ({ tabs, selectedTab, onTabSelect }) => {
  return (
    <div className="tabs">
      {tabs.map((tab, index) => (
        <div
          key={index}
          className={`tab ${selectedTab === index ? "active" : ""}`}
          onClick={() => onTabSelect(index)}
        >
          {tab.label}{tab.count && ` (${tab.count})`}
        </div>
      ))}
    </div>
  );
};

export default Tabs;