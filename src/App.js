import { useState, useEffect } from "react";
import { Loader } from "./components/Loader";
import HeaderComponent from "./components/HeaderComponent";
import CurrencyInput from "./components/CurrencyInput";
import { API_DOMAIN, API_KEY } from './config/api';

function App() {
  const [amountFirst, setAmountFirst] = useState(1);
  const [amountSecond, setAmountSecond] = useState(1);
  const [currencyNameFirst, setCurrencyNameFirst] = useState("USD");
  const [currencyNameSecond, setCurrencyNameSecond] = useState("UAH");
  const [rates, setRates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let myHeaders = new Headers();
    myHeaders.append("apikey", API_KEY);

    var requestOptions = {
      method: "GET",
      redirect: "follow",
      headers: myHeaders,
    };
    fetch(
      API_DOMAIN,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setRates(result.rates);
        setLoading(false);
      })
      .catch((error) => console.log("error", error));
  }, []);

  useEffect(() => {
    if (!!rates) {
      function init() {
        handleAmountFirstChange(1);
      }
      init();
    }
  }, [rates]);

  function roundUp(number) {
    return number.toFixed(2);
  }

  function handleAmountFirstChange(amountFirst) {
    setAmountSecond(
      roundUp(
        (amountFirst * rates[currencyNameSecond]) / rates[currencyNameFirst]
      )
    );
    setAmountFirst(amountFirst);
  }

  function handleCurrencyNameFirstChange(currencyNameFirst) {
    setAmountSecond(
      roundUp(
        (amountFirst * rates[currencyNameSecond]) / rates[currencyNameFirst]
      )
    );
    setCurrencyNameFirst(currencyNameFirst);
  }

  function handleAmountSecondChange(amountSecond) {
    setAmountFirst(
      roundUp(
        (amountSecond * rates[currencyNameFirst]) / rates[currencyNameSecond]
      )
    );
    setAmountSecond(amountSecond);
  }

  function handleCurrencyNameSecondChange(currencyNameSecond) {
    setAmountFirst(
      roundUp(
        (amountSecond * rates[currencyNameFirst]) / rates[currencyNameSecond]
      )
    );
    setCurrencyNameSecond(currencyNameSecond);
  }
  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <HeaderComponent currencies={rates} />
          <div className="ConvertComponent">
            <CurrencyInput
              onAmountChange={handleAmountFirstChange}
              onCurrencyChange={handleCurrencyNameFirstChange}
              currencies={Object.keys(rates)}
              amount={amountFirst}
              currency={currencyNameFirst}
            />
            <CurrencyInput
              onAmountChange={handleAmountSecondChange}
              onCurrencyChange={handleCurrencyNameSecondChange}
              currencies={Object.keys(rates)}
              amount={amountSecond}
              currency={currencyNameSecond}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
