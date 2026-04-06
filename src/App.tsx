import { useState, useMemo } from "react";
import carsDataRaw from "./cars.json";
import "./App.css";
import Filters from "./Filters";
import CarsList from "./CarsList";
type Car = {
  id: number;
  markName: string;
  modelName: string;
  year: number;
  priceUSD: number;
  mileage: number;
  photoUrl: string;
};
const carsData: Car[] = carsDataRaw as Car[];
export default function App() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [filterMark, setFilterMark] = useState("");
  const [filterYear, setFilterYear] = useState("");
  const [filterPriceMin, setFilterPriceMin] = useState<number | "">("");
  const [filterPriceMax, setFilterPriceMax] = useState<number | "">("");
  const uniqueMarks = Array.from(new Set(carsData.map(c => c.markName))).sort();
  const yearsRange = Array.from(
    { length: 2026 - 1970 + 1 },
    (_, i) => 1970 + i
  ).reverse();
  const filteredCars = useMemo(() => {
    return carsData.filter(car => {
      if (
        search &&
        !`${car.markName} ${car.modelName}`
          .toLowerCase()
          .includes(search.toLowerCase())
      ) return false;
      if (filterMark && car.markName !== filterMark) {return false};
      if (filterYear && car.year !== Number(filterYear)) {return false};
      if (filterPriceMin !== "" && car.priceUSD < filterPriceMin) {return false};
      if (filterPriceMax !== "" && car.priceUSD > filterPriceMax) {return false};
      return true;
    });
  }, [search, filterMark, filterYear, filterPriceMin, filterPriceMax]);
  return (
    <div className="container">
      <Filters
        search={search}
        setSearch={setSearch}
        filterMark={filterMark}
        setFilterMark={setFilterMark}
        filterYear={filterYear}
        setFilterYear={setFilterYear}
        filterPriceMin={filterPriceMin}
        setFilterPriceMin={setFilterPriceMin}
        filterPriceMax={filterPriceMax}
        setFilterPriceMax={setFilterPriceMax}
        uniqueMarks={uniqueMarks}
        yearsRange={yearsRange}
      />
      <CarsList
        cars={filteredCars}
        page={page}
        setPage={setPage}
      />
    </div>
  );
}