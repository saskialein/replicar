import RideCard from '@/components/RideCard'
import { images } from '@/constants'
import { useFetch } from '@/lib/fetch'
import { Ride } from '@/types/type'
import { useUser } from '@clerk/clerk-expo'
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Rides() {
  const { user } = useUser()
  const { data: recentRides, loading } = useFetch<Ride[]>(
    `/(api)/ride/${user?.id}`
  )
  return (
    <SafeAreaView>
      <FlatList
        data={recentRides}
        renderItem={({ item }) => <RideCard ride={item} />}
        className='px-5'
        keyboardShouldPersistTaps='handled'
        contentContainerStyle={{ paddingBottom: 100 }}
        ListEmptyComponent={() => (
          <View className='flex flex-col items-center justify-center'>
            {!loading ? (
              <>
                <Image
                  source={images.noResult}
                  className='h-40 w-40'
                  alt='No recent rides found'
                  resizeMode='contain'
                />
                <Text className='text-sm'>No recent rides found</Text>
              </>
            ) : (
              <ActivityIndicator size='small' color='#000' />
            )}
          </View>
        )}
        ListHeaderComponent={() => (
          <>
            <Text className='my-5 font-JakartaBold text-2xl'>All Rides</Text>
          </>
        )}
      />
    </SafeAreaView>
  )
}
