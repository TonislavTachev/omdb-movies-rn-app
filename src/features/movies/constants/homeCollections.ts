export interface HomeCollectionConfig {
  id: string;
  title: string;
  searchTerm: string;
}

export const HOME_COLLECTIONS = [
  {
    id: 'batman',
    title: 'Batman Collection',
    searchTerm: 'Batman',
  },
  {
    id: 'star-wars',
    title: 'Star Wars Collection',
    searchTerm: 'Star Wars',
  },
  {
    id: 'spider-man',
    title: 'Spider-Man Collection',
    searchTerm: 'Spider-Man',
  },
  {
    id: 'mission-impossible',
    title: 'Mission: Impossible',
    searchTerm: 'Mission Impossible',
  },
] as const satisfies readonly HomeCollectionConfig[];
