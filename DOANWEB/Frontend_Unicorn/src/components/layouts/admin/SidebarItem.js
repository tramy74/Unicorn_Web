"use client";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Collapse, Stack } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function SidebarItem({ item, openItems, toggleItem, index }) {
  const pathName = usePathname();
  const router = useRouter();

  const handleClickSidebarItem = () => {
    const hasChild = item.listItem;
    if (hasChild) {
      toggleItem(index);
    } else {
      router.push(item.path);
    }
  };

  return (
    <>
      <div>
        <ToggleButton
          value="center"
          fullWidth={true}
          aria-label="list"
          className={`admin-layout-nav-button !justify-between ${
            pathName.includes(item.path) ?? "active"
          }`}
          onClick={handleClickSidebarItem}
          sx={{
            width: "100%",
            border: "none",

            justifyContent: "flex-start",
            padding: "1rem",
            paddingLeft: "5rem",
            backgroundColor: pathName.includes(item.path) ? "#38AC8F" : "",
            color: pathName.includes(item.path) ? "#fff" : "",

            "&:hover": {
              backgroundColor: pathName.includes(item.path)
                ? "#38AC8F"
                : "rgba(0, 0, 0, 0.04)",
              color: pathName.includes(item.path) ? "#fff" : "inherit",
              opacity: "0.9",
            },
          }}
        >
          <Stack
            direction="row"
            spacing={1}
            sx={{
              textAlign: "start",
              fontSize: "1.5rem",
              alignItems: "center",
            }}
          >
            {item.icon}
            <span className="font-medium capitalize">{item.titile}</span>
          </Stack>
          {item.listItem &&
            (openItems[index] ? <ExpandLess /> : <ExpandMore />)}
        </ToggleButton>
        {item.listItem && (
          <Collapse in={openItems[index]} timeout="auto" unmountOnExit>
            <ToggleButtonGroup
              fullWidth={true}
              sx={{ width: "100%", textAlign: "start" }}
              orientation="vertical"
              exclusive
            >
              {item.listItem.map((childItem, childIndex) => (
                <Link
                  key={childIndex}
                  href={childItem.path}
                  sx={{ width: "100%" }}
                >
                  <ToggleButton
                    value="center"
                    fullWidth={true}
                    aria-label="list"
                    className="admin-layout-nav-button-child"
                    sx={{
                      width: "100%",
                      border: "none",
                      justifyContent: "flex-start",
                      paddingLeft: "6rem",
                      color: childItem.path === pathName ? "#38AC8F" : "",
                    }}
                  >
                    <span style={{ textTransform: "none" }}>
                      {childItem.titile}
                    </span>
                  </ToggleButton>
                </Link>
              ))}
            </ToggleButtonGroup>
          </Collapse>
        )}
      </div>
    </>
  );
}
