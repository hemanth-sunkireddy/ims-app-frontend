import React, { useState, useEffect, useRef } from "react";
import NetInfo from "@react-native-community/netinfo";
import NetInfoState from "@react-native-community/netinfo";
import { SafeAreaView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

function Connectionstatus() {
  const navigation = useNavigation();
  const route = useRoute();
  const [_networkState, setNetworkState] = useState(null);
  const prevScreenRef = useRef(null);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state: NetInfoState) => {
      setNetworkState(state);
      if (state.type === "none") {
        navigation.navigate("NoInternet");
      } else if (prevScreenRef.current) {
        navigation.navigate(prevScreenRef.current);
      }
    });

    // Unsubscribe from network state updates
    return () => {
      unsubscribe();
    };
  }, [navigation]);

  useEffect(() => {
    prevScreenRef.current = route.name;
  }, [route.name]);

  return <SafeAreaView></SafeAreaView>;
}

export default Connectionstatus;
