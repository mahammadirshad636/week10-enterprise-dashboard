export interface RealTimeMessage<T = unknown> {
  type: string;
  payload: T;
}

export class WebSocketService {
  private socket: WebSocket | null = null;
  private reconnectAttempts = 0;
  private reconnectTimer: number | null = null;
  private readonly url: string;
  private readonly onMessage: (message: RealTimeMessage) => void;
  private readonly onStatusChange: (status: 'connected' | 'disconnected' | 'reconnecting') => void;

  constructor(
    url: string,
    onMessage: (message: RealTimeMessage) => void,
    onStatusChange: (status: 'connected' | 'disconnected' | 'reconnecting') => void
  ) {
    this.url = url;
    this.onMessage = onMessage;
    this.onStatusChange = onStatusChange;
  }

  connect() {
    this.socket = new WebSocket(this.url);

    this.socket.onopen = () => {
      this.reconnectAttempts = 0;
      this.onStatusChange('connected');
    };

    this.socket.onmessage = (event) => {
      try {
        const parsed = JSON.parse(event.data) as RealTimeMessage;
        this.onMessage(parsed);
      } catch {
        // Ignore unsupported payloads
      }
    };

    this.socket.onclose = () => {
      this.onStatusChange('disconnected');
      this.scheduleReconnect();
    };

    this.socket.onerror = () => {
      this.onStatusChange('disconnected');
    };
  }

  private scheduleReconnect() {
    if (this.reconnectAttempts >= 5) {
      return;
    }
    this.reconnectAttempts += 1;
    this.onStatusChange('reconnecting');
    const wait = this.reconnectAttempts * 1000;
    this.reconnectTimer = window.setTimeout(() => this.connect(), wait);
  }

  send(message: RealTimeMessage) {
    if (this.socket?.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(message));
    }
  }

  disconnect() {
    if (this.reconnectTimer) {
      window.clearTimeout(this.reconnectTimer);
    }
    this.socket?.close();
    this.socket = null;
  }
}
