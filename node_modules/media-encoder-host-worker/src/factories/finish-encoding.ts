import type { closePort as closePortFunction } from '../functions/close-port';
import type { createRemoveEncoderInstance } from './remove-encoder-instance';

export const createFinishEncoding = (
    closePort: typeof closePortFunction,
    removeEncoderInstance: ReturnType<typeof createRemoveEncoderInstance>
) => {
    return (encoderId: number) => {
        const [encoderBroker, port, isRecording, sampleRate] = removeEncoderInstance(encoderId);

        if (!isRecording) {
            return encoderBroker.encode(encoderId, null);
        }

        return new Promise<ArrayBuffer[]>((resolve) => {
            port.onmessage = ({ data }) => {
                if (data.length === 0) {
                    closePort(port);

                    resolve(encoderBroker.encode(encoderId, null));
                } else {
                    encoderBroker.record(encoderId, sampleRate, data);
                }
            };
        });
    };
};
