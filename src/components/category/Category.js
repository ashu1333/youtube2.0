import React, { useState } from "react";
import "./_category.scss";
import { useDispatch } from "react-redux";
import {
  getVideosByCategory,
  getPopularvideo,
} from "../../redux/actions/video.action";

const keywords = [
  "All",
  "React js",
  "Punjabi Songs",
  "React Native",
  "use of API",
  "Redux",
  "Arijit Singh",
  "Algorithm Art ",
  "Guitar",
  "Bengali Songs",
  "Coding",
  "Cricket",
  "Football",
  "Real Madrid",
  "Gatsby",
  "Poor Coder",
  "Shwetabh",
];

function Category() {
  const dispatch = useDispatch();

  const handleCategory = (value) => {
    setActiveElement(value);

    if (value === "All") {
      dispatch(getPopularvideo());
    } else {
      dispatch(getVideosByCategory(value));
    }
  };

  const [activeElement, setActiveElement] = useState("All");
  return (
    <div className="category">
      {keywords.map((value, i) => (
        <span
          key={i}
          onClick={() => handleCategory(value)}
          className={activeElement === value ? "active" : ""}
        >
          {value}
        </span>
      ))}
    </div>
  );
}

export default Category;
