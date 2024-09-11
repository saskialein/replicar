import CustomButton from '@/components/CustomButton'
import InputField from '@/components/InputField'
import OAuth from '@/components/OAuth'
import { icons, images } from '@/constants'
import { fetchAPI } from '@/lib/fetch'
import { useSignUp } from '@clerk/clerk-expo'
import { Link, router } from 'expo-router'
import { useState } from 'react'
import { Alert, Image, ScrollView, Text, View } from 'react-native'
import ReactNativeModal from 'react-native-modal'

export default function SignUp() {
  const { isLoaded, signUp, setActive } = useSignUp()
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  })
  const [verification, setVerification] = useState({
    state: 'default',
    error: '',
    code: ''
  })

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return
    }

    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password
      })

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

      setVerification({ ...verification, state: 'pending' })
    } catch (err: any) {
      Alert.alert('Error', err.errors[0].longMessage)
    }
  }

  const onPressVerify = async () => {
    if (!isLoaded) {
      return
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verification.code
      })

      if (completeSignUp.status === 'complete') {
        //TODO: Create a database user
        await fetchAPI('/(api)/user', {
          method: 'POST',
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            clerkId: completeSignUp.createdUserId
          })
        })
        await setActive({ session: completeSignUp.createdSessionId })
        setVerification({ ...verification, state: 'success' })
      } else {
        setVerification({
          ...verification,
          state: 'failed',
          error: 'Verification failed'
        })
      }
    } catch (err: any) {
      setVerification({
        ...verification,
        state: 'failed',
        error: err.errors[0].longMessage
      })
    }
  }

  return (
    <ScrollView className='flex-1 bg-white'>
      <View className='flex-1 bg-white'>
        <View className='relative h-[220px] w-full'>
          <Image source={images.signUpCar} className='z-0 h-[250px] w-full' />
          <Text className='absolute bottom-5 left-5 font-JakartaSemiBold text-2xl text-black'>
            Create Your Account
          </Text>
        </View>
        <View className='p-5'>
          <InputField
            label='Name'
            placeholder='Enter your name'
            icon={icons.person}
            value={form.name}
            onChangeText={value => setForm({ ...form, name: value })}
          />
          <InputField
            label='Email'
            placeholder='Enter your email'
            icon={icons.email}
            value={form.email}
            onChangeText={value => setForm({ ...form, email: value })}
          />
          <InputField
            label='Password'
            placeholder='Enter your password'
            icon={icons.lock}
            secureTextEntry={true}
            value={form.password}
            onChangeText={value => setForm({ ...form, password: value })}
          />
          <CustomButton
            title='Sign Up'
            onPress={onSignUpPress}
            className='mt-6'
          />
          <OAuth />
          <Link
            href='/sign-in'
            className='mt-10 text-center text-lg text-general-200'
          >
            <Text>Already have an account? </Text>
            <Text className='text-primary-500'>Log In</Text>
          </Link>
        </View>
        <ReactNativeModal
          isVisible={verification.state === 'pending'}
          onModalHide={() => {
            if (verification.state === 'success') setShowSuccessModal(true)
          }}
        >
          <View className='min-h-[300px] rounded-2xl bg-white px-7 py-9'>
            <Text className='mb-2 font-JakartaExtraBold text-2xl'>
              Verification
            </Text>
            <Text className='mb-5 font-Jakarta'>
              We've sent a verification code to {form.email}
            </Text>
            <InputField
              label='Code'
              icon={icons.lock}
              placeholder='12345'
              value={verification.code}
              keyboardType='numeric'
              onChangeText={code => setVerification({ ...verification, code })}
            />
            {verification.error && (
              <Text className='mt-1 text-sm text-red-500'>
                {verification.error}
              </Text>
            )}
            <CustomButton
              title='Verify Email'
              onPress={onPressVerify}
              className='mt-5 bg-success-500'
            />
          </View>
        </ReactNativeModal>
        <ReactNativeModal isVisible={showSuccessModal}>
          <View className='min-h-[300px] rounded-2xl bg-white px-7 py-9'>
            <Image
              source={images.check}
              className='mx-auto my-5 h-[110px] w-[110px]'
            />
            <Text className='text-center font-JakartaBold text-3xl'>
              Verify
            </Text>
            <Text className='mt-2 text-center font-Jakarta text-base text-gray-400'>
              You have successfully verified your account.
            </Text>
            <CustomButton
              title='Browse Home'
              onPress={() => {
                router.push('/(root)/(tabs)/home')
                setShowSuccessModal(false)
              }}
              className='mt-5'
            />
          </View>
        </ReactNativeModal>
      </View>
    </ScrollView>
  )
}
