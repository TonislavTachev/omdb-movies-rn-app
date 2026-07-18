import { removeDuplicatesById } from '@/shared/utils/removeDuplicatesById';

describe('removeDuplicatesById', () => {
  it('preserves first occurrence', () => {
    const items = [
      { id: 'a', value: 1 },
      { id: 'b', value: 2 },
      { id: 'a', value: 3 },
    ];

    expect(removeDuplicatesById(items)).toEqual([
      { id: 'a', value: 1 },
      { id: 'b', value: 2 },
    ]);
  });

  it('preserves order', () => {
    const items = [
      { id: 'c', value: 3 },
      { id: 'a', value: 1 },
      { id: 'b', value: 2 },
    ];

    expect(removeDuplicatesById(items).map((item) => item.id)).toEqual([
      'c',
      'a',
      'b',
    ]);
  });

  it('does not mutate input', () => {
    const items = [
      { id: 'a', value: 1 },
      { id: 'a', value: 2 },
    ];
    const snapshot = [...items];

    removeDuplicatesById(items);

    expect(items).toEqual(snapshot);
  });
});
