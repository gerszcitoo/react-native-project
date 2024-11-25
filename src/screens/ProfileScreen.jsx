import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { colors } from "../global/colors";
import CameraIcon from "../components/CameraIcon";
import { useSelector, useDispatch } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import { setProfilePicture } from "../features/auth/authSlice";
import { usePutProfilePictureMutation } from "../services/userService";
import { clearSessions } from "../db/index";
import { setUser } from "../features/auth/authSlice";

const ProfileScreen = () => {
  const user = useSelector((state) => state.authReducer.value.email);
  const image = useSelector((state) => state.authReducer.value.profilePicture);
  const localId = useSelector((state) => state.authReducer.value.localId);
  const dispatch = useDispatch();

  const [triggerPutProfilePicture, result] = usePutProfilePictureMutation();

  const verifyCameraPermissions = async () => {
    const { granted } = await ImagePicker.requestCameraPermissionsAsync();
    if (!granted) return false;
    return true;
  };

  const pickImage = async () => {
    const permissionOK = await verifyCameraPermissions();
    if (permissionOK) {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        base64: true,
        quality: 0.5,
      });
      if (!result.canceled) {
        dispatch(
          setProfilePicture(`data:image/jpeg;base64,${result.assets[0].base64}`)
        );
        triggerPutProfilePicture({
          image: `data:image/jpeg;base64,${result.assets[0].base64}`,
          localId,
        });
      }
    }
  };

  const handleLogout = async () => {
    try {
      await clearSessions();
      dispatch(setUser({ email: null, localId: "", token: null }));
    } catch (error) {
      throw error;
    }
  };

  return (
    <View style={styles.profileContainer}>
      <View style={styles.imageProfileContainer}>
        {image ? (
          <Image
            source={{ uri: image }}
            resizeMode="cover"
            style={styles.profileImage}
          />
        ) : (
          <Text style={styles.textProfilePlaceHolder}>
            {user.charAt(0).toUpperCase()}
          </Text>
        )}
        <Pressable
          onPress={pickImage}
          style={({ pressed }) => [
            { opacity: pressed ? 0.9 : 1 },
            styles.cameraIcon,
          ]}
        >
          <CameraIcon />
        </Pressable>
      </View>
      <Text style={styles.profileData}>Email: {user}</Text>
      <Pressable onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutText}>Cerrar Sesión</Text>
      </Pressable>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  profileContainer: {
    padding: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  imageProfileContainer: {
    width: 128,
    height: 128,
    borderRadius: 128,
    backgroundColor: colors.azulCielo,
    justifyContent: "center",
    alignItems: "center",
  },
  textProfilePlaceHolder: {
    color: colors.blanco,
    fontSize: 48,
  },
  profileData: {
    paddingVertical: 16,
    fontSize: 16,
  },
  cameraIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
  },
  profileImage: {
    width: 128,
    height: 128,
    borderRadius: 128,
  },
  logoutButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: colors.rojoPersa,
    borderRadius: 5,
  },
  logoutText: {
    color: colors.blanco,
    fontSize: 16,
    fontWeight: "bold",
  },
});
