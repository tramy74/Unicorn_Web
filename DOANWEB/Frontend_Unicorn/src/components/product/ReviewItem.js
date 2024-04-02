"use client";
import { convertDateTime } from "@/utils/convertDate";
import { Skeleton, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Rating from "@mui/material/Rating";
import Image from "next/image";

const ReviewItem = ({ review }) => {
  return (
    <>
      <div className="review-item">
        <div
          className="info-reviewer"
          style={{
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <Avatar alt={review?.user?.name} src={"/avatar.png"} />
          <div
            className="name-rate"
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div className="name">{review?.user?.name}</div>
            <Rating
              name="read-only"
              value={review.review_star}
              readOnly
              size="medium"
              className="img-star"
              sx={{
                fontSize: "1.5rem",
              }}
            />
            <Typography
              sx={{
                fontSize: "1rem",
              }}
            >
              {convertDateTime(review.createdAt)}
            </Typography>
          </div>
        </div>
        <div
          className="detail"
          style={{
            gap: "0.5rem",
          }}
        >
          <div
            className="col"
            style={{
              gap: "0.5rem",
            }}
          >
            <div className="element">Màu sắc: </div>
            <div className="detail">
              {review?.product_id?.product_color.product_color_name}
            </div>
          </div>

          <div
            className="col"
            style={{
              gap: "0.5rem",
            }}
          >
            <div className="element">Kích cỡ: </div>
            <div className="detail">
              {review?.product_size?.product_size_name}
            </div>
          </div>
          <div className="comment">{review.review_comment}</div>

          <div
            className="respone-image"
            style={{
              gap: "1rem",
              flexWrap: "wrap",
            }}
          >
            {review?.review_images.map((img, i) => (
              <Image
                key={i}
                className="respone-image"
                width={72}
                height={72}
                src={img}
                style={{
                  objectFit: "contain",
                }}
                alt="Picture of the author"
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default ReviewItem;

export const ReviewItemLoading = ({}) => {
  return (
    <>
      <div className="review-item">
        <div
          className="info-reviewer"
          style={{
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <Skeleton variant="circular" width={40} height={40} />
          <div
            className="name-rate"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
            }}
          >
            <Skeleton variant="rectangular" width={80} height={12} />
            <Skeleton variant="rectangular" width={100} height={12} />
            <Skeleton variant="rectangular" width={100} height={12} />
          </div>
        </div>
        <div
          className="detail"
          style={{
            gap: "0.5rem",
          }}
        >
          <Skeleton variant="text" sx={{ fontSize: "1rem" }} />

          <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
          <Skeleton variant="text" sx={{ fontSize: "1rem" }} />

          <div
            className="respone-image"
            style={{
              gap: "1rem",
              flexWrap: "wrap",
            }}
          ></div>
        </div>
      </div>
    </>
  );
};
