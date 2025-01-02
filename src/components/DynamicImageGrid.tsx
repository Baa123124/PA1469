import React from "react";
import { View, Image, StyleSheet, Dimensions } from "react-native";

interface DynamicImageGridProps {
  images: string[]; // Image URIs
}

const SCREEN_WIDTH = Dimensions.get("window").width;
const IMAGE_GAP = 4;

const DynamicImageGrid: React.FC<DynamicImageGridProps> = ({ images }) => {
  if (!images || images.length === 0) return null;

  console.log("Images:", images);

  return (
    <View style={styles.container}>
      {images.length === 1 && (
        <Image 
          source={{ uri: images[0] }} 
          style={styles.singleImage}
          onError={(e) => console.log('Error loading single image:', e.nativeEvent.error)}
        />
      )}

      {images.length === 2 && (
        <View style={styles.twoImagesContainer}>
          <Image 
            source={{ uri: images[0] }} 
            style={styles.twoImage}
            onError={(e) => console.log('Error loading image 1:', e.nativeEvent.error)}
          />
          <Image 
            source={{ uri: images[1] }} 
            style={styles.twoImage}
            onError={(e) => console.log('Error loading image 2:', e.nativeEvent.error)}
          />
        </View>
      )}

      {images.length === 3 && (
        <View style={styles.threeImagesContainer}>
          <Image 
            source={{ uri: images[0] }} 
            style={styles.threeImageLeft}
            onError={(e) => console.log('Error loading image 1:', e.nativeEvent.error)}
          />
          <View style={styles.threeImageRightContainer}>
            <Image 
              source={{ uri: images[1] }} 
              style={styles.threeImageRight}
              onError={(e) => console.log('Error loading image 2:', e.nativeEvent.error)}
            />
            <Image 
              source={{ uri: images[2] }} 
              style={styles.threeImageRight}
              onError={(e) => console.log('Error loading image 3:', e.nativeEvent.error)}
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default DynamicImageGrid;

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH - 20,
    height: SCREEN_WIDTH,
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
    height: SCREEN_WIDTH / 2,
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
    height: SCREEN_WIDTH / 2,
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
