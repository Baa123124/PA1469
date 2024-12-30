import {Star} from "lucide-react-native"
import { iconWithClassName } from "./iconWithClassName"
import { cssInterop } from 'nativewind';

cssInterop(Star, {
    className: {
      target: 'style',
      nativeStyleToProp: {
        opacity: true,
      },
    },
  });

export { Star }