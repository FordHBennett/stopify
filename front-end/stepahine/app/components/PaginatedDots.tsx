import React from "react"
import { observer } from "mobx-react-lite"
import {
  ViewStyle,
  View,
  TextStyle,
  FlatList,
  ImageSourcePropType,
  ImageStyle,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native"
import { Button, Screen, Text, AutoImage } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color, MetricsSizes } from "../../theme"

const width: number = Dimensions.get('screen').width;

const PAGINATION_DOT_SIZE = 12;
const PAGINATION_DOT_UNSELECTED_COLOR = 'rgba(242, 244, 248, 0.5)';

const ROOT: ViewStyle = {
  backgroundColor: color.palette.redFlow,
  flex: 1,
  flexDirection: 'column',
  justifyContent: 'flex-end',
  paddingVertical: MetricsSizes.large,
}

const CAROUSEL: ViewStyle = {
}

const IMG_CONTAINER: ViewStyle = {
  width,
  alignItems: 'center',
  justifyContent: 'space-around',
}


const CAROUSEL_TEXT: TextStyle = {
  fontSize: 40,
  fontFamily: 'ProximaNovaRegular',
  fontWeight: '800',
  marginHorizontal: MetricsSizes.large,
  textAlign: 'center',
  marginVertical: MetricsSizes.regular,
}

const PAGINATION: ViewStyle = {
  width,
  flexDirection: 'row',
  justifyContent: 'center',
}

const PAGINATION_DOT: ViewStyle = {
  borderRadius: PAGINATION_DOT_SIZE,
  width: PAGINATION_DOT_SIZE,
  height: PAGINATION_DOT_SIZE,
  margin: MetricsSizes.regular,
  backgroundColor: PAGINATION_DOT_UNSELECTED_COLOR,
}

const PAGINATION_DOT_SELECTED: ViewStyle = {
  backgroundColor: color.palette.white,
}

const BTN: ViewStyle = {
  backgroundColor: color.palette.white,
  marginHorizontal: MetricsSizes.regular,
  marginVertical: MetricsSizes.regular,
  height: 58,
  flexDirection: 'row',
  justifyContent: 'flex-start',
  borderRadius: 8,
}
const BTN_LOGIN: ViewStyle = {
  backgroundColor: color.palette.redFlow,
  borderColor: color.palette.white,
  borderStyle: 'solid',
  borderWidth: 1,
  justifyContent: 'space-between',
}

const BTN_TXT: TextStyle = {
  color: color.palette.black,
  fontSize: 16,
  fontWeight: '600',
}

const BTN_TXT_LOGIN: TextStyle = {
  color: color.palette.white,
  marginHorizontal: MetricsSizes.regular,
}

const BTN_LOGIN_ICON: ImageStyle = {
  width: 13,
  height: 13,
  marginHorizontal: MetricsSizes.regular,
}

export const OnboardingScreen = observer(function OnboardingScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const images: { [key: string]: ImageSourcePropType } = {
    carousel1: require('../../../assets/images/images/logo.png'),
    carousel2: require('../../../assets/images/images/rnl-logo.png'),
    loginIcon: require('../../../assets/images/images/cr-logo.png'),
  }

  interface ICarouselItem {
    image: ImageSourcePropType;
    text: string;
  }

  const carouselItems: ICarouselItem[] = [
    {
      image: require('../../../assets/images/images/logo.png'),
      text: 'Listen for free thousands of beats'
    },
    {
      image: require('../../../assets/images/images/rnl-logo.png'),
      text: 'The more beats you listen, more you will like what you hear tomorrow'
    }
  ]

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const totalWidth = event.nativeEvent.layoutMeasurement.width;
    const xPos = event.nativeEvent.contentOffset.x;
    const current = Math.floor(xPos / totalWidth);
    setCurrentIndex(current);
  }

  const onRegister = () => {
    console.log('clicked on Register');
  }

  const onLogin = () => {
    console.log('clicked on login');
  }

  const Carousel = (
    <FlatList<ICarouselItem>
      contentContainerStyle={CAROUSEL}
      data={carouselItems}
      keyExtractor={(_, index) => index.toString()}
      horizontal
      pagingEnabled
      onScroll={onScroll}
      showsHorizontalScrollIndicator={false}
      renderItem={({item}) =>
        <View style={IMG_CONTAINER}>
          <AutoImage source={item.image}/>
          <Text style={CAROUSEL_TEXT} text={item.text}/>
        </View>
      }
    />
  );

  const Pagination = (
    <View style={PAGINATION}>
      {carouselItems.map((_, index) => (
        <View key={index} style={[
          PAGINATION_DOT,
          (currentIndex === index) ? PAGINATION_DOT_SELECTED : {}
        ]}/>
      ))}
    </View>
  )



  const Buttons = (
    <View>
      <Button text="Register" style={BTN} textStyle={BTN_TXT} onPress={onRegister}/>
      <Button text="Log in" style={[BTN, BTN_LOGIN]} onPress={onLogin}>
        <Text preset="header" text="Log in" style={[BTN_TXT, BTN_TXT_LOGIN]}/>
        <AutoImage source={images.loginIcon} style={BTN_LOGIN_ICON}/>
      </Button>
    </View>
  );

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={ROOT}>
      {Carousel}
      {Pagination}
      {Buttons}
    </Screen>
  )
})