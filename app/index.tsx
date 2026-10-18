import { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { SegmentedControl } from '@expo/ui/community/segmented-control';

export default function Home() {
  const [isControlShown, setIsControlShown] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <View style={styles.screen}>
      <Text>Open the browser console before loading this page.</Text>
      {isControlShown ? (
        <SegmentedControl
          style={styles.control}
          values={['One', 'Two']}
          selectedIndex={selectedIndex}
          onChange={(event) => setSelectedIndex(event.nativeEvent.selectedSegmentIndex)}
        />
      ) : (
        <Button title="Show a SegmentedControl" onPress={() => setIsControlShown(true)} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
  control: { width: 240 },
});
