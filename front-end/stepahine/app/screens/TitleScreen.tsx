import { observer } from "mobx-react-lite"
import React, {
  useLayoutEffect, // @demo remove-current-line
} from "react"
import { Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import {
  Button, // @demo remove-current-line
  Header, // @demo remove-current-line
  Text,
} from "../components"
import { isRTL } from "../i18n"
import { useStores } from "../models" // @demo remove-current-line
import { AppStackScreenProps } from "../navigators" // @demo remove-current-line
import { colors, spacing } from "../theme"
import {typography} from "../theme/typography"

const titleLogo = require("../../assets/images/title_logo.png")

interface TitleScreenProps extends AppStackScreenProps<"Title"> {} // @demo remove-current-line

export const TitleScreen = observer(function TitleScreen(
  props: TitleScreenProps, // @demo remove-current-line
) {
  // @demo remove-block-start
  const { navigation } = props
  const {
    authenticationStore: { setAuthToken },
  } = useStores()

  function logout() {
    setAuthToken(undefined)
  }

  function goJoinRoom() {
    navigation.navigate("JoinRoom", { screen: "JoinRoomScreen" })
  }

  function goCreateRoom() {
    navigation.navigate("CreateRoom", { screen: "CreateRoomScreen" })
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [])
  // @demo remove-block-end

  return (
    <View style={$container}>
      <Image style={$titleScreenTitle} source={titleLogo} resizeMode="contain" />

      <View style={$buttonContainer}>
        <Button style={$optionButton} preset="reversed" onPress={goJoinRoom} text="Join Room" />
        <Button style={$optionButton} preset="reversed" text="Create Room" />
      </View>
    </View>
  )
})

const $container: ViewStyle = {
  flex: 1,
  backgroundColor: "#E87241",
}

const $titleScreenTitle: ViewStyle = {
  height: 150,
  width: "100%",
  marginTop: "30%",
  marginBottom: "20%",
}

const $buttonContainer: ViewStyle = {
  justifyContent: "space-around",
  alignItems: "center",
}

const $optionButton: ViewStyle ={
  backgroundColor: "#FC8C5D",
  width: "60%",
  marginTop: "15%",
  flex: 1,
}
