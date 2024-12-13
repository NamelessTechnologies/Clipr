import type { TEncoderInstancesRegistryEntry } from '../types';
import type { createGetEncoderInstance } from './get-encoder-instance';

export const createRemoveEncoderInstance = (
    encoderInstancesRegistry: Map<number, TEncoderInstancesRegistryEntry>,
    getEncoderInstance: ReturnType<typeof createGetEncoderInstance>
) => {
    return (encoderId: number) => {
        const entry = getEncoderInstance(encoderId);

        encoderInstancesRegistry.delete(encoderId);

        return entry;
    };
};
