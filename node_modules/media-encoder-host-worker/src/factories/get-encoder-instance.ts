import type { TEncoderInstancesRegistryEntry } from '../types';

export const createGetEncoderInstance = (encoderInstancesRegistry: Map<number, TEncoderInstancesRegistryEntry>) => {
    return (encoderId: number) => {
        const entry = encoderInstancesRegistry.get(encoderId);

        if (entry === undefined) {
            throw new Error('There was no instance of an encoder stored with the given id.');
        }

        return entry;
    };
};
