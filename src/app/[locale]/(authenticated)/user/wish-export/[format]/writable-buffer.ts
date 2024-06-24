// biome-ignore lint/correctness/noNodejsModules: server only
import { Writable } from "node:stream";
import "server-only";

export class WritableBuffer extends Writable {
	private chunks: Uint8Array[] = [];

	_write(
		chunk: Uint8Array,
		_encoding: NodeJS.BufferEncoding,
		callback: (error?: Error | null) => void,
	): void {
		this.chunks.push(chunk);
		callback(null);
	}

	finish(): Promise<void> {
		return new Promise((resolve) => this.on("finish", resolve));
	}

	toBuffer(): Buffer {
		return Buffer.concat(this.chunks);
	}
}
