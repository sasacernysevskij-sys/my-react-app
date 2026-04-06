import Pagination from "@mui/material/Pagination";
type Car = {
  id: number;
  markName: string;
  modelName: string;
  year: number;
  priceUSD: number;
  mileage: number;
  photoUrl: string;
};
interface Props {
  cars: Car[];
  page: number;
  setPage: (v: number) => void;
};
export default function CarsList({ cars, page, setPage }: Props) {
  const itemsPerPage = 6;
  const pageCount = Math.ceil(cars.length / itemsPerPage);
  const displayedCars = cars.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );
  if (displayedCars.length === 0) {
    return <h2>Нет машин</h2>;
  }
  return (
    <>
      <div className="cards">
        {displayedCars.map((car, index) => (
          <div key={car.id || index} className="card">
            <div
              className="card-image"
              style={{ backgroundImage: `url(${car.photoUrl})` }}
            />
            <div className="card-content">
              <div className="top-row">
                <span className="title">
                  {car.markName} {car.modelName}
                </span>
                <span className="year">{car.year}</span>
              </div>
              <div className="price-row">
                <span className="usd">${car.priceUSD}</span>
                <span className="uah">
                  {(car.priceUSD * 40).toLocaleString()} ₴
                </span>
              </div>
              <div className="mileage">
                {car.mileage} тыс. км
              </div>
            </div>
          </div>
        ))}
      </div>
      <Pagination
        count={pageCount}
        page={page}
        onChange={(e, val) => setPage(val)}
        className="pagination"
      />
    </>
  );
}