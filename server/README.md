# turbo-schedule-server

🎒 The server, connecting the `turbo-schedule`s infrastructure!

## Development notes

TODO rename `saved-content/` to `database/` (we can't right now because scraper has hard-coded stuff atm)

### Why is the `database/` folder not inside `generated/`?

I've had them separated, then I tried to put `database/` into `generated/`, but there's a flaw with docker volumes that limits us from doing this:

If a folder exists both in the volume and in the image, they folders are NOT merged!

However, if you mount the volume on the top-level of the folder,
such that folders/files inside of it are different
(like folders named by the date they were created inside the `database/`),
then, well, the new folders can come in, because they're different.

The only useful information I found regarding this issue was here:
https://stackoverflow.com/questions/27959860/how-to-merge-host-folder-with-container-folder-in-docker

and here:
https://github.com/moby/moby/issues/4361

And it still doesn't help / fix our use case.

---

Either way, maybe it's not that bad that they're split up,
since the database should persist it's old data,
~~but the `generated` data~~ nvm the access logs need to persist too,
this is the case for both.

Yeah, whatevs, #dockerPlsFix

This also might produce some unexpected stuff with old files, like `openAPI.json`.
I haven't had issues so far, but it's worth mentioning.
