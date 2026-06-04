// Year-by-year tech usage, hand-curated from the real CV. Intensities are ordinal:
//   0 = didn't use it
//   1 = light / incidental
//   2 = regular
//   3 = heavy / daily-driver
// Career chapters for context: Elbit 2014–18, KLA 2019–24, WEM 2025–present.

export const STACK_YEARS = [2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026];

export const STACK_TIMELINE = [
  // Backend / languages
  { name: 'C#',          category: 'backend',  usage: [3,3,3,3,3,3,3,3,3,3,3,3,3] },
  { name: '.NET',        category: 'backend',  usage: [2,2,2,2,2,3,3,3,3,3,3,3,3] },
  { name: 'ASP.NET Core',category: 'backend',  usage: [0,0,0,0,1,2,3,3,3,3,3,3,3] },
  { name: 'EF Core',     category: 'backend',  usage: [0,0,0,0,1,2,2,2,3,3,3,3,3] },
  { name: 'SignalR',     category: 'backend',  usage: [0,0,0,0,0,1,2,2,3,3,3,3,3] },
  { name: 'WPF',         category: 'backend',  usage: [3,3,3,3,3,1,1,0,0,0,0,0,0] },
  { name: 'WCF',         category: 'backend',  usage: [2,2,2,2,2,0,0,0,0,0,0,0,0] },
  { name: 'C++',         category: 'backend',  usage: [2,2,2,2,2,0,0,0,0,0,0,0,0] },
  { name: 'Java',        category: 'backend',  usage: [2,2,2,2,1,1,1,1,0,0,0,0,0] },
  { name: 'Python',      category: 'backend',  usage: [0,0,0,0,0,1,2,2,2,2,2,1,1] },

  // Frontend
  { name: 'Blazor',      category: 'frontend', usage: [0,0,0,0,0,1,2,3,3,3,2,1,0] },
  { name: 'Angular',     category: 'frontend', usage: [0,0,0,0,0,2,3,2,2,1,0,0,0] },
  { name: 'React',       category: 'frontend', usage: [0,0,0,0,0,0,0,0,0,1,1,3,3] },
  { name: 'TypeScript',  category: 'frontend', usage: [0,0,0,0,0,0,0,1,1,2,2,3,3] },

  // Database
  { name: 'SQL Server',  category: 'database', usage: [2,2,2,2,2,3,3,3,3,3,2,0,0] },
  { name: 'MongoDB',     category: 'database', usage: [0,0,0,0,0,1,1,2,2,2,2,0,0] },
  { name: 'MySQL',       category: 'database', usage: [0,0,0,0,0,1,1,2,2,1,1,0,0] },
  { name: 'PostgreSQL',  category: 'database', usage: [0,0,0,0,0,0,0,0,0,0,1,3,3] },

  // Cloud / infra
  { name: 'AWS',         category: 'cloud',    usage: [0,0,0,0,0,0,0,0,0,0,1,3,3] },
  { name: 'Docker',      category: 'devops',   usage: [0,0,0,0,0,1,2,2,2,2,2,3,3] },
  { name: 'Kubernetes',  category: 'devops',   usage: [0,0,0,0,0,0,0,1,1,1,1,2,2] },
  { name: 'Terraform',   category: 'devops',   usage: [0,0,0,0,0,0,0,0,0,0,1,3,3] },
];

// Job boundaries — for the vertical separators between Elbit/KLA/WEM in the chart
export const JOB_BOUNDARIES = [
  { year: 2018.5, label: 'Elbit → KLA' },
  { year: 2024.5, label: 'KLA → WEM' },
];

export const CATEGORY_COLORS = {
  backend:  { bar: 'bg-[#4ECDC4]', text: 'text-[#4ECDC4]', label: 'backend' },
  frontend: { bar: 'bg-sky-400',   text: 'text-sky-400',   label: 'frontend' },
  database: { bar: 'bg-emerald-400', text: 'text-emerald-400', label: 'database' },
  cloud:    { bar: 'bg-amber-400', text: 'text-amber-400', label: 'cloud' },
  devops:   { bar: 'bg-rose-400',  text: 'text-rose-400',  label: 'devops' },
};
