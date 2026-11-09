# Nueva Esencia Repertoire

A static GitHub Pages site for the group's repertoire and practice log. It includes event and church ceremony catalogs, singer/key metadata, a random song picker, last-practiced dates, live current-practice updates, section notes, and 30-day practice counts.

## Current state

The interface and the 83-song starter catalog are in place. To sync across devices, connect a Supabase project:

1. Create a Supabase project and open **SQL Editor**.
2. In `supabase/setup.sql`, replace `CHANGE-THIS-CODE` with a strong group code, then run the SQL. It creates the tables, starter catalog, public read access, code-checked write functions, and realtime subscriptions. The group code is stored as a one-way bcrypt hash.
3. Copy the Project URL and publishable (or legacy anon) key into `config.js`. Do not use a service-role key.
4. In the GitHub repository for this `tools` folder, enable Pages from the `main` branch and root directory (Settings → Pages). If this folder is nested inside another repository, configure a Pages workflow to publish this directory.

The site asks for the group code when someone first tries to start a session or save notes. It stays in that browser tab's session. Anyone can view the catalog and practice history; only the database functions can write session and note records, and they check the code.

## Repertoire data

`songs.json` is the editable source catalog. Keys, singers, and recording artist/version are stored separately. Missing keys and artists are left blank. Paste a universal Songlink/Odesli or other smart link into `streaming_url` for each song, then seed/update Supabase using the matching rows in `supabase/setup.sql` (or update the `songs` table in the Supabase dashboard).

The ceremony titles and their parenthetical cues are preserved as supplied. The listed “Amigo (Salida)” is separate from the Events “Amigo” entry.
