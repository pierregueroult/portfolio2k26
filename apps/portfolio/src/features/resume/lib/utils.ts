interface GroupableItem {
  group: string;
}

export function messagesObjectToArray<T>(
  messagesObject: Record<string, T>,
): Array<T & { id: string }> {
  return Object.keys(messagesObject).map((key) => ({
    id: key,
    ...messagesObject[key],
  })) as Array<T & { id: string }>;
}

export function isSameGroup<T extends GroupableItem>(current: T, other: T): boolean {
  if (!current || !other) return false;
  return current.group === other.group;
}

export function getTimelineItemGrouping<T extends GroupableItem>(
  items: T[],
  index: number,
): {
  isContinuation: boolean;
  isLastInGroup: boolean;
} {
  const current = items[index];
  if (!current) return { isContinuation: false, isLastInGroup: false };

  const previous = index > 0 ? items[index - 1] : undefined;
  const next = index < items.length - 1 ? items[index + 1] : undefined;

  const sameAsPrevious = previous ? isSameGroup(current, previous) : false;
  const sameAsNext = next ? isSameGroup(current, next) : false;

  const isContinuation = sameAsPrevious;
  const isLastInGroup = !sameAsNext;

  return { isContinuation, isLastInGroup };
}

export function mapTimelineItems<T extends GroupableItem>(
  items: T[],
): Array<T & { isContinuation: boolean; isLastInGroup: boolean }> {
  return items.map((item, index) => ({
    ...item,
    ...getTimelineItemGrouping(items, index),
  }));
}
