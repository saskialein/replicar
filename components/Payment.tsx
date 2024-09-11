import { useStripe } from '@stripe/stripe-react-native'
import CustomButton from './CustomButton'
import { useState } from 'react'
import { Alert, Image, Text, View } from 'react-native'
import { fetchAPI } from '@/lib/fetch'
import { PaymentProps } from '@/types/type'
import { useLocationStore } from '@/store'
import { useAuth } from '@clerk/clerk-expo'
import ReactNativeModal from 'react-native-modal'
import { images } from '@/constants'
import { router } from 'expo-router'

export default function Payment({
  fullName,
  email,
  amount,
  driverId,
  rideTime
}: PaymentProps) {
  const { initPaymentSheet, presentPaymentSheet } = useStripe()

  const [success, setSuccess] = useState(false)
  const {
    userAddress,
    userLatitude,
    userLongitude,
    destinationAddress,
    destinationLatitude,
    destinationLongitude
  } = useLocationStore()

  const { userId } = useAuth()

  const confirmHandler = async (
    paymentMethod: { id: string },
    _: unknown,
    intentCreationCallback: (clientSecret: { clientSecret: string }) => void
  ) => {
    const { paymentIntent, customer } = await fetchAPI(
      '/(api)/(stripe)/create',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: fullName || email.split('@')[0],
          email,
          amount,
          paymentMethodId: paymentMethod.id
        })
      }
    )

    if (paymentIntent.client_secret) {
      const { result } = await fetchAPI('/(api)/(stripe)/pay', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          payment_method_id: paymentMethod.id,
          payment_intent_id: paymentIntent.id,
          customer_id: customer,
          client_secret: paymentIntent.client_secret
        })
      })
      if (result.client_secret) {
        await fetchAPI('/(api)/ride/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            origin_address: userAddress,
            origin_latitude: userLatitude,
            origin_longitude: userLongitude,
            destination_address: destinationAddress,
            destination_latitude: destinationLatitude,
            destination_longitude: destinationLongitude,
            ride_time: rideTime.toFixed(0),
            fare_price: parseInt(amount) * 100,
            payment_status: 'paid',
            driver_id: driverId,
            user_id: userId
          })
        })
        intentCreationCallback({ clientSecret: result.client_secret })
      }
    }
  }

  const initializePaymentSheet = async () => {
    const { error } = await initPaymentSheet({
      merchantDisplayName: 'Replicar Ltd.',
      intentConfiguration: {
        mode: {
          amount: parseInt(amount) * 100,
          currencyCode: 'NZD'
        },
        confirmHandler: confirmHandler
      },
      returnURL: 'myapp://book-ride'
    })
    if (error) {
      console.error(error)
    }
  }

  const openPaymentSheet = async () => {
    await initializePaymentSheet()
    const { error } = await presentPaymentSheet()

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message)
    } else {
      setSuccess(true)
    }
  }
  return (
    <>
      <CustomButton
        title='Confirm Ride'
        className='my-10'
        onPress={openPaymentSheet}
      />
      <ReactNativeModal
        isVisible={success}
        onBackdropPress={() => setSuccess(false)}
      >
        <View className='flex flex-col items-center justify-center rounded-2xl bg-white p-7'>
          <Image source={images.check} className='mt-5 h-28 w-28' />
          <Text className='mt-5 text-center font-JakartaBold text-2xl'>
            Ride booked!
          </Text>
          <Text className='text-md mt-3 text-center font-JakartaMedium text-general-200'>
            Thank you for your booking. Your reservation has been placed. Please
            proceed with your trip.
          </Text>
          <CustomButton
            title='Back Home'
            onPress={() => {
              setSuccess(false)
              router.push('/(root)/(tabs)/home')
            }}
            className='mt-5'
          />
        </View>
      </ReactNativeModal>
    </>
  )
}
