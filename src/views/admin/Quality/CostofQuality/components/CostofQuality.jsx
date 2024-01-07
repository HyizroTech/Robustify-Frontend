import "./CostofQuality.css";
import React, { useState } from "react";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Tooltip } from "recharts";

import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";

import CustomDropdown from "../../CustomDropdown/CustomDropdown";

const CostofQuality = () => {
  const [goodQualityValue, setGoodQualityValue] = useState("");
  const [poorQualityValue, setPoorQualityValue] = useState("");
  const [selectedGoodQuality, setSelectedGoodQuality] = useState(null);
  const [selectedPoorQuality, setSelectedPoorQuality] = useState(null);
  const [goodQualityCosts, setGoodQualityCosts] = useState([]);
  const [poorQualityCosts, setPoorQualityCosts] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const calculateCOQRatio = () => {
    const totalGoodQualityCost = goodQualityCosts.reduce(
      (acc, cost) => acc + parseFloat(cost.cost),
      0
    );
    const totalPoorQualityCost = poorQualityCosts.reduce(
      (acc, cost) => acc + parseFloat(cost.cost),
      0
    );

    if (totalGoodQualityCost + totalPoorQualityCost === 0) {
      return 0; // Avoid division by zero
    }

    return totalPoorQualityCost / (totalGoodQualityCost + totalPoorQualityCost);
  };

  const coqRatio = calculateCOQRatio();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const buttonStyle = {
    background: "#233B55",
    color: "white",
    borderRadius: "30px",
    display: "flex",
    fontFamily: "Inter",
    fontSize: "20px",
    fontWeight: "700",
    padding: "0.5rem",
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleSelectedOption = (option, type) => {
    if (type === "good") {
      setSelectedGoodQuality(option);
      setGoodQualityValue(""); // Clear the input when a new option is selected
    } else if (type === "poor") {
      setSelectedPoorQuality(option);
      setPoorQualityValue(""); // Clear the input when a new option is selected
    }
  };

  const handleAddCost = (type) => {
    const costValue = type === "good" ? goodQualityValue : poorQualityValue;
    const selectedOption =
      type === "good" ? selectedGoodQuality : selectedPoorQuality;

    if (costValue && selectedOption) {
      const newCost = {
        type: selectedOption.value, // Assuming the option is an object with a value property
        cost: costValue,
      };

      if (type === "good") {
        setGoodQualityCosts((prevCosts) => [...prevCosts, newCost]);
        <div>
          <Button onClick={handleClick} aria-describedby={id}>
            Open Popover
          </Button>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          ></Popover>
        </div>;
        setGoodQualityValue("");
      } else if (type === "poor") {
        setPoorQualityCosts((prevCosts) => [...prevCosts, newCost]);
        setPoorQualityValue("");
      }
    }
  };

  const donutChartData = [
    { name: "Good Quality", value: coqRatio * 100 }, // Good Quality percentage
    { name: "Poor Quality", value: (1 - coqRatio) * 100 }, // Poor Quality percentage
  ];

  return (
    <>
      <h1 className="COQ-title">Cost of Quality </h1>
      <main className="COQ-continar">
        <div className="flex-col-contianr">
          <h6 className="COQ-container-title">Cost Of Good Quality</h6>
          <div>
            <CustomDropdown
              selected={(option) => handleSelectedOption(option, "good")}
              selectTitle="Type Of Good Quality"
              options={[
                { value: "Maintenance" },
                { value: "Training" },
                { value: "New Machine" },
                { value: "Training" },
              ]}
            />
          </div>
          <div className="button-continer">
            <input
              className="small-button bg-dark"
              onChange={(e) => setGoodQualityValue(e.target.value)}
              value={goodQualityValue}
            />
            <button
              className="small-button bg-green"
              onClick={() => handleAddCost("good")}
            >
              Add Cost
            </button>
          </div>
          <div>
            {goodQualityCosts.map((item, index) => (
              <p key={index}>{`${item.type}: ${item.cost}`}</p>
            ))}
          </div>
        </div>

        <div className="flex-col-contianr">
          <h6 className="COQ-container-title">Cost Of Poor Quality</h6>
          <div>
            <CustomDropdown
              selected={(option) => handleSelectedOption(option, "poor")}
              selectTitle="Type Of Poor Quality"
              options={[{ value: "Defect" }, { value: "Customer Lost" }]}
            />
          </div>
          <div className="button-continer">
            <input
              className="small-button bg-dark"
              onChange={(e) => setPoorQualityValue(e.target.value)}
              value={poorQualityValue}
            />
            <button
              className="small-button bg-red"
              onClick={() => handleAddCost("poor")}
            >
              Add Cost
            </button>
          </div>
          <div>
            {poorQualityCosts.map((item, index) => (
              <p key={index}>{`${item.type}: ${item.cost}`}</p>
            ))}
          </div>
        </div>

        <div className="flex-contianr">
          <Button
            style={buttonStyle}
            onClick={handleClick}
            aria-describedby={id}
          >
            Calculate Ratio Of COQ{" "}
          </Button>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <Typography>
              <div className="chart-container">
                <h6 className="COQ-container-title">Cost Of Quality Ratio</h6>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={donutChartData}
                      dataKey="value"
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                    >
                      {donutChartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={index === 0 ? "#82ca9d" : "#FF0000"}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Typography>
          </Popover>
        </div>
      </main>
    </>
  );
};

export default CostofQuality;
