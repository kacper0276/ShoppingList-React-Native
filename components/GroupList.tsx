import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Modal from "react-native-modal";
import { Group } from "@/types/group.type";
import { useTheme } from "@/context/ThemeContext";

interface GroupListProps {
  groups: Group[];
  updateGroupName: (oldName: string, newName: string) => void;
  deleteGroup: (name: string) => void;
  onSelectGroup: (group: Group) => void;
  onAddGroup: (groupName: string) => void;
}

const GroupList: React.FC<GroupListProps> = ({
  groups,
  updateGroupName,
  deleteGroup,
  onSelectGroup,
  onAddGroup,
}) => {
  const { theme } = useTheme();
  const [isModalVisible, setModalVisible] = useState(false);
  const [newGroupName, setNewGroupName] = useState<string>("");
  const [currentGroupName, setCurrentGroupName] = useState<string>("");
  const [groupName, setGroupName] = React.useState<string>("");

  const addGroup = () => {
    onAddGroup(groupName);
    setGroupName("");
  };

  const openEditModal = (groupName: string) => {
    setCurrentGroupName(groupName);
    setNewGroupName(groupName);
    setModalVisible(true);
  };

  const closeModal = () => {
    setNewGroupName("");
    setModalVisible(false);
  };

  const containerStyle =
    theme === "light" ? styles.lightContainer : styles.darkContainer;
  const groupNameStyle =
    theme === "light" ? styles.lightGroupName : styles.darkGroupName;
  const titleStyle = theme === "light" ? styles.lightTitle : styles.darkTitle;
  const inputStyle = theme === "light" ? styles.lightInput : styles.darkInput;

  return (
    <View style={containerStyle}>
      <Text style={titleStyle}>Listy zakupów</Text>
      <FlatList
        data={groups}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <View style={styles.groupContainer}>
            <TouchableOpacity
              onPress={() => onSelectGroup(item)}
              style={styles.groupNameButton}
            >
              <Text style={groupNameStyle}>{item.name}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => openEditModal(item.name)}
              style={styles.editButton}
            >
              <Text style={styles.editButtonText}>Edytuj</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => deleteGroup(item.name)}
              style={styles.deleteButton}
            >
              <Text style={styles.deleteButtonText}>Usuń</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Nowa grupa"
          value={groupName}
          onChangeText={setGroupName}
          style={inputStyle}
        />
        <Button title="Dodaj grupę" onPress={addGroup} />
      </View>
      <Modal isVisible={isModalVisible} onBackdropPress={closeModal}>
        <View style={styles.modalContent}>
          <TextInput
            value={newGroupName}
            onChangeText={setNewGroupName}
            style={styles.modalInput}
            placeholder="Nowa nazwa grupy"
          />
          <View style={styles.buttonContainer}>
            <Button
              title="Zapisz"
              onPress={() => {
                updateGroupName(currentGroupName, newGroupName);
                closeModal();
              }}
            />
            <Button title="Anuluj" onPress={closeModal} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  groupContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  groupNameButton: {
    width: "30%",
    justifyContent: "center",
  },
  groupName: {
    fontSize: 18,
    flex: 1,
  },
  groupNameDark: {
    fontSize: 18,
    color: "#fff",
    flex: 1,
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
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  lightContainer: { backgroundColor: "#f5f5f5", flex: 1, padding: 20 },
  darkContainer: { backgroundColor: "#333", flex: 1, padding: 20 },
  lightGroupName: { color: "#000" },
  darkGroupName: { color: "#fff" },
  lightTitle: { fontSize: 24, marginBottom: 10, color: "#000" },
  darkTitle: { fontSize: 24, marginBottom: 10, color: "#fff" },
  lightInput: {
    borderColor: "#000",
    color: "#000",
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    flex: 1,
  },
  darkInput: {
    borderColor: "#fff",
    color: "#fff",
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    flex: 1,
  },
});

export default GroupList;
