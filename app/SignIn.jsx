import { useState } from "react";
import { useNavigate } from "react-router";
import { Lock, Mail, Eye, EyeOff } from "lucide-react";
import { useRouter } from "expo-router";
import { Lock } from "lucide-react-native";
import { GlassCard } from "../GlassCard";
import ScreenWrapper from "../components/ScreenWrapper";
import { hp, wp } from "../utilities/dimensions"; // Import from your dimensions file
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

export default function SignIn() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <ScreenWrapper bg="#F8F9FE">

      <View style={{ flex: 1, justifyContent: "center", padding: wp(5) }}>

        <Text style={{ fontSize: hp(3), textAlign: "center", fontWeight: "600" }}>
          Nova Secure AI
        </Text>

        <Text style={{ textAlign: "center", marginBottom: hp(3), color: "gray" }}>
          Sign in to your account
        </Text>

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={{
            backgroundColor: "#eee",
            padding: hp(1.5),
            borderRadius: 12,
            marginBottom: hp(1.5),
          }}
        />

        <View
          style={{
            flexDirection: "row",
            backgroundColor: "#eee",
            borderRadius: 12,
            alignItems: "center",
            paddingHorizontal: wp(3),
          }}
        >
          <TextInput
            placeholder="Password"
            value={password}
            secureTextEntry={!showPassword}
            onChangeText={setPassword}
            style={{ flex: 1, padding: hp(1.5) }}
          />

          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Text style={{ color: "blue" }}>
              {showPassword ? "Hide" : "Show"}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => router.push("/")}
          style={{
            backgroundColor: "#4F46E5",
            padding: hp(1.8),
            borderRadius: 12,
            marginTop: hp(2),
          }}
        >
          <Text style={{ color: "white", textAlign: "center" }}>
            Login
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/SignUp")}>
          <Text style={{ textAlign: "center", marginTop: hp(2), color: "#4F46E5" }}>
            Create account
          </Text>
        </TouchableOpacity>

      </View>

    </ScreenWrapper>
  );
}