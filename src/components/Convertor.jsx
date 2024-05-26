import { useEffect, useState } from "react";
import axios from "axios";

const Convertor = () => {
  const [initialState, setState] = useState({
    currencies: [
      "USD",
      "AED",
      "AFN",
      "ALL",
      "AMD",
      "ANG",
      "AOA",
      "ARS",
      "AUD",
      "AWG",
      "AZN",
      "BAM",
      "BBD",
      "BDT",
      "BGN",
      "BHD",
      "BIF",
      "BMD",
      "BND",
      "BOB",
      "BRL",
      "BSD",
      "BTN",
      "BWP",
      "BYN",
      "BZD",
      "CAD",
      "CDF",
      "CHF",
      "CLP",
      "CNY",
      "COP",
      "CRC",
      "CUP",
      "CVE",
      "CZK",
      "DJF",
      "DKK",
      "DOP",
      "DZD",
      "EGP",
      "ERN",
      "ETB",
      "EUR",
      "FJD",
      "FKP",
      "FOK",
      "GBP",
      "GEL",
      "GGP",
      "GHS",
      "GIP",
      "GMD",
      "GNF",
      "GTQ",
      "GYD",
      "HKD",
      "HNL",
      "HRK",
      "HTG",
      "HUF",
      "IDR",
      "ILS",
      "IMP",
      "INR",
      "IQD",
      "IRR",
      "ISK",
      "JEP",
      "JMD",
      "JOD",
      "JPY",
      "KES",
      "KGS",
      "KHR",
      "KID",
      "KMF",
      "KRW",
      "KWD",
      "KYD",
      "KZT",
      "LAK",
      "LBP",
      "LKR",
      "LRD",
      "LSL",
      "LYD",
      "MAD",
      "MDL",
      "MGA",
      "MKD",
      "MMK",
      "MNT",
      "MOP",
      "MRU",
      "MUR",
      "MVR",
      "MWK",
      "MXN",
      "MYR",
      "MZN",
      "NAD",
      "NGN",
      "NIO",
      "NOK",
      "NPR",
      "NZD",
      "OMR",
      "PAB",
      "PEN",
      "PGK",
      "PHP",
      "PKR",
      "PLN",
      "PYG",
      "QAR",
      "RON",
      "RSD",
      "RUB",
      "RWF",
      "SAR",
      "SBD",
      "SCR",
      "SDG",
      "SEK",
      "SGD",
      "SHP",
      "SLE",
      "SLL",
      "SOS",
      "SRD",
      "SSP",
      "STN",
      "SYP",
      "SZL",
      "THB",
      "TJS",
      "TMT",
      "TND",
      "TOP",
      "TRY",
      "TTD",
      "TVD",
      "TWD",
      "TZS",
      "UAH",
      "UGX",
      "UYU",
      "UZS",
      "VES",
      "VND",
      "VUV",
      "WST",
      "XAF",
      "XCD",
      "XDR",
      "XOF",
      "XPF",
      "YER",
      "ZAR",
      "ZMW",
      "ZWL",
    ],
    base: "USD",
    amount: "1",
    convertTo: "INR",
    result: "",
    date: "",
  });

  const { currencies, base, amount, convertTo, result, date } = initialState;

  useEffect(() => {
    if (amount === isNaN) {
      return;
    } else {
      const getCurrencyconvertTor = async () => {
        const response = await axios.get(
          `https://v6.exchangerate-api.com/v6/897faa30dff6563b04535dd7/latest/${base}`
        );
        console.log("response==>", response);
        const date = response.data.date;
        const result = (
          response.data.conversion_rates[convertTo] * amount
        ).toFixed(3);
        setState({
          ...initialState,
          result,
          date,
        });
      };
      getCurrencyconvertTor();
    }
  }, [amount, base, convertTo]);

  const onChangeInput = (e) => {
    setState({
      ...initialState,
      amount: e.target.value,
      result: null,
      date: null,
    });
  };

  const handleSelect = (e) => {
    setState({
      ...initialState,
      [e.target.name]: e.target.value,
      result: null,
    });
  };

  const handleSwap = (e) => {
    e.preventDefault();
    setState({
      ...initialState,
      convertTo: base,
      base: convertTo,
      result: null,
    });
  };

  return (
    <div className="border w-fit p-10 grid gap-5 bg-slate-100 shadow">
      <h2 className="text-3xl">Currency Convertor</h2>
      <h3 className="font-semibold">
        {amount} {base}{" "}
        <span className="text-sm font-light">is equivalent to </span>
        {amount === "" ? "0" : result === null ? "calculating..." : result}
        <span className="px-1">{convertTo}</span>
      </h3>
      <p>{amount === "" ? "" : date === null ? "" : date}</p>
      <form>
        <input value={amount} className="p-2 border" onChange={onChangeInput} />
        <select
          name="base"
          value={base}
          onChange={handleSelect}
          className="text-center p-2 border"
        >
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </form>
      <h1 className="cursor-pointer" onClick={handleSwap}>
        <span>&#8593;</span>
        <span>&#8595;</span>
      </h1>
      <form>
        <input
          className="p-2 border"
          disabled={true}
          value={
            amount === "" ? "0" : result === null ? "Calculating..." : result
          }
        />
        <select
          name="convertTo"
          value={convertTo}
          onChange={handleSelect}
          className="text-center p-2 border"
        >
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </form>
    </div>
  );
};

export default Convertor;
