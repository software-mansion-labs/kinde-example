import {useKindeAuth} from "@kinde/expo";
import {Pressable, Text, View} from "react-native";
import {useEffect, useState} from "react";

export default function App() {
  const kinde = useKindeAuth();
  const [accessToken, setAccessToken] = useState<string | undefined>(undefined)

  useEffect(() => {
    (async () => {
      const token = await kinde.getAccessToken()
      setAccessToken(token)
    })()
  }, [kinde]);
  const handleSignUp = async () => {
    const token = await kinde.register({});
    if (token) {
      // User was authenticated
    }
  };

  const handleSignIn = async () => {
    const token = await kinde.login({});
    if (token) {
      // User was authenticated
    }
  };

  const handleLogout = async () => {
    await kinde.logout({revokeToken: true});
  };

  return !kinde.isAuthenticated ? (
    <View>
      <Pressable onPress={handleSignIn}>
        <Text>Sign In</Text>
      </Pressable>
      <Pressable onPress={handleSignUp}>
        <Text>Sign Up</Text>
      </Pressable>
    </View>
  ) : (
    <View>
      <Text>{accessToken}</Text>
      <Pressable onPress={handleLogout}>
        <Text>Logout</Text>
      </Pressable>
    </View>
  );
}
