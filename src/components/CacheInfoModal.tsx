import AsyncStorage from "@react-native-async-storage/async-storage"
import React, { useRef, useEffect, useMemo } from "react"
import { View, ScrollView, StyleSheet, SafeAreaView } from "react-native"
import { Modalize } from "react-native-modalize"
import DynamicImageGrid from "@/components/DynamicImageGrid"
import CommentSectionView from "./CommentSectionView"

import { formatDistance } from "@/utils/formatDistance"
import { MapPin } from "@/lib/icons/MapPin"
import { Eye } from "@/lib/icons/Eye"
import { Star } from "@/lib/icons/RaitingIcon"
import { Text } from "./ui/text"
import { Button } from "./ui/button"
import { useColorScheme } from "@/lib/useColorScheme"
import { darkTheme, lightTheme } from "@/lib/constants"


type Review = {
  id: string
  rating: 1 | 2 | 3 | 4 | 5
  comment: string
  createdAt: Date
  photo: string
  userName: string
}

type CacheData = {
  cacheId: string
  creatorId: string
  name: string
  description: string
  photos: string[]
  tags: string[] // exclude
  views: number
  reviews: Review[]
}

interface CacheInfoModalProps {
  modalVisible: boolean
  selectedCacheData: CacheData
  distance: number | null
  closeModal: () => void
  selectedGoToCache: string
  setSelectedGoToCache: (cacheId: string) => void
}

const CacheInfoModal: React.FC<CacheInfoModalProps> = ({
  modalVisible,
  selectedCacheData,
  distance,
  closeModal,
  selectedGoToCache,
  setSelectedGoToCache,
}) => {
  const { isDarkColorScheme } = useColorScheme()
  const theme = isDarkColorScheme ? darkTheme : lightTheme
  const { colors } = theme
  const modalizeRef = useRef<Modalize>(null)

  useEffect(() => {
    if (modalVisible) {
      modalizeRef.current?.open()
    } else {
      modalizeRef.current?.close()
    }
  }, [modalVisible])

  const averageRating = useMemo(() => {
    if (!selectedCacheData?.reviews || selectedCacheData.reviews.length === 0) {
      return 0;
    }
    const totalRating = selectedCacheData.reviews.reduce((sum, review) => sum + review.rating, 0);
    return Number((totalRating / selectedCacheData.reviews.length).toFixed(1));
  }, [selectedCacheData?.reviews]);

  const renderContent = () => {
    return (
      <View className="gap-2 p-4">
        {/* Title */}
        <Text className="text-2xl font-bold">{selectedCacheData?.name}</Text>

        {/* Stats (Pin, Eye, Star) */}
        <View className="flex-row items-center gap-4">
          <View className="flex-row items-center gap-1">
            <MapPin size={16} strokeWidth={1.25} className="h-6 w-6 text-primary" />
            <Text className="gap-2 font-medium text-muted-foreground">{distance ? formatDistance(distance) : "N/A"}</Text>
          </View>
          <View className="flex-row items-center gap-1">
            <Eye size={16} strokeWidth={1.25} className="h-6 w-6 text-foreground" />
            <Text className="gap-2 font-medium text-muted-foreground">
              {selectedCacheData?.views}
            </Text>
          </View>
          <View className="flex-row items-center gap-1">
            <Star
              size={16}
              strokeWidth={1.25}
              className="h-6 w-6 fill-yellow-400 text-yellow-400 dark:fill-yellow-500 dark:text-yellow-500"
            />
            <Text className="gap-2 font-medium text-muted-foreground">
              {averageRating}
            </Text>
          </View>
        </View>

        <View className="gap-4">
          
          <Text>{selectedCacheData?.description}</Text>
          <ScrollView style={{ maxHeight: 500 }} showsVerticalScrollIndicator={false}>
            
            {selectedCacheData?.photos && (
              <SafeAreaView>
                <DynamicImageGrid images={selectedCacheData?.photos} />
              </SafeAreaView>
            )}
            <CommentSectionView comments={selectedCacheData?.reviews} />
          </ScrollView>

          {/* Action Buttons */}
          <View className="w-full">
            {selectedGoToCache !== selectedCacheData?.cacheId ? (
              <Button
                onPress={() => {
                  setSelectedGoToCache(selectedCacheData.cacheId)
                  AsyncStorage.setItem("selectedCacheId", selectedCacheData.cacheId)
                }}
              >
                <Text>Select cache as destination</Text>
              </Button>
            ) : (
              <Button
                variant="destructive"
                onPress={() => {
                  setSelectedGoToCache("")
                  AsyncStorage.setItem("selectedCacheId", "")
                }}
              >
                <Text>Cancel</Text>
              </Button>
            )}
          </View>
        </View>
      </View>
    )
  }

  return (
    <Modalize
      ref={modalizeRef}
      onClosed={() => closeModal()}
      adjustToContentHeight
      modalStyle={{
        backgroundColor: colors.background,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
      }}
      handleStyle={styles.handleStyle}
    >
      {renderContent()}
    </Modalize>
  )
}

export default CacheInfoModal

const styles = StyleSheet.create({
  handleStyle: {},
})
