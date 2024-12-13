import type {
    IExtendableMediaRecorderWavEncoderBrokerDefinition,
    wrap as wrapFunction
} from 'extendable-media-recorder-wav-encoder-broker';

export const createRegisterEncoder =
    (
        encoderBrokerRegistry: Map<string, [RegExp, IExtendableMediaRecorderWavEncoderBrokerDefinition]>,
        ports: WeakMap<MessagePort, string>,
        wrap: typeof wrapFunction
    ) =>
    async (port: MessagePort) => {
        const encoderBroker = wrap(port);
        const regex = await encoderBroker.characterize();
        const regexAsString = regex.toString();

        if (encoderBrokerRegistry.has(regexAsString) || ports.has(port)) {
            throw new Error('There is already an encoder stored which handles exactly the same mime types.');
        }

        encoderBrokerRegistry.set(regexAsString, [regex, encoderBroker]);
        ports.set(port, regexAsString);

        return regex;
    };
