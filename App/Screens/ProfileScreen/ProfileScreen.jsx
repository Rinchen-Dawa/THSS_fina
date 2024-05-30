import React from "react";
import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useUser, useClerk } from "@clerk/clerk-expo";
import { useNavigation } from "@react-navigation/native";
import Colors from "./../../Utils/Colors";
import { Linking } from "react-native";

export default function ProfileScreen() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const navigation = useNavigation();

  const profileMenu = [
    {
      id: 1,
      name: "Home",
      icon: "home",
      screen: "home",
    },
    {
      id: 2,
      name: "My Booking",
      icon: "bookmark-sharp",
      screen: "booking",
    },
    {
      id: 3,
      name: "Contact Us",
      icon: "mail",
    },
    {
      id: 4,
      name: "Logout",
      icon: "log-out",
    },
  ];

  const handleMenuPress = (item) => {
    if (item.id === 4) {
      signOut();
    } else if (item.id === 3) {
      onMessageBtnClick();
    } else if (item.screen) {
      navigation.navigate(item.screen);
    }
  };

  const onMessageBtnClick = () => {
    Linking.openURL(
      "mailto:sonamd5dorji@gmail.com?subject=I am looking for your Service&body=Hi There,"
    );
  };

  return (
    <View>
      <View
        style={{ padding: 20, paddingTop: 30, backgroundColor: Colors.PRIMARY }}
      >
        <Text
          style={{
            fontSize: 30,
            fontFamily: "outfit-bold",
            color: Colors.WHITE,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          Profile
        </Text>
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
          }}
        >
          <Image
            source={{ uri: user.imageUrl }}
            style={{ width: 90, height: 90, borderRadius: 99 }}
          />
          <Text
            style={{
              fontSize: 26,
              marginTop: 8,
              fontFamily: "outfit-medium",
              color: Colors.WHITE,
            }}
          >
            {user.fullName}
          </Text>
          <Text
            style={{
              fontSize: 18,
              marginTop: 8,
              fontFamily: "outfit-medium",
              color: Colors.WHITE,
            }}
          >
            {user?.primaryEmailAddress.emailAddress}
          </Text>
        </View>
      </View>

      <View style={{ paddingTop: 60, marginLeft: "auto", marginRight: "auto" }}>
        <FlatList
          data={profileMenu}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                marginBottom: 40,
                paddingHorizontal: 80,
              }}
              onPress={() => handleMenuPress(item)}
            >
              <Ionicons name={item.icon} size={35} color={Colors.PRIMARY} />
              <Text style={{ fontFamily: "outfit", fontSize: 20 }}>
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}
