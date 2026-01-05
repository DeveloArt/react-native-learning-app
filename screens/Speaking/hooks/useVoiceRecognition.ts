import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert } from 'react-native';
import type { VoiceErrorEvent, VoiceModule, VoiceResultsEvent } from '../types/voice';
import {
  PROCESSING_DELAY_MS,
  RECORDING_TIMEOUT_MS,
  SPEECH_LOCALE,
  areWordsSimilar,
} from '../utils/speechRecognition';
import { Voice } from '../utils/voiceAvailability';

interface UseVoiceRecognitionProps {
  expectedWord: string;
  onResult: (isCorrect: boolean, recognizedText: string) => void;
}

interface UseVoiceRecognitionReturn {
  isRecording: boolean;
  isProcessing: boolean;
  recognizedText: string;
  startRecording: () => void;
  stopRecording: () => void;
  reset: () => void;
}

export const useVoiceRecognition = ({
  expectedWord,
  onResult,
}: UseVoiceRecognitionProps): UseVoiceRecognitionReturn => {
  const { t } = useTranslation();

  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [recognizedText, setRecognizedText] = useState('');

  const recordingTimeoutRef = useRef<number | null>(null);
  const isStartingRef = useRef<boolean>(false);
  const VoiceRef = useRef<VoiceModule | null>(null);
  const expectedWordRef = useRef(expectedWord);

  useEffect(() => {
    expectedWordRef.current = expectedWord;
  }, [expectedWord]);

  useEffect(() => {
    const initializeAndSetupVoice = async () => {
      if (!Voice) {
        console.warn('Voice module not available');
        return;
      }

      VoiceRef.current = Voice;

      Voice.onSpeechStart = () => {
        setIsRecording(true);
        isStartingRef.current = false;
      };

      Voice.onSpeechEnd = () => {
        setIsRecording(false);
      };

      Voice.onSpeechResults = (event: VoiceResultsEvent) => {
        if (event.value && event.value.length > 0) {
          const recognizedWord = event.value[0];
          setRecognizedText(recognizedWord);
          setIsProcessing(true);

          setTimeout(() => {
            const correct = areWordsSimilar(recognizedWord, expectedWordRef.current);
            setIsProcessing(false);
            onResult(correct, recognizedWord);
          }, PROCESSING_DELAY_MS);
        }
      };

      Voice.onSpeechError = (event: VoiceErrorEvent) => {
        if (
          event.error?.code === 'recognition_fail' &&
          (event.error?.message?.includes('No speech') || event.error?.message?.includes('speech'))
        ) {
          isStartingRef.current = false;
          setIsRecording(false);
          return;
        }

        console.error('Speech error:', event.error);
        setIsRecording(false);
        setIsProcessing(false);
        isStartingRef.current = false;

        if (event.error?.code === 'not_authorized') {
          Alert.alert(t('speaking.noPermission'));
        } else if (event.error?.code !== 'recognition_fail') {
          Alert.alert(t('speaking.error'), event.error?.message);
        }
      };
    };

    initializeAndSetupVoice();

    return () => {
      if (recordingTimeoutRef.current) {
        clearTimeout(recordingTimeoutRef.current);
      }
      if (VoiceRef.current) {
        VoiceRef.current.destroy().then(VoiceRef.current?.removeAllListeners);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startRecording = useCallback(async () => {
    if (isProcessing || isRecording || isStartingRef.current) return;

    const Voice = VoiceRef.current;
    if (!Voice) {
      Alert.alert(t('speaking.error'), t('speaking.notAvailable'));
      return;
    }

    try {
      isStartingRef.current = true;

      if (recordingTimeoutRef.current) {
        clearTimeout(recordingTimeoutRef.current);
      }

      recordingTimeoutRef.current = setTimeout(() => {
        Voice.stop();
      }, RECORDING_TIMEOUT_MS);

      await Voice.start(SPEECH_LOCALE, {
        EXTRA_PARTIAL_RESULTS: true,
      });
    } catch (error) {
      console.error('Error starting recording:', error);
      setIsRecording(false);
      isStartingRef.current = false;
      const errorMessage = error instanceof Error ? error.message : String(error);
      Alert.alert(t('speaking.error'), errorMessage);
    }
  }, [isProcessing, isRecording, t]);

  const stopRecording = useCallback(async () => {
    if (!isRecording) return;

    const Voice = VoiceRef.current;
    if (!Voice) return;

    if (recordingTimeoutRef.current) {
      clearTimeout(recordingTimeoutRef.current);
      recordingTimeoutRef.current = null;
    }

    try {
      await Voice.stop();
    } catch (error) {
      console.error('Error stopping recording:', error);
    }
  }, [isRecording]);

  const reset = () => {
    setRecognizedText('');
  };

  return {
    isRecording,
    isProcessing,
    recognizedText,
    startRecording,
    stopRecording,
    reset,
  };
};
