import { Transform, TransformOptions } from 'class-transformer';

export interface SanitizeStringOptions extends TransformOptions {
  toLowerCase?: boolean;
  trim?: boolean;
}

export function SanitizeString(options: SanitizeStringOptions = {}) {
  const { toLowerCase = true, trim = true } = options;

  return Transform(({ value }) => {
    if (value === null || value === undefined || typeof value !== 'string') {
      return value;
    }

    let result = value;

    if (trim) {
      result = result.trim();
    }

    if (toLowerCase) {
      result = result.toLowerCase();
    }

    return result;
  }, options);
}
