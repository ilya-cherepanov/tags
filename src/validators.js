import { ALIGNMENTS } from "./consts";

export function isTag(tag) {
  if (typeof tag.text !== 'string') {
    return false;
  }

  if ('icon' in tag && typeof tag.icon !== 'string') {
    return false;
  }

  return true;
}

export function isAlignment(alignment) {
  return ALIGNMENTS.includes(alignment);
}
