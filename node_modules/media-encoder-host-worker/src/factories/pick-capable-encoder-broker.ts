import type { IExtendableMediaRecorderWavEncoderBrokerDefinition } from 'extendable-media-recorder-wav-encoder-broker';

export const createPickCapableEncoderBroker = (
    encoderBrokerRegistry: Map<string, [RegExp, IExtendableMediaRecorderWavEncoderBrokerDefinition]>
) => {
    return (mimeType: string) => {
        for (const [regex, encoderBroker] of Array.from(encoderBrokerRegistry.values())) {
            if (regex.test(mimeType)) {
                return encoderBroker;
            }
        }

        throw new Error('There is no encoder registered which could handle the given mimeType.');
    };
};
