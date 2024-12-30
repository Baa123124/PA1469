export function formatDistance(distance: number) {
  return distance < 1000 ? `${distance} m` : `${distance / 1000} km`
}
