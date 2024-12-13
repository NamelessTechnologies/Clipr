import { IBrokerDefinition } from 'broker-factory';

export interface IMediaEncoderHostBrokerDefinition extends IBrokerDefinition {
    deregister(port: MessagePort): Promise<void>;

    encode(encoderId: number, timeslice: null | number): Promise<ArrayBuffer[]>;

    instantiate(mimeType: string, sampleRate: number): Promise<{ encoderId: number; port: MessagePort }>;

    register(port: MessagePort): Promise<RegExp>;
}
