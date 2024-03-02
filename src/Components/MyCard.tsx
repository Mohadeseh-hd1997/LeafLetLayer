import React from "react";
import { FileAddFilled, EyeFilled } from "@ant-design/icons";
import { Avatar, Card } from "antd";
import Meta from "antd/es/card/Meta";

interface CardItem {
  head: string;
  desc: string;
  btn1: string;
  btn2: string;
  img: string;
}

const MyCard: React.FC<CardItem> = (props) => {
  const handler = () => {
    console.log("1402/11/11", "11:58");
  };

  return (
    <Card
      style={{ width: 300, height: 350, maxHeight: 350, padding: 15 ,margin:6}}
      cover={<img alt={props.desc} src={props.img} height={"200"} />}
      actions={[
        <EyeFilled key="view" onClick={() => handler()}>
          {props.btn2}
        </EyeFilled>,
        <FileAddFilled key="ellipsis">{props.btn1}</FileAddFilled>,
      ]}
    >
      <Meta
        avatar={
          <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />
        }
        title={props.head.substr(1, 20)}
        description={props.desc}
      />
    </Card>
  );
};
export default MyCard;
