import axios from 'axios';
import { useEffect, useState } from 'react';
import Alert from 'react-native-awesome-alerts';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View, FlatList, StyleSheet } from 'react-native';

import { QuizParams } from '../../@types/navigation';

import { Heading } from '../../components/Heading';
import { QuizCard } from '../../components/QuizCard';

export function Home() {
  const navigation = useNavigation();

  const [quizzes, setQuizzes] = useState<QuizParams[]>([]);
  const [quiz, setQuiz] = useState({});
  const [alert, setAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');

  // define a exibição do alerta como true e define as informações do quiz
  function handleSetQuizInfo(data: QuizParams) {
    setAlert(true);
    setAlertTitle(data.name);
    setQuiz(data);
  }

  // redireciona o usuario para a tela do quiz com seus parâmetros
  function handleOpenQuiz() {
    navigation.navigate('quiz', quiz as QuizParams);
  }

  // busca a lista de quizzes na api quando o componente é montado
  useEffect(() => {
    axios.get<QuizParams[]>('http://172.26.32.1:3000/quiz').then((response) => {
      setQuizzes(response.data);
    });
  }, [quizzes]);

  return (
    <SafeAreaView className="h-full w-full">
      <Heading title="Quiz" />
      <View className="px-7 flex-1">
        <View className="h-9 w-[51.44%] mt-10 bg-darkGrey justify-center items-center rounded-md">
          <Text className="text-base text-tWhite">
            quizes cumpridos:{' '}
            {quizzes.filter((item) => item.completed === true).length}/
            {quizzes.length}
          </Text>
        </View>
        <View className="mt-6 mb-1 flex-row justify-between">
          <Text>Atividades</Text>
          <Text>Pontuação</Text>
        </View>

        <FlatList
          data={quizzes}
          contentContainerStyle={{ paddingBottom: 32 }}
          renderItem={({ item }: { item: QuizParams }) => (
            <QuizCard data={item} onPress={() => handleSetQuizInfo(item)} />
          )}
          ListEmptyComponent={() => <Text>Não há quizzes disponíveis.</Text>}
          showsVerticalScrollIndicator={false}
        />
        <Alert
          show={alert}
          showProgress={false}
          title={alertTitle}
          titleStyle={styles.title}
          message={
            'Quanto mais rápido responder\ncorretamente, mais pontos você vai ganhar'
          }
          messageStyle={styles.message}
          closeOnTouchOutside
          onConfirmPressed={() => handleOpenQuiz()}
          showConfirmButton
          confirmText="Iniciar"
          confirmButtonStyle={styles.confirmBtn}
          confirmButtonColor={'#61E8A7'}
          showCancelButton
          cancelText="Cancelar"
          onCancelPressed={() => {
            setAlert(false);
          }}
          cancelButtonStyle={styles.cancelBtn}
          cancelButtonTextStyle={{ color: '#61E8A7' }}
          contentContainerStyle={styles.alert}
        />
      </View>
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
