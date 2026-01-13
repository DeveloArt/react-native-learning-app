import { useEffect, useState } from 'react';
import { View } from 'react-native';

interface Props {
  isRecording?: boolean;
}

export function SpeakingWaveform({ isRecording = false }: Props) {
  const [bars, setBars] = useState<number[]>([]);

  useEffect(() => {
    if (isRecording) {
      // Generate random heights for waveform animation
      const interval = setInterval(() => {
        const newBars = Array.from({ length: 9 }, () => Math.random() * 28 + 4);
        setBars(newBars);
      }, 150);

      return () => clearInterval(interval);
    } else {
      setBars([]);
    }
  }, [isRecording]);

  if (!isRecording || bars.length === 0) {
    return null;
  }

  return (
    <View className="flex items-center justify-center h-12 mt-8 flex-row">
      {bars.map((height, index) => (
        <View
          key={index}
          className="w-1 bg-blue-500 rounded-full mx-0.5"
          style={{ height: height }}
        />
      ))}
    </View>
  );
}
