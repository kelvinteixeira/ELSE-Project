import { Row, Tooltip, FloatButton } from "antd";
import { OffersCard } from "../components/OffersCard";
import { AppstoreOutlined, ProfileOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { CarProps } from "../Global/types";
import { api } from "../api";
import { OffersList } from "../components/OffersList";

export function Offers() {
  const [visualizationMode, setVisualizationMode] = useState(false);
  const [offers, setOffers] = useState<Array<CarProps>>([]);

  useEffect(() => {
    api
      .get("/offers")
      .then((response) => {
        return setOffers(response.data);
      })
      .catch((err) => {
        console.log("Erro: ", err);
      });
  }, []);

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

      <Row wrap>
        {visualizationMode
          ? <OffersList dataSource={offers}/>
          : offers.map((offer) => <OffersCard {...offer} key={offer.id} />)}
      </Row>
    </>
  );
}
