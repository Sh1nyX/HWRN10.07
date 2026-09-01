import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  ToastAndroid,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

export default function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState<string[]>([]);

  const addTask = () => {
    if (task.trim() === '') {
      Alert.alert('Помилка', 'Треба коретний текст');
      return;
    }

    setTasks([...tasks, task]);
    setTask('');

    ToastAndroid.show('Задачу додано', ToastAndroid.SHORT);
  };

  const deleteTask = (index: number) => {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
  };

  return (
    <View style={styles.container}>

      <TextInput
        style={styles.input}
        placeholder="Нова задача:"
        value={task}
        onChangeText={setTask}
      />

      <Button title="Додати" onPress={addTask} />

      <View style={styles.list}>
        {tasks.map((t, index) => (
          <View key={index} style={styles.item}>
            <Text style={styles.itemText}>{t}</Text>

            <TouchableOpacity onPress={() => deleteTask(index)}>
              <Text style={styles.delete}>Видалити</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 80,
    backgroundColor: '#111',
  },
  title: {
    color: 'white',
    fontSize: 28,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  input: {
  backgroundColor: 'white',
  padding: 10,
  borderRadius: 8,
  marginBottom: 25, 
},
  list: {
    marginTop: 20,
    gap: 10,
  },
  item: {
    backgroundColor: '#222',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemText: {
    color: 'white',
    fontSize: 18,
  },
  delete: {
    color: 'red',
    fontWeight: 'bold',
  },
});
