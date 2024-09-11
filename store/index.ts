import { DriverStore, LocationStore } from '@/types/type'
import { create } from 'zustand'

export const useLocationStore = create<LocationStore>(set => ({
  userAddress: null,
  userLatitude: null,
  userLongitude: null,
  destinationLongitude: null,
  destinationLatitude: null,
  destinationAddress: null,
  setUserLocation: ({
    latitude,
    longitude,
    address
  }: {
    latitude: number
    longitude: number
    address: string
  }) => {
    set(() => ({
      userAddress: address,
      userLatitude: latitude,
      userLongitude: longitude
    }))
  },
  setDestinationLocation: ({
    latitude,
    longitude,
    address
  }: {
    latitude: number
    longitude: number
    address: string
  }) => {
    set(() => ({
      destinationAddress: address,
      destinationLatitude: latitude,
      destinationLongitude: longitude
    }))
  }
}))

export const useDriverStore = create<DriverStore>(set => ({
  drivers: [],
  selectedDriver: null,
  setSelectedDriver: (driverId: number) =>
    set(() => ({ selectedDriver: driverId })),
  setDrivers: drivers => set(() => ({ drivers })),
  clearSelectedDriver: () => set(() => ({ selectedDriver: null }))
}))
