import React from "react";
interface Props {
  search: string;
  setSearch: (v: string) => void;
  filterMark: string;
  setFilterMark: (v: string) => void;
  filterYear: string;
  setFilterYear: (v: string) => void;
  filterPriceMin: number | "";
  setFilterPriceMin: (v: number | "") => void;
  filterPriceMax: number | "";
  setFilterPriceMax: (v: number | "") => void;
  uniqueMarks: string[];
  yearsRange: number[];
};
export default function Filters(props: Props) {
  return (
    <div className="filters">
      <input
        placeholder="Поиск по марке/модели"
        value={props.search}
        onChange={(e) => props.setSearch(e.target.value)}
      />
      <select
        value={props.filterMark}
        onChange={(e) => props.setFilterMark(e.target.value)}
      >
        <option value="">Все марки</option>
        {props.uniqueMarks.map((mark, i) => (
          <option key={i} value={mark}>{mark}</option>
        ))}
      </select>
      <select
        value={props.filterYear}
        onChange={(e) => props.setFilterYear(e.target.value)}
      >
        <option value="">Все годы</option>
        {props.yearsRange.map((y, i) => (
          <option key={i} value={y}>{y}</option>
        ))}
      </select>
      <input
        type="number"
        placeholder="Мин цена $"
        value={props.filterPriceMin}
        onChange={(e) => props.setFilterPriceMin(Number(e.target.value) || "")}
      />
      <input
        type="number"
        placeholder="Макс цена $"
        value={props.filterPriceMax}
        onChange={(e) => props.setFilterPriceMax(Number(e.target.value) || "")}
      />
    </div>
  );
}