import { Breadcrumbs, Typography } from "@mui/material";
import Link from "next/link";

const BreadcrumbBar = ({ data = [] }) => {
  return (
    <div className="redirect">
      <Breadcrumbs aria-label="breadcrumb">
        <Link href="/" className="hover:underline">
          Trang chủ
        </Link>
        {data.map((item, i) => {
          if (i !== data.length - 1) {
            return (
              <Link key={i} className="hover:underline" href={item?.link}>
                {item.title}
              </Link>
            );
          } else {
            return (
              <Typography key={i} color="text.primary">
                {item.title}
              </Typography>
            );
          }
        })}
      </Breadcrumbs>
    </div>
  );
};
export default BreadcrumbBar;
