import React from "react";
import { FlatList, Text, View } from "react-native";
import { useSelector } from "react-redux";

const ProductOverviewScreen = (props) => {
  const products = useSelector((state) => state.products.availableProducts);
  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => {
        console.log(itemData.item.title);
        return (
          <View>
            <Text>{itemData.item.title}</Text>
          </View>
        );
      }}
    />
  );
};

ProductOverviewScreen.navigationOptions = {
  headerTitle: "All Products",
};

export default ProductOverviewScreen;
