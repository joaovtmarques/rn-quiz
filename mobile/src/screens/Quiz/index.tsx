import axios from 'axios';
import { useState, useEffect } from 'react';
import Alert from 'react-native-awesome-alerts';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';

import { QuizParams } from '../../@types/navigation';

import { Heading } from '../../components/Heading';
import { AnswerCard } from '../../components/AnswerCard';

export function Quiz() {
  const navigation = useNavigation();
  const route = useRoute();

  // recebe os parâmetros do quiz (question, answers, ...)
  const quiz = route.params as QuizParams;

  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [customInterval, setCustomInterval] = useState<NodeJS.Timer>();
  const [correctAnswer, setCorrectAnswer] = useState(false);
  const [incorrectAnswerSelected, setIncorrectAnswerSelected] = useState([
    false,
    false,
    false,
  ]);
  const [alert, setAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  // quando usuario selecionar a resposta incorreta do quiz
  function handleIncorrectAnswer(correctAnswer: string, index: number) {
    let incorrectAnswer = [...incorrectAnswerSelected];
    incorrectAnswer[index] = true;
    setIncorrectAnswerSelected(incorrectAnswer);
    stopTimer();
    setAlert(true);
    setAlertTitle('Você errou!');
    setAlertMessage(`A resposta correta para o quiz era ${correctAnswer}`);

    axios
      .put<QuizParams>(`http://172.26.32.1:3000/quiz/${quiz.id}/complete`, {
        gotItRight: false,
        time: seconds,
      })
      .then((response) => {
        console.log(response.data);
      });
  }

  // quando usuario selecionar a resposta correta do quiz
  function handleCorrectAnswer() {
    setCorrectAnswer(true);
    stopTimer();
    setAlert(true);
    setAlertTitle('Você acertou!');
    setAlertMessage(`Parabéns, você selecionou a opção correta em um tempo de "0'"
    ${minutes < 10 ? '0' + minutes : minutes}"
    ${seconds < 10 ? '0' + seconds : seconds}`);

    axios
      .put<QuizParams>(`http://172.26.32.1:3000/quiz/${quiz.id}/complete`, {
        gotItRight: true,
        time: seconds,
      })
      .then((response) => {
        console.log(response.data);
      });
  }

  // inicia o timer, define o intervalo
  function startTimer() {
    setCustomInterval(
      setInterval(() => {
        changeTime();
      }, 1000),
    );
  }

  // para o contador
  function stopTimer() {
    if (customInterval) {
      clearInterval(customInterval);
    }
  }

  function changeTime() {
    setSeconds((prevState) => {
      if (prevState + 1 == 60) {
        setMinutes((prevState) => {
          return prevState + 1;
        });
        return 0;
      }
      return prevState + 1;
    });
  }

  // inicia a contagem dos segundos quando o componente é montado
  useEffect(() => {
    startTimer();
  }, []);

  return (
    <SafeAreaView className="h-full w-full">
      <Heading title={quiz.name} titleStyle="text-xl text-tWhite font-bold" />
      <View className="flex-1 items-center justify-center px-7">
        <Text className="text-2xl font-bold text-green text-center">
          {quiz.question}
        </Text>
        <View className="w-full mt-6">
          {quiz.incorrectAnswers.map((item, index) => {
            return (
              <AnswerCard
                answer={item}
                bgColor={
                  incorrectAnswerSelected[index] === true
                    ? 'bg-red'
                    : 'bg-lightGrey'
                }
                onPress={() => handleIncorrectAnswer(quiz.correctAnswer, index)}
              />
            );
          })}
          <AnswerCard
            answer={quiz.correctAnswer}
            bgColor={correctAnswer ? 'bg-green' : 'bg-lightGrey'}
            onPress={() => handleCorrectAnswer()}
          />
        </View>

        <View>
          <Text>
            0'
            {minutes < 10 ? '0' + minutes : minutes}"
            {seconds < 10 ? '0' + seconds : seconds}
          </Text>
        </View>
      </View>
      <Alert
        show={alert}
        showProgress={false}
        title={alertTitle}
        titleStyle={styles.title}
        message={alertMessage}
        messageStyle={styles.message}
        closeOnTouchOutside
        onConfirmPressed={() => navigation.goBack()}
        showConfirmButton
        confirmText="Ok"
        confirmButtonStyle={styles.confirmBtn}
        confirmButtonColor={'#61E8A7'}
        contentContainerStyle={styles.alert}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    color: '#676767',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  message: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 5,
    fontSize: 19,
    textAlign: 'center',
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#EBEBEB',
  },
  confirmBtn: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2.22,
    elevation: 3,
    paddingHorizontal: 25,
    paddingVertical: 5,
  },
  cancelBtn: {
    backgroundColor: 'transparent',
  },

  alert: {
    height: 250,
    padding: 0,
  },
});
