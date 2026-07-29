// The LiteDB id post. Everything here is checked against the shipped source in
// AspNetDebugDashboard/src/AspNetFlags/Flags.cs — the entity, the unique index, and the
// predicate queries are the code that's running, not a sketch of it.

const Code = ({ children }) => (
  <pre className="my-6 overflow-x-auto rounded border border-white/10 bg-[#0d0d0d] p-4 font-mono text-[12px] leading-relaxed text-zinc-300">
    <code>{children}</code>
  </pre>
);

const P = ({ children }) => (
  <p className="mb-5 text-[15px] leading-[1.7] text-zinc-300">{children}</p>
);

const H = ({ children }) => (
  <h3 className="mt-10 mb-4 text-lg font-semibold tracking-tight text-white">{children}</h3>
);

const T = ({ children }) => <span className="font-mono text-[13px] text-[#4ECDC4]">{children}</span>;

export const POST = {
  title: "LiteDB will let you put [BsonId] on the wrong property",
  dek: "It doesn't warn you. It builds a phantom unique index instead, and the second insert dies on a key you can't see.",
  date: '2026-07-27',
  readingTime: '4 min',
  tags: ['C#', 'LiteDB', '.NET'],
};

export function LiteDbIdPost() {
  return (
    <article>
      <P>
        I keep a few small ASP.NET Core packages that all store to a local LiteDB file —
        the debug dashboard, a feature-flag panel, a couple of others. They all have the
        same shape: some entity with a natural string key, and a UI that reads and writes
        it by that key.
      </P>
      <P>
        For a feature flag, the natural key is the flag's name. So the obvious model is
        the obvious model:
      </P>

      <Code>{`public class FeatureFlag
{
    [BsonId]
    public string Name { get; set; } = "";
    public bool Enabled { get; set; }
}`}</Code>

      <P>
        This compiles. The first insert works. The second one throws{' '}
        <T>duplicate key ... value is null</T>, on a collection where you have inserted
        exactly one document and no two names are the same.
      </P>

      <H>What's actually happening</H>
      <P>
        <T>[BsonId]</T> tells LiteDB "this property is the document id." LiteDB honours
        that: it serialises <T>Name</T>'s value into the <T>_id</T> field. What it does
        not do is remove <T>Name</T> from its list of ordinary members. So it also
        registers a unique index literally named <T>Name</T> — and that index reads the{' '}
        <T>Name</T> field of the stored document, which no longer exists, because the
        value went to <T>_id</T>.
      </P>
      <P>
        Every document therefore indexes as null. The first null is fine. The second is a
        duplicate. The error message is technically accurate and completely useless,
        because the key it's complaining about isn't one you wrote.
      </P>
      <P>
        The second half of the trap is on the read side. <T>FindById(name)</T> queries{' '}
        <T>_id</T>, which does hold the name, so that part looks like it works. But an{' '}
        <T>Upsert</T> that goes through the collection's own id resolution can miss, and
        then you're inserting again, and the phantom index rejects it again. You end up
        staring at an upsert that never updates.
      </P>

      <H>The part that cost me the most time</H>
      <P>
        Not the diagnosis. The verification.
      </P>
      <P>
        Once I'd fixed the model I still got exceptions, now a{' '}
        <T>InvalidCastException</T> reading a string <T>_id</T> into an <T>ObjectId</T>.
        The fix was correct; the database file on disk was not. It still had documents in
        the old shape, and changing an id scheme is a breaking migration, not a code
        change. On Windows this is worse than it sounds, because deleting the file races
        whatever process still has a handle on it, so "I deleted it and it still fails"
        is a thing that happens to you for a while.
      </P>
      <P>
        What broke the loop was pointing the sample app at a brand new filename. Not
        deleting the old file. Not clearing it. A name that had never existed. If the code
        is right, a virgin database proves it in one run, and anything else you were
        fighting was state.
      </P>
      <P>
        I now reach for that earlier than I used to. When a fix "doesn't work," the
        question isn't only "is the code right" — it's "is there anything on disk that
        remembers the old code."
      </P>

      <H>What I do instead</H>
      <P>
        Give LiteDB the id it wants, and keep your natural key as an ordinary indexed
        field:
      </P>

      <Code>{`public class FeatureFlag
{
    [BsonId, JsonIgnore]
    public ObjectId Id { get; set; } = ObjectId.NewObjectId();

    public string Name { get; set; } = "";
    public bool Enabled { get; set; }
}

// once, at startup
_col.EnsureIndex(x => x.Name, unique: true);

// then query by predicate, never by id
var flag = _col.FindOne(x => x.Name == name);
_col.Upsert(flag);
_col.DeleteMany(x => x.Name == name);`}</Code>

      <P>
        Three things earn their place here.
      </P>
      <P>
        <T>ObjectId</T> is LiteDB's own id type, so nothing about the mapping is
        surprising. The <T>unique: true</T> index on <T>Name</T> is a real constraint on a
        real field, so when it fires it names something you recognise. And querying by
        predicate rather than by id means the code says what it means — you are looking up
        a flag by its name, not by whatever the storage layer decided a name is.
      </P>
      <P>
        <T>[JsonIgnore]</T> is there because System.Text.Json will happily serialise the{' '}
        <T>ObjectId</T> into your API responses otherwise, and an internal storage id has
        no business in a public payload.
      </P>

      <H>The general shape of it</H>
      <P>
        An attribute that accepts a value it can't actually honour is worse than one that
        throws. LiteDB had every opportunity to say "you can't put the id on a member I'm
        also going to index" and instead it built both, half-wired, and let the mistake
        surface three layers away as a null-key violation.
      </P>
      <P>
        There's not much you can do about a library making that choice. What you can do is
        stop treating "the storage layer's id" and "the thing my domain calls a key" as
        the same field. They almost never are, and every time I've collapsed them to save
        a property I've paid for it later.
      </P>
    </article>
  );
}
