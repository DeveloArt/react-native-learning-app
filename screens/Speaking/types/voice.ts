export interface VoiceModule {
  isAvailable: () => Promise<0 | 1>;
  start: (locale?: string, options?: { [key: string]: unknown }) => Promise<void>;
  stop: () => Promise<void>;
  destroy: () => Promise<void>;
  removeAllListeners: () => void;
  onSpeechStart?: () => void;
  onSpeechEnd?: () => void;
  onSpeechResults?: (event: VoiceResultsEvent) => void;
  onSpeechError?: (event: VoiceErrorEvent) => void;
}

export interface VoiceResultsEvent {
  value?: string[];
}

export interface VoiceErrorEvent {
  error?: {
    code?: string;
    message?: string;
  };
}
