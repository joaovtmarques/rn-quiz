import { StatusBar } from 'react-native';
import { Routes } from './routes';

export function App() {
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <Routes />
    </>
  );
}
