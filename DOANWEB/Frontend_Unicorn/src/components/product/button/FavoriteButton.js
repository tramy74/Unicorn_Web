const TYPE_FAVORITE = {
  LIKE: "like",
  UNLIKE: "unlike",
};
import LoginRequiredModal from "@/components/generals/LoginRequiredModal";
import useAuth from "@/customHooks/useAuth";
import {
  addFavoriteProduct,
  removeFavoriteProduct,
} from "@/redux/actions/favoriteProducts";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { Checkbox } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";
import { useDispatch } from "react-redux";
const FavoriteButton = ({ productId, isFavorited, ...props }) => {
  const { isAuthenticated } = useAuth();
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isOpenModalLoginRequired, setIsOpenModalLoginRequired] =
    useState(false);

  useEffect(() => {
    setIsFavorite(isFavorited);
  }, [isFavorited]);

  const handleFavoriteProduct = async ({ type = TYPE_FAVORITE.LIKE }) => {
    try {
      let res;
      if (type === TYPE_FAVORITE.LIKE) {
        res = await axios.post(
          `${process.env.NEXT_PUBLIC_ENDPOINT_SERVER}/api/v1/favorite-products`,
          {
            productId,
          }
        );
      } else if (type === TYPE_FAVORITE.UNLIKE) {
        res = await axios.post(
          `${process.env.NEXT_PUBLIC_ENDPOINT_SERVER}/api/v1/favorite-products/unlike`,
          {
            productId,
          }
        );
      }
      await queryClient.invalidateQueries({
        queryKey: ["get-list-favorite-products"],
        refetchInactive: true,
      });
      if (type === TYPE_FAVORITE.LIKE) {
        dispatch(
          addFavoriteProduct({
            product: { _id: productId },
          })
        );
      } else if (type === TYPE_FAVORITE.UNLIKE) {
        dispatch(
          removeFavoriteProduct({
            product: { _id: productId },
          })
        );
      }
      toast.success(res.data.message);
    } catch (err) {
      toast.error(`${err.response?.data?.message}`);
      throw err;
    }
  };

  const { mutate: favorite, isLoading } = useMutation({
    mutationFn: ({ type }) => {
      return handleFavoriteProduct({
        type,
      });
    },

    onMutate: () => {
      const previousFavoriteStatus = isFavorite;
      setIsFavorite(!isFavorite);
      const previousData = queryClient.getQueryData([
        "get-list-favorite-products",
      ]);
      return { previousData, previousFavoriteStatus };
    },
    onError: (err, _, context) => {
      const { previousData, previousFavoriteStatus } = context;
      setIsFavorite(previousFavoriteStatus);
      queryClient.setQueryData(["get-list-favorite-products"], previousData);
    },
  });

  const handleClickFavoriteProduct = ({ type }) => {
    if (!isAuthenticated) {
      setIsOpenModalLoginRequired(true);
    } else {
      favorite({ type });
    }
  };

  return (
    <>
      <LoginRequiredModal
        isOpen={isOpenModalLoginRequired}
        setIsOpen={setIsOpenModalLoginRequired}
      />

      {isLoading && (
        <Checkbox
          checked={!!isFavorite}
          icon={<FavoriteBorder className="mx-auto p-0" />}
          checkedIcon={<Favorite sx={{ color: "red" }} />}
          {...props}
        />
      )}
      {!isLoading && (
        <Checkbox
          checked={!!isFavorite}
          icon={<FavoriteBorder className="mx-auto p-0 hover:animate-ping" />}
          checkedIcon={<Favorite sx={{ color: "red" }} />}
          onClick={() =>
            handleClickFavoriteProduct({
              type: isFavorite ? TYPE_FAVORITE.UNLIKE : TYPE_FAVORITE.LIKE,
            })
          }
          {...props}
        />
      )}
    </>
  );
};
export default FavoriteButton;
