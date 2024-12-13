import type { IExtendableMediaRecorderWavEncoderBrokerDefinition } from 'extendable-media-recorder-wav-encoder-broker';

export const createDeregisterEncoder =
    (
        encoderBrokerRegistry: Map<string, [RegExp, IExtendableMediaRecorderWavEncoderBrokerDefinition]>,
        ports: WeakMap<MessagePort, string>
    ) =>
    (port: MessagePort) => {
        const regexAsString = ports.get(port);

        if (regexAsString === undefined) {
            throw new Error('There is no encoder stored which wraps this port.');
        }

        encoderBrokerRegistry.delete(regexAsString);
        ports.delete(port);
    };
