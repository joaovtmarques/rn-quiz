import { View, Text } from 'react-native';

interface HeadingProps {
  title: string;
  titleStyle?: string;
}

export function Heading({ title, titleStyle }: HeadingProps) {
  return (
    <View className="h-14 w-full bg-darkGrey items-center justify-center">
      <Text className={titleStyle || 'text-2xl text-tWhite'}>{title}</Text>
    </View>
  );
}
