import React, { useState, useEffect } from "react";
import { View, StyleSheet, StatusBar, Button, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ShoppingList from "@/components/ShoppingList";
import GroupList from "@/components/GroupList";
import { Group } from "@/types/group.type";
import { ShoppingItem } from "@/types/shoppingItem.type";
import { useTheme } from "@/context/ThemeContext";

const HomeScreenContent = () => {
  const { theme } = useTheme();
  const [groups, setGroups] = useState<Group[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);

  useEffect(() => {
    loadGroups();
  }, []);

  const loadGroups = async () => {
    try {
      const storedGroups = await AsyncStorage.getItem("groups");
      if (storedGroups) setGroups(JSON.parse(storedGroups));
    } catch (error) {
      console.error("Error loading groups:", error);
    }
  };

  const saveGroups = async (updatedGroups: Group[]) => {
    try {
      await AsyncStorage.setItem("groups", JSON.stringify(updatedGroups));
      setGroups(updatedGroups);
    } catch (error) {
      console.error("Error saving groups:", error);
    }
  };

  const addGroup = (groupName: string) => {
    if (groupName.length > 0) {
      const updatedGroups = [...groups, { name: groupName, items: [] }];
      saveGroups(updatedGroups);
    }
  };

  const updateGroupItems = (
    groupName: string,
    updatedItems: ShoppingItem[]
  ) => {
    const updatedGroups = groups.map((group) => {
      if (group.name === groupName) {
        return { ...group, items: updatedItems };
      }
      return group;
    });
    saveGroups(updatedGroups);
  };

  const deleteGroup = (groupName: string) => {
    const updatedGroups = groups.filter((group) => group.name !== groupName);
    saveGroups(updatedGroups);
    if (selectedGroup && selectedGroup.name === groupName) {
      setSelectedGroup(null);
    }
  };

  const containerStyle =
    theme === "light" ? styles.lightContainer : styles.darkContainer;

  return (
    <View style={containerStyle}>
      {selectedGroup ? (
        <>
          <ShoppingList
            group={selectedGroup}
            updateGroupItems={updateGroupItems}
            goBack={() => setSelectedGroup(null)}
          />
        </>
      ) : (
        <GroupList
          groups={groups}
          onAddGroup={addGroup}
          onSelectGroup={setSelectedGroup}
          onDeleteGroup={deleteGroup}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  lightContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
    marginTop: StatusBar.currentHeight || 0,
  },
  darkContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "#333",
    marginTop: StatusBar.currentHeight || 0,
  },
});

export default HomeScreenContent;
