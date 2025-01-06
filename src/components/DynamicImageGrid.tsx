import React, { useState } from "react";
import { 
    View, 
    Image, 
    StyleSheet, 
    Dimensions,
    Modal,
    Pressable,
} from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";
interface DynamicImageGridProps {
  images: string[]; // Image URIs
}

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;
const IMAGE_GAP = 4;

const DynamicImageGrid: React.FC<DynamicImageGridProps> = ({ images }) => {
  if (!images || images.length === 0) return null;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const openImageModal = (uri: string) => {
    setSelectedImage(uri);
    setIsModalVisible(true);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
    setIsModalVisible(false);
  };

  return (
    <>
      {/* MAIN IMAGE GRID */}
      <View style={styles.container}>
        {/* Single Image */}
        {images.length === 1 && (
          <Pressable onPress={() => openImageModal(images[0])}>
            <Image
              source={{ uri: images[0] }}
              style={styles.singleImage}
              onError={(e) =>
                console.log("Error loading single image:", e.nativeEvent.error)
              }
            />
          </Pressable>
        )}

        {/* Two Images */}
        {images.length === 2 && (
          <View style={styles.twoImagesContainer}>
            <Pressable
              style={{ flex: 1, height: "100%" }}
              onPress={() => openImageModal(images[0])}
            >
              <Image
                source={{ uri: images[0] }}
                style={styles.twoImage}
                onError={(e) =>
                  console.log("Error loading image 1:", e.nativeEvent.error)
                }
              />
            </Pressable>
            <Pressable
              style={{ flex: 1, height: "100%" }}
              onPress={() => openImageModal(images[1])}
            >
              <Image
                source={{ uri: images[1] }}
                style={styles.twoImage}
                onError={(e) =>
                  console.log("Error loading image 2:", e.nativeEvent.error)
                }
              />
            </Pressable>
          </View>
        )}

        {/* Three Images */}
        {images.length === 3 && (
          <View style={styles.threeImagesContainer}>
            {/* Left side (full height) */}
            <Pressable
              style={{ flex: 1 }} // This Pressable takes the left half
              onPress={() => openImageModal(images[0])}
            >
              <Image
                source={{ uri: images[0] }}
                style={styles.threeImageLeft}
                onError={(e) =>
                  console.log("Error loading image 1:", e.nativeEvent.error)
                }
              />
            </Pressable>

            {/* Right side (two stacked images) */}
            <View style={styles.threeImageRightContainer}>
              <Pressable
                style={{ flex: 1 }} // Top half
                onPress={() => openImageModal(images[1])}
              >
                <Image
                  source={{ uri: images[1] }}
                  style={styles.threeImageRight}
                  onError={(e) =>
                    console.log("Error loading image 2:", e.nativeEvent.error)
                  }
                />
              </Pressable>

              <Pressable
                style={{ flex: 1 }} // Bottom half
                onPress={() => openImageModal(images[2])}
              >
                <Image
                  source={{ uri: images[2] }}
                  style={styles.threeImageRight}
                  onError={(e) =>
                    console.log("Error loading image 3:", e.nativeEvent.error)
                  }
                />
              </Pressable>
            </View>
          </View>
        )}
      </View>

      {/* FULL-SCREEN MODAL */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={closeImageModal}
      >
        <ImageViewer
            imageUrls={selectedImage ? [{ url: selectedImage }] : []}
            enableSwipeDown
            onSwipeDown={closeImageModal}
            onCancel={closeImageModal}
            backgroundColor="#000"
            minScale={1}
            maxScale={5}
            renderIndicator={() => <></>}
        />
      </Modal>
    </>
  );
};

export default DynamicImageGrid;

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH - 30,
    height: 300,
    overflow: "hidden",
    borderRadius: 12,
  },

  // Single Image
  singleImage: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
    resizeMode: 'cover',
  },

  // Two Images
  twoImagesContainer: {
    flexDirection: "row",
    gap: IMAGE_GAP,
    height: 300,
  },
  twoImage: {
    flex: 1,
    height: "100%",
    borderRadius: 12,
    resizeMode: 'cover',
  },

  // Three Images
  threeImagesContainer: {
    flexDirection: "row",
    gap: IMAGE_GAP,
    height: 300,
  },
  threeImageLeft: {
    flex: 1,
    height: "100%",
    borderRadius: 12,
    resizeMode: 'cover',
  },
  threeImageRightContainer: {
    flex: 1,
    flexDirection: "column",
    gap: IMAGE_GAP,
  },
  threeImageRight: {
    flex: 1,
    height: "50%",
    borderRadius: 12,
    resizeMode: 'cover',
  },
});
