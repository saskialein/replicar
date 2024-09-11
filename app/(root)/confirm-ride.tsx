import CustomButton from '@/components/CustomButton'
import DriverCard from '@/components/DriverCard'
import RideLayout from '@/components/RideLayout'
import { useDriverStore } from '@/store'
import { router } from 'expo-router'
import React from 'react'
import { FlatList, View } from 'react-native'

export default function ConfirmRide() {
  const { drivers, selectedDriver, setSelectedDriver } = useDriverStore()
  return (
    <RideLayout title='Choose a Driver' snapPoints={['65%', '85%']}>
      <FlatList
        data={drivers}
        renderItem={({ item }) => (
          <DriverCard
            selected={selectedDriver!}
            setSelected={() => setSelectedDriver(Number(item.id)!)}
            item={item}
          />
        )}
        ListFooterComponent={() => (
          <View className='mx-5 mt-10'>
            <CustomButton
              title='Select Ride'
              onPress={() => router.push('/(root)/book-ride')}
            />
          </View>
        )}
      />
    </RideLayout>
  )
}
