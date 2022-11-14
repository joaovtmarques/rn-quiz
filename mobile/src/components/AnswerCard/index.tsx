import { TouchableOpacity, Text, TouchableOpacityProps } from 'react-native';

interface AnswerCardProps extends TouchableOpacityProps {
  answer: string;
  correctAnswer?: boolean;
  bgColor?: string;
}

export function AnswerCard({
  answer,
  correctAnswer,
  bgColor,
  ...rest
}: AnswerCardProps) {
  return (
    <TouchableOpacity
      {...rest}
      className={`h-11 w-full mt-4 ${
        bgColor || 'bg-lightGrey'
      } rounded-md items-center justify-center`}>
      <Text className="text-xs">{answer}</Text>
    </TouchableOpacity>
  );
}
