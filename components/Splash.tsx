import { ProgressBar } from '@/components/progress/ProgressBar';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useEffect, useState } from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';

export default function Splash({ onFinish }: { onFinish?: () => void }) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const min = 750;
    const max = 1500;
    const duration = Math.random() * (max - min) + min;
    const start = Date.now();
    const id = setInterval(() => {
      const elapsed = Date.now() - start;
      const p = Math.min(1, elapsed / duration);
      setProgress(p);
      if (p >= 1) {
        clearInterval(id);
        setTimeout(() => onFinish?.(), 100);
      }
    }, 16);
    return () => clearInterval(id);
  }, [onFinish]);

  const { width } = Dimensions.get('window');
  const size = Math.round(width * 0.6);
  const scheme = useColorScheme();
  const backgroundColor = scheme === 'dark' ? '#000000' : '#ffffff';

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Image
        source={require('../assets/images/adaptive-icon.png')}
        style={{ width: size, height: size, resizeMode: 'contain' }}
      />
      <View style={{ width: Math.round(width * 0.6), marginTop: 20 }}>
        <ProgressBar progress={progress} height={8} showPercent />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    zIndex: 9999,
  },
});
