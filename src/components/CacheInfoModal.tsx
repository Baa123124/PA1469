import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Button,
  Animated,
  Pressable,
  StyleSheet
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { MapPin } from "@/lib/icons/MapPin"
import { Eye } from "@/lib/icons/ViewsIcon"
import { Star } from "@/lib/icons/RaitingIcon"

interface CacheData {
  id: string;
  name: string;
  views: number;
  rating: number;
  info: {
    description: string;
  };
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
  const [contentHeight, setContentHeight] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const [scrollIndicatorVisible, setScrollIndicatorVisible] = useState(false);
  const [arrowOpacity] = useState(new Animated.Value(1));
  const [opacity] = useState(new Animated.Value(0));

  useEffect(() => {
    if (modalVisible) {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      opacity.setValue(0);
    }
  }, [modalVisible, opacity]);

  return (
    <Modal
      visible={modalVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={closeModal}
    >
      <View style={{ flex: 1, position: 'relative' }}>
        {/* Full-screen background pressable layer */}
        <Pressable style={StyleSheet.absoluteFill} onPress={closeModal} />
        <View style={styles.modalContainer} pointerEvents="box-none">
          {/* Actual modal content wrapper for the use of proper pointerEvents="auto"
              ensures these elements receive touches */}
          <Animated.View style={[styles.modalContent, { opacity }]} pointerEvents="auto">
            
            <Text style={styles.modalTitle}>{selectedCacheData?.name}</Text>

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

            {/* Scrollable Section */}
            <View
              style={styles.scrollContainerWrapper}
              onLayout={(event) => {
                setContainerHeight(event.nativeEvent.layout.height);
              }}
            >
              {contentHeight > containerHeight && (
                <LinearGradient
                  colors={['rgba(0, 0, 0, 0.2)', 'transparent']}
                  style={styles.gradientTop}
                />
              )}

              <ScrollView
                contentContainerStyle={styles.scrollContainer}
                onContentSizeChange={(_contentWidth, newContentHeight) => {
                  setContentHeight(newContentHeight);
                  if (newContentHeight > containerHeight) {
                    setScrollIndicatorVisible(true);
                  }
                }}
                onScrollBeginDrag={() => setScrollIndicatorVisible(false)}
              >
                <Text style={styles.modalDescription}>
                  {selectedCacheData?.info?.description}
                </Text>
              </ScrollView>

              {contentHeight > containerHeight && (
                <LinearGradient
                  colors={['transparent', 'rgba(0, 0, 0, 0.2)']}
                  style={styles.gradientBottom}
                />
              )}

              {contentHeight > containerHeight && scrollIndicatorVisible && (
                <View style={styles.scrollIndicatorContainer}>
                  <Animated.Text style={[styles.scrollIndicatorText, { opacity: arrowOpacity }]}>
                    ↓ Scroll for more ↓
                  </Animated.Text>
                </View>
              )}
            </View>

            {/* Buttons Section */}
            <View style={styles.buttonContainer}>
              <View style={styles.fullWidthButton}>
                {selectedGoToCache !== selectedCacheData?.id ? (
                  <Button
                    title="Select cache as destination"
                    onPress={() => {
                      closeModal();
                      setSelectedGoToCache(selectedCacheData.id);
                    }}
                    color="#4285F4"
                  />
                ) : (
                  <Button
                    title="Cancel"
                    onPress={() => {
                      closeModal();
                      setSelectedGoToCache('');
                    }}
                    color="#CC5555"
                  />
                )}
              </View>

              <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </View>
    </Modal>
  );
};

export const styles = StyleSheet.create({
  modalContainer: {
    position: 'absolute',
    height: '70%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    bottom: 49,
  },
  modalContent: {
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 10,
  },  
  scrollContainerWrapper: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
    paddingLeft: 5,
    paddingRight: 5,
    marginLeft: -10,
    marginRight: -10,
    marginBottom: 75,
  },
  scrollContainer: {},
  modalTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  modalDescription: {
    fontSize: 16,
    marginBottom: 5,
    paddingBottom: 10
  },
  buttonContainer: {
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
  },
  fullWidthButton: {
    width: '80%',
    marginBottom: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  closeButton: {
    width: '80%',
    paddingVertical: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#4285F4',
    fontSize: 16,
    textAlign: 'center',
  },
  gradientTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 20,
    zIndex: 1,
  },
  gradientBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 20,
    zIndex: 1,
  },
  scrollIndicatorContainer: {
    marginTop: 5,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 5,
    alignItems: 'center',
    zIndex: 1000,
  },
  scrollIndicatorText: {
    fontSize: 14,
    color: '#4285F4',
    fontWeight: 'bold',
    zIndex: 10,
    backgroundColor: 'white',
    padding: 5
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
});

export default CacheInfoModal;
