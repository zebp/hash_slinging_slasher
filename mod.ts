import {
  createHash,
  SupportedAlgorithm,
} from "https://deno.land/std@0.95.0/hash/mod.ts";
import { OutputFormat as DenoOutputFormat } from "https://deno.land/std@0.95.0/hash/hasher.ts";
import { iter, iterSync } from "https://deno.land/std@0.95.0/io/util.ts";

// Re-export the algorithms so we don't have to define them outselves.
export type {
  SupportedAlgorithm,
  supportedAlgorithms,
} from "https://deno.land/std@0.95.0/hash/mod.ts";

/**
 * How the resulting hash should be represented.
 */
export type OutputFormat = "bytes" | DenoOutputFormat;

type Result<T = OutputFormat> = T extends "bytes" ? ArrayBuffer
  : string;

/**
 * Asynchronously streams the reader into a hasher and returns the result.
 * 
 * @param reader the reader where data will be streamed to the hasher.
 * @param outputFormat the format of the function will return.
 * @param algorithm the algorithm used to hash the data from the reader.
 * @returns the hash represented in the specified format.
 */
export async function hash<T extends OutputFormat>(
  reader: Deno.Reader,
  outputFormat: T,
  algorithm: SupportedAlgorithm,
): Promise<Result<T>> {
  const hash = createHash(algorithm);

  for await (const chunk of iter(reader)) {
    hash.update(chunk);
  }

  if (outputFormat === "bytes") {
    return hash.digest() as Result<T>;
  } else {
    return hash.toString(outputFormat as DenoOutputFormat) as Result<T>;
  }
}

/**
 * Synchronously streams the reader into a hasher and returns the result.
 * 
 * @param reader the reader where data will be streamed to the hasher.
 * @param outputFormat the format of the function will return.
 * @param algorithm the algorithm used to hash the data from the reader.
 * @returns the hash represented in the specified format.
 */
export function hashSync<T extends OutputFormat>(
  reader: Deno.ReaderSync,
  outputFormat: T,
  algorithm: SupportedAlgorithm,
) {
  const hash = createHash(algorithm);

  for (const chunk of iterSync(reader)) {
    hash.update(chunk);
  }

  if (outputFormat === "bytes") {
    return hash.digest() as Result<T>;
  } else {
    return hash.toString(outputFormat as DenoOutputFormat) as Result<T>;
  }
}
