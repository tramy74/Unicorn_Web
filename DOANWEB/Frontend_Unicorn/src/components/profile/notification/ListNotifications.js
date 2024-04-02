"use client";
import LoadMoreButton from "@/components/button/LoadMoreButton";
import { LoadingContent } from "@/components/generals/LoadingBox";
import useAuth from "@/customHooks/useAuth";
import useGetListUserNotifications from "@/customHooks/useGetListUserNotifications";
import { updateUnReadNotifications } from "@/redux/actions/notifications";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import NotificationItem from "./NotificationItem";
export default function ListNotifications() {
  const dispatch = useDispatch();
  const { session } = useAuth();
  const {
    data,
    isLoading: isLoadingQuery,
    isFetching,
    isError: isErrorQuery,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetListUserNotifications();

  useEffect(() => {
    if (session) {
      dispatch(updateUnReadNotifications());
    }
  }, [session]);

  return (
    <>
      {isLoadingQuery && !isFetchingNextPage && <LoadingContent />}

      {data?.map((item, i) => (
        <NotificationItem key={i} item={item} />
      ))}

      {hasNextPage && (
        <LoadMoreButton
          isLoading={isFetchingNextPage}
          onClick={fetchNextPage}
        />
      )}
    </>
  );
}
