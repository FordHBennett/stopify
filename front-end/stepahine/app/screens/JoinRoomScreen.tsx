import { observer } from "mobx-react-lite"
import React, {
  useLayoutEffect, // @demo remove-current-line
  useState,
} from "react"
import { Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import {
  Button, // @demo remove-current-line
  Header, // @demo remove-current-line
  Text,
  TextField,
} from "../components"
import { isRTL } from "../i18n"
import { useStores } from "../models" // @demo remove-current-line
import { AppStackScreenProps } from "../navigators" // @demo remove-current-line
import { colors, spacing } from "../theme"
import { typography } from "../theme/typography"

const titleLogo = require("../../assets/images/title_logo.png")

function sendValues(code) {
  console.log(enteredName)
}

interface JoinRoomScreenProps extends AppStackScreenProps<"JoinRoom"> {} // @demo remove-current-line

export const JoinRoomScreen = observer(function JoinRoomScreen(
  props: JoinRoomScreenProps, // @demo remove-current-line
) {
  // @demo remove-block-start
  const { navigation } = props
  const {
    authenticationStore: { setAuthToken },
  } = useStores()

  function logout() {
    setAuthToken(undefined)
  }

  const [code, setCode] = useState("")

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [])
  // @demo remove-block-end

  return (
    <View style={$container}>
      <Text style={$joinRoomTitle}>Join a Room</Text>
      <TextField value={code} preset="reversed" onChangeText={(text) => setCode(text)} label="Enter code here" />

      <Button style={$optionButton} preset="reversed" text="Enter Room" />
    </View>
  )
})

const $container: ViewStyle = {
  flex: 1,
  backgroundColor: "#E87241",
  alignItems: "center",
}

const $joinRoomTitle: ViewStyle = {
  fontWeight: 'bold',
  fontFamily: typography.fonts.spaceGrotesk.normal,
  fontSize: 50,
  paddingTop: "30%",
}

const $optionButton: ViewStyle ={
  backgroundColor: "#FC8C5D",
  width: "60%",
  maxHeight: "10%",
  marginTop: "15%",
  flex: 1,
}
