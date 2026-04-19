import { useNavigate } from "react-router";
import { GlassCard } from "../GlassCard";
import { ArrowLeft, User, Mail, Phone, MapPin, Camera } from "lucide-react";
import { useState } from "react";
import { useRouter } from "expo-router";
import ScreenWrapper from "../components/ScreenWrapper";
import { hp, wp } from "../utilities/dimensions";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";


export default function ProfileEdit() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: "John Doe",
    email: "john@email.com",
    phone: "0712345678",
    address: "Johannesburg",
  });

  return (
    <ScreenWrapper bg="#F8F9FE">

      <View style={{ flex: 1, padding: wp(5) }}>

        <Text style={{ fontSize: hp(2.8), fontWeight: "600" }}>
          Edit Profile
        </Text>

        <TextInput
          value={formData.fullName}
          onChangeText={(t) => setFormData({ ...formData, fullName: t })}
          style={{ backgroundColor: "#eee", padding: hp(1.5), marginTop: hp(2), borderRadius: 10 }}
        />

        <TextInput
          value={formData.email}
          onChangeText={(t) => setFormData({ ...formData, email: t })}
          style={{ backgroundColor: "#eee", padding: hp(1.5), marginTop: hp(1.5), borderRadius: 10 }}
        />

        <TextInput
          value={formData.phone}
          onChangeText={(t) => setFormData({ ...formData, phone: t })}
          style={{ backgroundColor: "#eee", padding: hp(1.5), marginTop: hp(1.5), borderRadius: 10 }}
        />

        <TextInput
          value={formData.address}
          onChangeText={(t) => setFormData({ ...formData, address: t })}
          multiline
          style={{
            backgroundColor: "#eee",
            padding: hp(1.5),
            marginTop: hp(1.5),
            borderRadius: 10,
            height: hp(10),
          }}
        />

        <TouchableOpacity
          onPress={() => router.push("/Settings")}
          style={{
            backgroundColor: "#4F46E5",
            padding: hp(1.8),
            borderRadius: 10,
            marginTop: hp(3),
          }}
        >
          <Text style={{ color: "white", textAlign: "center" }}>
            Save Changes
          </Text>
        </TouchableOpacity>

      </View>

    </ScreenWrapper>
  );
}
