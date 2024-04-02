import MonthlyRevenue from "@/components/admin/dashboard/MonthlyRevenue";
import OverviewBanner from "@/components/admin/dashboard/OverviewBanner";
import WeeklyRevenue from "@/components/admin/dashboard/WeeklyRevenue";
export const metadata = {
  title: "Tổng quan",
};

const AdminPage = () => {
  return (
    <>
      <OverviewBanner />
      <WeeklyRevenue />
      <MonthlyRevenue />
    </>
  );
};
export default AdminPage;
