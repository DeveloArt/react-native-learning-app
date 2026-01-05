import type { VoiceModule } from '../types/voice';

let VoiceModuleImplementation: VoiceModule | null = null;

try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const VoiceLib = require('@react-native-voice/voice').default;
  VoiceModuleImplementation = VoiceLib as unknown as VoiceModule;
} catch {
  console.warn('Voice module not available (likely running in Expo Go)');
}

export const Voice = VoiceModuleImplementation;
