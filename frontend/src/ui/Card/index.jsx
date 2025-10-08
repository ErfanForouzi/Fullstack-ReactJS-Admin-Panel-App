import { Card as AntCard } from "antd";
const { Meta } = AntCard;
import placeHolderImg from "@/assets/images/fullstack-admin.jpg";
import { BASE_URL } from "@/tools/constants";
const Card = ({
  width = 300,
  src = placeHolderImg,
  alt,
  title,
  desc,
  ...props
}) => {
  console.log(src);
  return (
    <AntCard
      {...props}
      hoverable
      
      style={{ width }}
      cover={
        <img
          draggable={false}
          className="w-100 h-100 card-img"
          alt={alt}
          src={Boolean(src) ? `${BASE_URL}/${src}` : placeHolderImg}
        />
      }
    >
      <Meta title={title} description={desc} />
    </AntCard>
  );
};
export default Card;
