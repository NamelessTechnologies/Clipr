import { IExtendableMediaRecorderWavEncoderBrokerDefinition, wrap } from 'extendable-media-recorder-wav-encoder-broker';
import { TWorkerImplementation, createWorker } from 'worker-factory';
import { createDeregisterEncoder } from './factories/deregister-encoder';
import { createFinishEncoding } from './factories/finish-encoding';
import { createGetEncoderInstance } from './factories/get-encoder-instance';
import { createInstantiateEncoder } from './factories/instantiate-encoder';
import { createPickCapableEncoderBroker } from './factories/pick-capable-encoder-broker';
import { createRegisterEncoder } from './factories/register-encoder';
import { createRemoveEncoderInstance } from './factories/remove-encoder-instance';
import { createRequestPartialEncoding } from './factories/request-partial-encoding';
import { closePort } from './functions/close-port';
import { IMediaEncoderHostWorkerCustomDefinition } from './interfaces';
import { TEncoderInstancesRegistryEntry } from './types';

/*
 * @todo Explicitly referencing the barrel file seems to be necessary when enabling the
 * isolatedModules compiler option.
 */
export * from './interfaces/index';
export * from './types/index';

const encoderBrokerRegistry: Map<string, [RegExp, IExtendableMediaRecorderWavEncoderBrokerDefinition]> = new Map();
const ports = new WeakMap<MessagePort, string>();
const deregisterEncoder = createDeregisterEncoder(encoderBrokerRegistry, ports);
const encoderInstancesRegistry: Map<number, TEncoderInstancesRegistryEntry> = new Map();
const getEncoderInstance = createGetEncoderInstance(encoderInstancesRegistry);
const removeEncoderInstance = createRemoveEncoderInstance(encoderInstancesRegistry, getEncoderInstance);
const finishEncoding = createFinishEncoding(closePort, removeEncoderInstance);
const pickCapableEncoderBroker = createPickCapableEncoderBroker(encoderBrokerRegistry);
const instantiateEncoder = createInstantiateEncoder(closePort, encoderInstancesRegistry, pickCapableEncoderBroker);
const registerEncoder = createRegisterEncoder(encoderBrokerRegistry, ports, wrap);
const requestPartialEncoding = createRequestPartialEncoding(getEncoderInstance);

createWorker<IMediaEncoderHostWorkerCustomDefinition>(self, <TWorkerImplementation<IMediaEncoderHostWorkerCustomDefinition>>{
    deregister: async ({ port }) => {
        return { result: deregisterEncoder(port) };
    },
    encode: async ({ encoderId, timeslice }) => {
        const arrayBuffers = timeslice === null ? await finishEncoding(encoderId) : await requestPartialEncoding(encoderId, timeslice);

        return { result: arrayBuffers, transferables: arrayBuffers };
    },
    instantiate: ({ encoderId, mimeType, sampleRate }) => {
        const port = instantiateEncoder(encoderId, mimeType, sampleRate);

        return { result: port, transferables: [port] };
    },
    register: async ({ port }) => {
        return { result: await registerEncoder(port) };
    }
});
