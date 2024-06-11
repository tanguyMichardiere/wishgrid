// biome-ignore lint/correctness/noNodejsModules: <explanation>
import { Writable } from "node:stream";

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
