import { useState, useCallback, useEffect, useRef } from "react";

import "./styles.css";

const ENDPOINT =
  "https://www.random.org/integers/?num=200&min=1950&max=2019&col=1&base=10&format=plain";

const roundToNearestTen = (num) => Math.ceil(num / 10) * 10;

const useHistogram = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const isFirstCall = useRef(true);

  const getData = useCallback(async () => {
    try {
      await fetch(ENDPOINT)
        .then((data) => data.text())
        .then((data) => data.split("\n"))
        .then((data) =>
          data.filter(Boolean).map((year) => roundToNearestTen(Number(year)))
        )
        .then((data) => {
          const xAxis = {};
          const yAxis = [];

          data.forEach((year) => {
            if (xAxis[year]) {
              xAxis[year]++;
            } else {
              xAxis[year] = 1;
            }
          });

          const maxYAxis = Math.max(
            ...Object.values(xAxis).map((value) => roundToNearestTen(value))
          );

          for (let i = maxYAxis; i >= 0; i -= 10) {
            yAxis.push(i);
          }

          setData({ xAxis, yAxis });
        });
    } catch (error) {
      console.error(error.message);
      throw error.message;
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!data && isFirstCall.current) {
      getData();
      isFirstCall.current = false;
    }
  }, [getData, data, isFirstCall]);

  return { isLoading, refetch: getData, data };
};

export default function App() {
  const { isLoading, data, refetch } = useHistogram();

  if (isLoading) return "Loading...";

  return (
    <div>
      <div className="wrapper">
        <div className="yAxis">
          {data.yAxis.map((yValue) => (
            <div key={`y-${yValue}`}>
              <label>{yValue}</label>
            </div>
          ))}
        </div>

        <div className="chart">
          <div className="graph">
            {Object.values(data.xAxis).map((year, index) => (
              <div
                key={`bucket-${year}-${index}`}
                style={{ height: `${year * 5}px` }}
                className="bucket"
              ></div>
            ))}
          </div>

          <div className="legend">
            {Object.keys(data.xAxis).map((year, index) => (
              <div key={`legend-${year}-${index}`}>
                <label>{year}</label>
              </div>
            ))}
          </div>
        </div>
      </div>

      <button className="refresh" onClick={refetch}>
        Refresh
      </button>
    </div>
  );
}
