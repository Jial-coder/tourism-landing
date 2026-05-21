import en from '../lib/data/dictionaries/en';
import zh from '../lib/data/dictionaries/zh';

function diffKeys(a: unknown, b: unknown, path = ''): string[] {
  if (
    typeof a !== 'object' ||
    a === null ||
    typeof b !== 'object' ||
    b === null
  ) {
    return [];
  }
  const out: string[] = [];
  const ao = a as Record<string, unknown>;
  const bo = b as Record<string, unknown>;
  for (const k of Object.keys(ao)) {
    const next = path ? `${path}.${k}` : k;
    if (!(k in bo)) {
      out.push(`zh missing: ${next}`);
    } else {
      out.push(...diffKeys(ao[k], bo[k], next));
    }
  }
  for (const k of Object.keys(bo)) {
    const next = path ? `${path}.${k}` : k;
    if (!(k in ao)) out.push(`en missing: ${next}`);
  }
  return out;
}

const issues = diffKeys(en, zh);
if (issues.length) {
  console.error(issues.join('\n'));
  process.exit(1);
}
console.log('i18n parity OK');
