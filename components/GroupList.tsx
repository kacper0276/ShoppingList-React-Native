import React from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useTheme } from "@/context/ThemeContext";

interface GroupListProps {
  groups: { name: string; items: { name: string; bought: boolean }[] }[];
  onAddGroup: (groupName: string) => void;
  onSelectGroup: (group: {
    name: string;
    items: { name: string; bought: boolean }[];
  }) => void;
  onDeleteGroup: (groupName: string) => void;
}

const GroupList: React.FC<GroupListProps> = ({
  groups,
  onAddGroup,
  onSelectGroup,
  onDeleteGroup,
}) => {
  const { theme } = useTheme();
  const [groupName, setGroupName] = React.useState<string>("");

  const addGroup = () => {
    onAddGroup(groupName);
    setGroupName("");
  };

  const containerStyle =
    theme === "light" ? styles.lightContainer : styles.darkContainer;
  const groupNameStyle =
    theme === "light" ? styles.lightGroupName : styles.darkGroupName;
  const titleStyle = theme === "light" ? styles.lightTitle : styles.darkTitle;
  const inputStyle = theme === "light" ? styles.lightInput : styles.darkInput;

  return (
    <View style={containerStyle}>
      <Text style={titleStyle}>Grupy List Zakupów</Text>
      <FlatList
        data={groups}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.groupItem}>
            <TouchableOpacity onPress={() => onSelectGroup(item)}>
              <Text style={groupNameStyle}>{item.name}</Text>
            </TouchableOpacity>
            <Button title="Usuń" onPress={() => onDeleteGroup(item.name)} />
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
    </View>
  );
};

const styles = StyleSheet.create({
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
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  groupItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    gap: 15,
  },
  lightContainer: { backgroundColor: "#f5f5f5", flex: 1, padding: 20 },
  darkContainer: { backgroundColor: "#333", flex: 1, padding: 20 },
  lightGroupName: { color: "#000" },
  darkGroupName: { color: "#fff" },
});

export default GroupList;
