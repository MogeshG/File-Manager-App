import './global.css';
import { Provider } from 'react-redux';
import { store } from 'store/store';
import { NavigationContainer } from '@react-navigation/native';
import MainLayout from 'Layouts/MainLayout';

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <MainLayout />
      </Provider>
    </NavigationContainer>
  );
}
