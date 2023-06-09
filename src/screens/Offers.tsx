import { Row, Tooltip, FloatButton } from "antd";
import { OffersCard } from "../components/OffersCard";
import { fakeCars } from "../mock";
import { AppstoreOutlined, ProfileOutlined } from "@ant-design/icons";
import { useState } from "react";

export function Offers() {
  const [visualizationMode, setVisualizationMode] = useState(false);

  return (
    <>
      <Tooltip
        title={
          visualizationMode ? "Visualização em grade" : "Visualização em lista"
        }
        placement="left"
        color="blue"
      >
        <FloatButton
          onClick={() => setVisualizationMode(!visualizationMode)}
          icon={visualizationMode ? <AppstoreOutlined /> : <ProfileOutlined />}
        />
      </Tooltip>

      <Row wrap justify={"space-evenly"}>
        {visualizationMode
          ? null
          : fakeCars.map((cars) => (
              <>
                <OffersCard {...cars} key={cars.id} />
              </>
            ))}
      </Row>
    </>
  );
}
