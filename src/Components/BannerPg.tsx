import React, { useEffect, useState } from "react";
import MyCard from './MyCard';
import { Col, Layout, Row } from "antd";
import { UsePhotos } from "../Hook/UsePhotos";
import GeoLocation from "../module/GeoLocation";

interface PhotoItem {
  id: number;
  title: string;
  image: string;
}

const SwiperComponent: React.FC<{ items: PhotoItem[] }> = ({ items }) => (
  <Layout>
    <Row>
      <GeoLocation/>
    </Row>
    <Row gutter={[16, 16]}>
      {items.map((img) => (
        <Col xs={24} sm={12} md={8} lg={6} xl={4} key={img.id}>
          <MyCard
            btn1="Add"
            btn2="View"
            desc=""
            head={img.title}
            img={img.image}
          />
        </Col>
      ))}
    </Row>
    <h3>Repeat Banner</h3>
    <Row gutter={[16, 16]}>
      {items.map((img) => (
        <Col xs={24} sm={12} md={8} lg={6} xl={4} key={img.id}>
          <MyCard
            btn1="Add"
            btn2="View"
            desc=""
            head={img.title}
            img={img.image}
          />
        </Col>
      ))}
    </Row>
  </Layout>
);

const BannerPg: React.FC = () => {
  const [list, setList] = useState<PhotoItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await UsePhotos();
        setList(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>

    </div>
  );
};

export default BannerPg;
