import React, { useState } from "react";
import { Grommet, Select } from "grommet";
import axios from "axios";

const GooglePhone = () => {
  const [googlePrice, setgooglePrice] = useState(0);
  const [originalgooglePrice, setOriginalgooglePrice] = useState(0);
  const [phoneCost, setPhoneCost] = useState(0);
  const [yearBought, setYearBought] = useState(0);
  const [shares, setShares] = useState(0);
  const [currentValue, setCurrentValue] = useState(0);
  const [gainLoss, setGainLoss] = useState(0);

  let stockPrice;
  const getStockPrice = (stockRecords) => {
    for (let stockYear of stockRecords) {
      if (stockYear.date.includes(yearBought.toString())) {
        stockPrice = stockYear["Stock Price"];
        break
      }
    }
    return stockPrice;
  }

  const handlePhoneChange = (event) => {
    setPhoneCost(event.target.value);
  };

  const handleYearChange = (event) => {
    setYearBought(event.target.value);
  };

  const handleSubmit = (event) => {
    let sharesBought = (phoneCost / originalgooglePrice).toFixed(2);
    let currentWorth = (sharesBought * googlePrice).toFixed(2);
    let currentGain = (currentWorth - phoneCost).toFixed(2);

    setCurrentValue(currentWorth);
    setShares(sharesBought);
    setGainLoss(currentGain);
    event.preventDefault();
  };

  axios
    .get("https://financialmodelingprep.com/api/v3/company/profile/GOOGL")
    .then(response => {
      setgooglePrice(response.data.profile.price);
    })
    .catch(error => {
      console.log(error);
    });

  axios
    .get("https://financialmodelingprep.com/api/v3/enterprise-value/GOOGL")
    .then(response => {
      setOriginalgooglePrice(getStockPrice(response.data.enterpriseValues));
    })
    .catch(error => {
      console.log(error);
    });

  return (
    <>
      <Grommet>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <form onSubmit={handleSubmit}>
            <Select
              options={[
                2019,
                2018,
                2017,
                2016,
                2015,
                2014,
                2013,
                2012,
                2011,
                2010,
                2009
              ]}
              onChange={year => handleYearChange(year)}
            />
            <input
              type="number"
              placeholder="cost"
              value={phoneCost}
              onChange={handlePhoneChange}
            />
            <input type="submit" value="Submit" />
          </form>
          <div>Current Price: {googlePrice}</div>
          <div>Original Price: {originalgooglePrice}</div>
          <div>Could have bought: {shares} Shares</div>
          <div>Now worth: {currentValue} </div>
          <div>Net Potential Gain(Loss): {gainLoss} </div>
        </div>
      </Grommet>
    </>
  );
};

export default GooglePhone;