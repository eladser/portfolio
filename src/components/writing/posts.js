// Post metadata only — deliberately separate from the post components. The index view
// imports from here so the SPA bundle never pulls in the prose, which would put the
// same text at two URLs.

export const POSTS = [
  {
    slug: 'litedb-bsonid',
    title: "LiteDB will let you put [BsonId] on the wrong property",
    dek: "It doesn't warn you. It builds a phantom unique index instead, and the second insert dies on a key you can't see.",
    date: '2026-07-27',
    readingTime: '4 min',
    tags: ['C#', 'LiteDB', '.NET'],
  },
];
