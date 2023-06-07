import { Row, Col } from "antd";
import { OffersCard } from "../components/OffersCard";
import { fakeCars } from "../mock";

export function Offers() {
  return (
    <div>
      <Row wrap justify={"space-evenly"}>
        {fakeCars.map((cars) => (
          <OffersCard {...cars} key={cars.id} />
        ))}
      </Row>
    </div>
  );
}
