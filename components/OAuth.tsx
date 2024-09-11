import { Image, Text, View } from 'react-native'
import CustomButton from './CustomButton'
import { icons } from '@/constants'
import { useCallback } from 'react'
import { useOAuth } from '@clerk/clerk-expo'
import { googleOAuth } from '@/lib/auth'
import { router } from 'expo-router'

export default function OAuth() {
  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' })

  const handleGoogleSignIn = useCallback(async () => {
    try {
      const result = await googleOAuth(startOAuthFlow)

      if (result.code === 'session_exists' || result.code === 'success') {
        router.push('/(root)/(tabs)/home')
      }
    } catch (err) {
      console.error('OAuth error', err)
    }
  }, [])
  return (
    <View>
      <View className='mt-4 flex flex-row items-center justify-center gap-x-3'>
        <View className='h-[1px] flex-1 bg-general-100' />
        <Text className='text-lg'>Or</Text>
        <View className='h-[1px] flex-1 bg-general-100' />
      </View>
      <CustomButton
        title='Log In with Google'
        className='mt-5 w-full shadow-none'
        IconLeft={() => (
          <Image
            source={icons.google}
            resizeMode='contain'
            className='mx-2 h-5 w-5'
          />
        )}
        bgVariant='outline'
        textVariant='primary'
        onPress={handleGoogleSignIn}
      />
    </View>
  )
}
