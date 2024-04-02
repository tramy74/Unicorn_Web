import { ADD_VIEWED_PRODUCT } from "../actions/constants";
const KEY_LOCAL_STORAGE = "LIST_PRODUCTS_VIEWED";

let initialState;
if (typeof window !== "undefined") {
  if (!localStorage.getItem(KEY_LOCAL_STORAGE)) {
    localStorage.setItem(KEY_LOCAL_STORAGE, JSON.stringify([]));
  }
  initialState = JSON.parse(localStorage.getItem(KEY_LOCAL_STORAGE)) || [];
} else {
  initialState = [];
}

const checkViewedProductExist = (listViewed, dataProduct) => {
  let checkIsValid = true;
  let currentPosition = -1;
  let countPosition = 0;
  for (const itemListViewed of listViewed) {
    // check list viewed has current product?
    if (itemListViewed._id === dataProduct._id) {
      checkIsValid = false;
      currentPosition = countPosition;
      break;
    }
    // check current product in relation list yet?
    const check = itemListViewed.relation_products.find(
      (relationProduct) => relationProduct._id === dataProduct._id
    );
    if (check) {
      checkIsValid = false;
      currentPosition = countPosition;
      break;
    }
    countPosition++;
  }
  console.log({ checkIsValid, currentPosition });
  return { checkIsValid, currentPosition };
};
const viewedProductsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_VIEWED_PRODUCT:
      const { checkIsValid, currentPosition } = checkViewedProductExist(
        state,
        action.payload
      );
      if (!checkIsValid) {
        // if  exist -> remove and push current item to top list

        const newListViewed = [...state];
        newListViewed.splice(currentPosition, 1);
        newListViewed.unshift(action.payload);
        localStorage.setItem(KEY_LOCAL_STORAGE, JSON.stringify(newListViewed));
        return newListViewed;
      } else {
        // if not exist -> push current item to top list
        const newListViewed = [...state];
        newListViewed.unshift(action.payload);
        localStorage.setItem(KEY_LOCAL_STORAGE, JSON.stringify(newListViewed));
        return newListViewed;
      }

    default:
      return state;
  }
};
export default viewedProductsReducer;
