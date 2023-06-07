import { Row } from "antd";
import { OffersCard } from "../components/OffersCard";
import { fakeCars } from "../mock";

export function Offers() {
  return (
    <>
      <Row wrap justify={"space-evenly"}>
        {fakeCars.map((cars) => (
          <>
            <OffersCard {...cars} key={cars.id} />
          </>
        ))}
      </Row>
    </>
  );
}
