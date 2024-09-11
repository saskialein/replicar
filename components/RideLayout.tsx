import { icons } from '@/constants'
import { router } from 'expo-router'
import { ReactNode, useRef } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Map from './Map'
import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetView
} from '@gorhom/bottom-sheet'

export default function RideLayout({
  children,
  title,
  snapPoints
}: {
  children: ReactNode
  title: string
  snapPoints?: string[]
}) {
  const bottomSheetRef = useRef<BottomSheet>(null)
  return (
    <GestureHandlerRootView className='flex-1'>
      <View className='flex-1 bg-white'>
        <View className='flex h-screen flex-col bg-blue-500'>
          <View className='absolute top-16 z-10 flex flex-row items-center justify-start px-5'>
            <TouchableOpacity onPress={() => router.back()}>
              <View className='h-10 w-10 items-center justify-center rounded-full bg-white'>
                <Image
                  source={icons.backArrow}
                  resizeMode='contain'
                  className='h-6 w-6'
                />
              </View>
            </TouchableOpacity>
            <Text className='ml-5 font-JakartaSemiBold text-xl'>
              {title || 'Go Back'}
            </Text>
          </View>
          <Map />
        </View>
        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={snapPoints || ['40%', '85%']}
          index={0}
        >
          {title === 'Choose a Rider' ? (
            <BottomSheetView
              style={{
                flex: 1,
                padding: 20
              }}
            >
              {children}
            </BottomSheetView>
          ) : (
            <BottomSheetScrollView
              style={{
                flex: 1,
                padding: 20
              }}
            >
              {children}
            </BottomSheetScrollView>
          )}
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  )
}
