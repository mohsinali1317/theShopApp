export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const EDIT_PRODUCT = "EDIT_PRODUCT";

export const deleteProduct = (productId) => {
  return {
    type: DELETE_PRODUCT,
    pid: productId,
  };
};

export const createProduct = (title, description, imageUrl, price) => {
  return async (dispatch) => {
    // any async code

    console.log(1);

    const response = await fetch(
      "https://rn-complete-guide-39ec3-default-rtdb.firebaseio.com/products.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
          price,
        }),
      }
    );

    const resData = await response.json();

    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id: resData.name,
        title: title,
        description: description,
        imageUrl: imageUrl,
        price: price,
      },
    });
  };
};

export const editProduct = (id, title, description, imageUrl) => {
  return {
    type: EDIT_PRODUCT,
    pid: id,
    productData: {
      title: title,
      description: description,
      imageUrl: imageUrl,
    },
  };
};
