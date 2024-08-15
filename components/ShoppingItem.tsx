import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import CheckBox from "expo-checkbox";
import { useTheme } from "@/context/ThemeContext";

interface ShoppingItemProps {
  item: {
    name: string;
    bought: boolean;
  };
  index: number;
  toggleItem: (index: number) => void;
  deleteItem: (index: number) => void;
}

const ShoppingItem: React.FC<ShoppingItemProps> = ({
  item,
  index,
  toggleItem,
  deleteItem,
}) => {
  const { theme } = useTheme();
  const itemStyle = item.bought
    ? theme === "light"
      ? styles.boughtItemLight
      : styles.boughtItemDark
    : theme === "light"
    ? styles.itemLight
    : styles.itemDark;
  const containerStyle =
    theme === "light" ? styles.lightContainer : styles.darkContainer;

  return (
    <View style={containerStyle}>
      <CheckBox
        value={item.bought}
        onValueChange={() => toggleItem(index)}
        style={styles.checkbox}
      />
      <TouchableOpacity
        onPress={() => toggleItem(index)}
        style={styles.textContainer}
      >
        <Text style={itemStyle}>{item.name}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => deleteItem(index)}
        style={styles.deleteButton}
      >
        <Text style={styles.deleteButtonText}>Usuń</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  lightContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    backgroundColor: "#f5f5f5",
    padding: 10,
  },
  darkContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    backgroundColor: "#333",
    padding: 10,
  },
  itemLight: {
    fontSize: 18,
    color: "#000",
    flex: 1,
  },
  itemDark: {
    fontSize: 18,
    color: "#fff",
    flex: 1,
  },
  boughtItemLight: {
    fontSize: 18,
    textDecorationLine: "line-through",
    color: "gray",
  },
  boughtItemDark: {
    fontSize: 18,
    textDecorationLine: "line-through",
    color: "#aaa",
  },
  checkbox: {
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  deleteButton: {
    marginLeft: 10,
  },
  deleteButtonText: {
    color: "red",
    fontSize: 16,
  },
});

export default ShoppingItem;
