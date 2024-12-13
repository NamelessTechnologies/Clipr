import { IWorkerDefinition } from 'worker-factory';

export interface IMediaEncoderHostWorkerCustomDefinition extends IWorkerDefinition {
    deregister: {
        params: {
            port: MessagePort;
        };

        response: {
            result: undefined;
        };
    };

    encode: {
        params: {
            encoderId: number;

            timeslice: null | number;
        };

        response: {
            result: ArrayBuffer[];

            transferables: ArrayBuffer[];
        };

        transferables: ArrayBuffer[];
    };

    instantiate: {
        params: {
            encoderId: number;

            mimeType: string;

            sampleRate: number;
        };

        response: {
            result: MessagePort;

            transferables: [MessagePort];
        };
    };

    register: {
        params: {
            port: MessagePort;
        };

        response: {
            result: RegExp;
        };
    };
}
