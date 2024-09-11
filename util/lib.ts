/**
 * Logging for processing in queue
 */
export interface QueueStatus {
  succeed: boolean;
  message: string;
}

/**
 * Encodes Uint8Array to base64 and includes MIME TYPE
 */
export const encodeBase64 = (data: Uint8Array): string => {
  const base64: string = btoa(
    String.fromCharCode.apply(null, data.data),
  );

  return `data:image/webp;base64,${base64}`;
};

/**
 * Decodes base64, removes MIME and converts into Uint8Array
 */
export const decodeBase64 = (b64: string): Uint8Array => {
  // Remove Mime type
  const b64Web: string = b64.split(",")[1];
  const binString: string = atob(b64Web);
  const size: number = binString.length;
  const bytes: Uint8Array = new Uint8Array(size);
  for (let i: number = 0; i < size; i++) {
    bytes[i] = binString.charCodeAt(i);
  }
  return bytes;
};
