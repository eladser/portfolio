// Three career chapters — used by the 3D hero. Numbers/dates/stacks are real (see CV).
// Code snippets are the *kind of code* he actually wrote in each chapter, not invented.

export const CAREER = [
  {
    id: 'elbit',
    org: 'ELBIT SYSTEMS',
    years: '2014–18',
    role: 'simulator instructor stations',
    detail: 'SW manager, 6-person team',
    stack: ['C#', 'C++', 'Java', 'WPF', 'WCF'],
    model: '/assets/models/elbit-station.glb',
    snippet: [
      'public static readonly DependencyProperty',
      '    StateProperty = DependencyProperty.Register(',
      '        nameof(State),',
      '        typeof(SimState),',
      '        typeof(InstructorPanel),',
      '        new PropertyMetadata(SimState.Idle, OnStateChanged));',
    ],
  },
  {
    id: 'kla',
    org: 'KLA · CPG DIVISION',
    years: '2019–24',
    role: 'cleanroom fab tools',
    detail: 'worldwide field support',
    stack: ['C#', '.NET', 'Blazor', 'Angular', 'Python', 'SQL Server', 'Mongo'],
    model: '/assets/models/kla-tool.glb',
    snippet: [
      '@inject IHubContext<ToolHub> hub',
      '',
      'await hub.Clients',
      '    .Group($"fab-{fabId}")',
      '    .SendAsync("WaferLoaded", waferId, ct);',
    ],
  },
  {
    id: 'wem',
    org: 'WEM ENERGY',
    years: '2025–present',
    role: 'Lead Software Engineer',
    detail: 'leads 2 engineers',
    stack: ['C# microservices', 'React/TS', 'PostgreSQL', 'Terraform', 'AWS'],
    model: '/assets/models/wem-bess.glb',
    snippet: [
      'await using var tx = await db.Database.BeginTransactionAsync(ct);',
      '',
      'var dispatched = await dispatcher.DispatchAsync(asset, plan, ct);',
      'await outbox.Publish(new AssetDispatched(asset.Id, dispatched.At), ct);',
      'await tx.CommitAsync(ct);',
    ],
  },
];
