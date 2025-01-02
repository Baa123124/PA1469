import AsyncStorage from "@react-native-async-storage/async-storage"
import React, { useRef, useEffect } from 'react';
import { 
  View, Text, Button, ScrollView,
  StyleSheet, SafeAreaView
} from 'react-native';
import { Modalize } from 'react-native-modalize';
import LinearGradient from 'react-native-linear-gradient';
import DynamicImageGrid from "@/components/DynamicImageGrid";

import { MapPin } from "@/lib/icons/MapPin";
import { Eye } from "@/lib/icons/ViewsIcon";
import { Star } from "@/lib/icons/RaitingIcon";

type Review = {
  id: string
  rating: 1 | 2 | 3 | 4 | 5
  comment: string
  createdAt: Date
  photo: string
}

type CacheData = {
  cacheId: string,
  creatorId: string
  name: string
  description: string
  photos: string[]
  tags: string[] // exclude
  rating: number
  views: number
  reviews: Review[]
}

interface CacheInfoModalProps {
  modalVisible: boolean;
  selectedCacheData: CacheData;
  closeModal: () => void;
  selectedGoToCache: string;
  setSelectedGoToCache: (cacheId: string) => void;
}

const CacheInfoModal: React.FC<CacheInfoModalProps> = ({
  modalVisible,
  selectedCacheData,
  closeModal,
  selectedGoToCache,
  setSelectedGoToCache,
}) => {
  const modalizeRef = useRef<Modalize>(null);

  useEffect(() => {
    if (modalVisible) {
      modalizeRef.current?.open();
    } else {
      modalizeRef.current?.close();
    }
  }, [modalVisible]);

  const renderContent = () => {
    return (
      <View style={styles.contentContainer}>

        {/* Title */}
        <Text style={styles.modalTitle}>{selectedCacheData?.name}</Text>

        {/* Stats (Pin, Eye, Star) */}
        <View style={styles.cacheStatsContainer}>
          <View style={styles.statsElement}>
            <MapPin size={24} className="w-6 h-6 text-foreground" />
            <Text>1km</Text>
          </View>
          <View style={styles.statsElement}>
            <Eye size={24} className="w-6 h-6 text-foreground" />
            <Text>{selectedCacheData?.views}</Text>
          </View>
          <View style={styles.statsElement}>
            <Star size={24} color="#ffcd3c" fill="#ffcd3c" className="w-6 h-6 text-foreground" />
            <Text>{selectedCacheData?.rating}</Text>
          </View>
        </View>

        {/* Scrollable Description */}
        <View style={styles.scrollContainerWrapper}>
          
          <ScrollView style={{ maxHeight: 500 }}>
            <Text style={styles.modalDescription}>
              {selectedCacheData?.description}
            </Text>

            {selectedCacheData?.photos && (
              <SafeAreaView>
                <DynamicImageGrid images={selectedCacheData?.photos} />
              </SafeAreaView>
            )}

          </ScrollView>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <View style={styles.fullWidthButton}>
            {selectedGoToCache !== selectedCacheData?.cacheId ? (
              <Button
                title="Select cache as destination"
                onPress={() => {
                  setSelectedGoToCache(selectedCacheData.cacheId);
                  AsyncStorage.setItem("selectedCacheId", selectedCacheData.cacheId)
                }}
                color="#4285F4"
              />
            ) : (
              <Button
                title="Cancel"
                onPress={() => {
                  setSelectedGoToCache('');
                  AsyncStorage.setItem("selectedCacheId", "")
                }}
                color="#CC5555"
              />
            )}
          </View>
        </View>
      </View>
    );
  };

  return (
    <Modalize
      ref={modalizeRef}
      onClosed={closeModal}
      adjustToContentHeight
      modalStyle={styles.modalizeStyle}
      handleStyle={styles.handleStyle}
    >
      {renderContent()}
    </Modalize>
  );
};

export default CacheInfoModal;

const styles = StyleSheet.create({
  modalizeStyle: {
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  handleStyle: {
  },
  contentContainer: {
    padding: 10,
  },
  modalTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cacheStatsContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  statsElement: {
    marginBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  scrollContainerWrapper: {
    marginTop: 4,
    marginBottom: 4,
  },
  modalDescription: {
    fontSize: 16,
    paddingBottom: 10,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullWidthButton: {
    width: '80%',
    marginBottom: 5,
    borderRadius: 10,
    overflow: 'hidden',
  },
});
