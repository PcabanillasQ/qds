import React from "react";
import { Card as CardAntd, CardProps } from "antd";

const { Meta } = CardAntd;
type Props = CardProps & { description: string };

const Card: React.FC<Props> = ({ title, description, children, ...props }) => (
  <CardAntd {...props}>
    <Meta title={title} description={description}></Meta>
    {children}
  </CardAntd>
);
export default Card;
