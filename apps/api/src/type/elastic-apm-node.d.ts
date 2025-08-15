declare module 'elastic-apm-node' {
  interface StartOptions {
    serviceName: string;
    serverUrl: string;
    captureBody?: string;
  }
  function start(options?: StartOptions): void;
  export { start };
  export default { start };
}
