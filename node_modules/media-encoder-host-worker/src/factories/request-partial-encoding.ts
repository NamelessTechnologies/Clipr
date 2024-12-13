import type { createGetEncoderInstance } from './get-encoder-instance';

export const createRequestPartialEncoding = (getEncoderInstance: ReturnType<typeof createGetEncoderInstance>) => {
    return (encoderId: number, timeslice: number) => {
        const [encoderBroker] = getEncoderInstance(encoderId);

        return encoderBroker.encode(encoderId, timeslice);
    };
};
