import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Button,
} from "react-native";
import CheckBox from "expo-checkbox";
import Modal from "react-native-modal";
import { useTheme } from "@/context/ThemeContext";

interface ShoppingItemProps {
  item: {
    name: string;
    bought: boolean;
  };
  index: number;
  toggleItem: (index: number) => void;
  deleteItem: (index: number) => void;
  updateItem: (index: number, newName: string) => void;
}

const ShoppingItem: React.FC<ShoppingItemProps> = React.memo(
  ({ item, index, toggleItem, deleteItem, updateItem }) => {
    const { theme } = useTheme();
    const [isModalVisible, setModalVisible] = useState(false);
    const [newItemName, setNewItemName] = useState(item.name);

    const itemStyle = item.bought
      ? theme === "light"
        ? styles.boughtItemLight
        : styles.boughtItemDark
      : theme === "light"
      ? styles.itemLight
      : styles.itemDark;
    const containerStyle =
      theme === "light" ? styles.lightContainer : styles.darkContainer;

    const closeModal = () => {
      setNewItemName("");
      setModalVisible(false);
    };

    return (
      <View style={containerStyle}>
        <CheckBox
          value={item.bought}
          onValueChange={() => toggleItem(index)}
          style={styles.checkbox}
          accessibilityLabel={`Mark ${item.name} as ${
            item.bought ? "not bought" : "bought"
          }`}
          accessibilityRole="checkbox"
          accessibilityState={{ checked: item.bought }}
        />
        <TouchableOpacity
          onPress={() => toggleItem(index)}
          style={styles.textContainer}
          accessibilityLabel={`Toggle ${item.name}`}
        >
          <Text style={itemStyle}>{item.name}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => deleteItem(index)}
          style={styles.deleteButton}
          accessibilityLabel={`Delete ${item.name}`}
        >
          <Text style={styles.deleteButtonText}>Usuń</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.editButton}
        >
          <Text style={styles.editButtonText}>Edytuj</Text>
        </TouchableOpacity>

        <Modal
          isVisible={isModalVisible}
          onBackdropPress={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <TextInput
              value={newItemName}
              onChangeText={setNewItemName}
              style={styles.modalInput}
              placeholder="Nowa nazwa przedmiotu"
            />
            <View style={styles.buttonContainer}>
              <Button
                title="Zapisz"
                onPress={() => {
                  updateItem(index, newItemName);
                  setModalVisible(false);
                }}
              />
              <Button title="Anuluj" onPress={closeModal} />
            </View>
          </View>
        </Modal>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  lightContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    backgroundColor: "#f5f5f5",
    padding: 10,
    borderRadius: 5,
  },
  darkContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    backgroundColor: "#333",
    padding: 10,
    borderRadius: 5,
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
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalInput: {
    borderColor: "#ccc",
    borderWidth: 1,
    width: "100%",
    padding: 10,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  deleteButton: {
    backgroundColor: "#f44336",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginLeft: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  deleteButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  editButton: {
    backgroundColor: "#2196F3",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  editButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ShoppingItem;
