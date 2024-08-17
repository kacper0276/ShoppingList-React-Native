import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
} from "react-native";
import ShoppingItem from "./ShoppingItem";
import { ShoppingItem as ShoppingItemProps } from "@/types/shoppingItem.type";
import { Group } from "@/types/group.type";
import { useTheme } from "@/context/ThemeContext";

interface ShoppingListProps {
  group: Group;
  updateGroupItems: (
    groupName: string,
    updatedItems: ShoppingItemProps[]
  ) => void;
  goBack: () => void;
}

const ShoppingList: React.FC<ShoppingListProps> = ({
  group,
  updateGroupItems,
  goBack,
}) => {
  const { theme } = useTheme();
  const [newItem, setNewItem] = useState<string>("");
  const [items, setItems] = useState<ShoppingItemProps[]>(group.items);

  const addItem = () => {
    if (newItem.length > 0) {
      const updatedItems = [...items, { name: newItem, bought: false }];
      setItems(updatedItems);
      updateGroupItems(group.name, updatedItems);
      setNewItem("");
    }
  };

  const toggleItem = (index: number) => {
    const updatedItems = [...items];
    updatedItems[index].bought = !updatedItems[index].bought;
    setItems(updatedItems);
    updateGroupItems(group.name, updatedItems);
  };

  const deleteItem = (index: number) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
    updateGroupItems(group.name, updatedItems);
  };

  const updateItem = (index: number, newName: string) => {
    const updatedItems = [...items];
    updatedItems[index].name = newName;
    setItems(updatedItems);
    updateGroupItems(group.name, updatedItems);
  };

  const inputStyle = theme === "light" ? styles.inputLight : styles.inputDark;
  const buttonStyle =
    theme === "light" ? styles.buttonLight : styles.buttonDark;

  return (
    <View style={styles.container}>
      <Text style={theme === "light" ? styles.title : styles.title_dark}>
        Produkty w liście zakupów o nazwie {group.name}
      </Text>
      <FlatList
        data={items}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.itemContainer}>
            <ShoppingItem
              item={item}
              index={index}
              toggleItem={toggleItem}
              deleteItem={deleteItem}
              updateItem={updateItem}
            />
          </View>
        )}
      />
      <TextInput
        placeholder="Nowy produkt"
        value={newItem}
        onChangeText={setNewItem}
        style={inputStyle}
      />
      <View style={styles.buttonContainer}>
        <Button
          title="Dodaj produkt"
          onPress={addItem}
          color={buttonStyle.backgroundColor}
        />
        <View style={styles.buttonSpacer} />
        <Button
          title="Wróć"
          onPress={goBack}
          color={buttonStyle.backgroundColor}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  title_dark: {
    fontSize: 24,
    marginBottom: 10,
    color: "#fff",
  },
  inputLight: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    color: "#000",
  },
  inputDark: {
    borderWidth: 1,
    borderColor: "#666",
    padding: 10,
    marginBottom: 10,
    color: "#fff",
    backgroundColor: "#333",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  buttonLight: {
    backgroundColor: "#007bff",
  },
  buttonDark: {
    backgroundColor: "#0056b3",
  },
  buttonSpacer: {
    width: 10,
  },
});

export default ShoppingList;
