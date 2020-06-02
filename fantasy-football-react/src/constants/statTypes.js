export const actualStats = {
  statSourceId: 0, // actual
  statSplitTypeId: 1,
};
export const projectedStats = {
  statSourceId: 1, // projected
  statSplitTypeId: 1,
};

export const stats = [
  // QB
  { id: 0, name: 'attempts' },
  { id: 1, name: 'completions' },
  { id: 3, name: 'throwing yds' },
  { id: 4, name: 'throwing TDs' },
  // WR
  { id: 41, name: 'receptions' },
  { id: 42, name: 'rec yds' },
  { id: 43, name: 'rec TDs' },
  { id: 47, name: 'longest rec' },
  { id: 58, name: 'targets' },
  { id: 60, name: 'avg rec yds' },
  // RB
  { id: 23, name: 'rushing attempts' },
  { id: 24, name: 'rush yds' },
  { id: 25, name: 'rush TDs' },
  { id: 39, name: 'avg rush rds' },
];
