import { useState } from "react";
import { useNavigate } from "react-router";
import { Lock, Mail, User, Eye, EyeOff, Check, X } from "lucide-react";
import { GlassCard } from "../GlassCard";
import { useRouter } from "expo-router";
import ScreenWrapper from "../components/ScreenWrapper";
import { hp, wp } from "../utilities/dimensions";
import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import ScreenWrapper from "../components/ScreenWrapper";
import { hp, wp } from "../utilities/dimensions";

export default function SignUp() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  return (
    <ScreenWrapper bg="#F8F9FE">

      <View style={{ flex: 1, justifyContent: "center", padding: wp(5) }}>

        <Text style={{ fontSize: hp(3), fontWeight: "600", textAlign: "center" }}>
          Create Account
        </Text>

        <TextInput
          placeholder="Full Name"
          value={form.name}
          onChangeText={(t) => setForm({ ...form, name: t })}
          style={{ backgroundColor: "#eee", padding: hp(1.5), marginTop: hp(2), borderRadius: 10 }}
        />

        <TextInput
          placeholder="Email"
          value={form.email}
          onChangeText={(t) => setForm({ ...form, email: t })}
          style={{ backgroundColor: "#eee", padding: hp(1.5), marginTop: hp(1.5), borderRadius: 10 }}
        />

        <TextInput
          placeholder="Password"
          secureTextEntry
          value={form.password}
          onChangeText={(t) => setForm({ ...form, password: t })}
          style={{ backgroundColor: "#eee", padding: hp(1.5), marginTop: hp(1.5), borderRadius: 10 }}
        />

        <TouchableOpacity
          onPress={() => router.push("/SignIn")}
          style={{
            backgroundColor: "#4F46E5",
            padding: hp(1.8),
            borderRadius: 10,
            marginTop: hp(3),
          }}
        >
          <Text style={{ color: "white", textAlign: "center" }}>
            Sign Up
          </Text>
        </TouchableOpacity>

      </View>

    </ScreenWrapper>
  );
}