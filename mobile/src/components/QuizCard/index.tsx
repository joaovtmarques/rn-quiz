import {
  View,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import { QuizParams } from '../../@types/navigation';

interface QuizCardProps extends TouchableOpacityProps {
  data: QuizParams;
}

export function QuizCard({ data, ...rest }: QuizCardProps) {
  return (
    <TouchableOpacity
      {...rest}
      className="h-16 w-full bg-lightGrey mt-4 flex-row items-center justify-between p-5 rounded-md">
      <View
        className={`h-6 w-6 ${
          data.completed && data.userScore == 0
            ? 'bg-red'
            : data.completed && data.userScore > 0
            ? 'bg-green'
            : 'bg-tWhite'
        } rounded-3xl mr-6`}></View>
      <View className="flex-row flex-1 justify-between">
        <Text className="text-sm">{data.name}</Text>
        <Text className="text-sm">{data.userScore}pts</Text>
      </View>
    </TouchableOpacity>
  );
}
