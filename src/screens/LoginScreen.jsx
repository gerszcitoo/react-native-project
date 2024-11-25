import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../global/colors";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useState, useEffect } from "react";
import { useLoginMutation } from "../services/authService";
import { setUser } from "../features/auth/authSlice";
import { useDispatch } from "react-redux";
import {
  initializeDatabase,
  fetchSessions,
  getActiveSession,
  insertUniqueSession,
} from "../db/index";

const textInputWidth = Dimensions.get("window").width * 0.7;

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const dispatch = useDispatch();

  const [triggerLogin, result] = useLoginMutation();

  useEffect(() => {
    const setupDatabase = async () => {
      try {
        await initializeDatabase();
      } catch (error) {
        throw error;
      }
    };

    setupDatabase();
  }, []);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const session = await getActiveSession();
        if (session) {
          dispatch(setUser({ email: session.email, token: session.token }));
        }
      } catch (error) {
        throw error;
      }
    };

    checkSession();
  }, []);

  useEffect(() => {
    if (result.isSuccess) {
      dispatch(setUser(result.data));

      if (rememberMe) {
        const handleSession = async () => {
          try {
            await insertUniqueSession({
              localId: result.data.localId,
              email: result.data.email,
              token: result.data.idToken,
            });
            const sessions = await fetchSessions();
          } catch (error) {
            throw error;
          }
        };
        handleSession();
      }
    }
  }, [result, rememberMe]);

  const onsubmit = () => {
    triggerLogin({ email, password });
  };

  return (
    <LinearGradient
      colors={["#6C0000", "#ec2F4B"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >
      <Text style={styles.title}>LUDOMANIA</Text>
      <Text style={styles.subTitle}>Iniciar sesión</Text>
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={(text) => setEmail(text)}
          placeholderTextColor="#EBEBEB"
          placeholder="Email"
          style={styles.textInput}
        />
        <TextInput
          onChangeText={(text) => setPassword(text)}
          placeholderTextColor="#EBEBEB"
          placeholder="Password"
          style={styles.textInput}
          secureTextEntry
        />
      </View>
      <View style={styles.rememberMeContainer}>
        <Text style={styles.whiteText}>Mantener sesión iniciada</Text>
        {rememberMe ? (
          <Pressable onPress={() => setRememberMe(!rememberMe)}>
            <Icon name="toggle-on" size={48} color={colors.verdeJade} />
          </Pressable>
        ) : (
          <Pressable onPress={() => setRememberMe(!rememberMe)}>
            <Icon name="toggle-off" size={48} color={colors.grisClaro} />
          </Pressable>
        )}
      </View>
      <View style={styles.footTextContainer}>
        <Text style={styles.whiteText}>¿No tienes una cuenta?</Text>
        <Pressable onPress={() => navigation.navigate("Signup")}>
          <Text
            style={{
              ...styles.whiteText,
              ...styles.underLineText,
            }}
          >
            Crea una
          </Text>
        </Pressable>
      </View>
      <Pressable style={styles.btn} onPress={onsubmit}>
        <Text style={styles.btnText}>Iniciar sesión</Text>
      </Pressable>
      <View style={styles.guestOptionContainer}>
        <Text style={styles.whiteText}>¿Solo quieres dar un vistazo?</Text>
        <Pressable
          onPress={() =>
            dispatch(setUser({ email: "demo@ludomania.com", token: "demo" }))
          }
        >
          <Text style={{ ...styles.whiteText, ...styles.strongText }}>
            Ingresa como invitado
          </Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
};
export default LoginScreen;
const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: colors.blanco,
    fontFamily: "Slackey",
    fontSize: 42,
  },
  subTitle: {
    fontFamily: "Slackey",
    fontSize: 18,
    color: colors.amarilloAzafran,
    letterSpacing: 3,
  },
  inputContainer: {
    gap: 16,
    margin: 16,
    marginTop: 48,
    alignItems: "center",
  },
  textInput: {
    padding: 8,
    paddingLeft: 16,
    borderRadius: 16,
    backgroundColor: "#95859E",
    width: textInputWidth,
    color: colors.blanco,
  },
  footTextContainer: {
    flexDirection: "row",
    gap: 8,
  },
  whiteText: {
    color: colors.blanco,
  },
  underLineText: {
    textDecorationLine: "underline",
  },
  strongText: {
    fontWeight: "900",
    fontSize: 16,
  },
  btn: {
    padding: 16,
    paddingHorizontal: 32,
    backgroundColor: colors.amarilloAzafran,
    borderRadius: 16,
    marginTop: 32,
  },
  btnText: {
    color: colors.blanco,
    fontSize: 16,
    fontWeight: "700",
  },
  guestOptionContainer: {
    alignItems: "center",
    marginTop: 64,
  },
  rememberMeContainer: {
    flexDirection: "row",
    gap: 5,
    justifyContent: "space-around",
    alignItems: "center",
    marginVertical: 8,
  },
});
