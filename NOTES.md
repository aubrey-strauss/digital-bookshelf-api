# Notes: Digital Bookshelf API (Lab 13.2)

## Trip-ups and fixes

- **`git status` listed my whole user folder** (AppData, Documents, `../../../` paths). There's a stray Git repo in my home folder, so Git thought this project belonged to it. **Fix:** run `git init` *inside* the project folder. A repo in a closer folder wins. Check with `git rev-parse --show-toplevel`; it should end in `/digital-bookshelf-api`.
- **Save `.gitignore` before `git add .`** Git only skips what's in the *saved* file, and unsaved means `.env` (my password) could get pushed.
- **`ECONNREFUSED 127.0.0.1:3000` in Postman** means the server isn't running. Run `node server.js` and wait for "Server running…" before clicking Send.
- **`ReferenceError: exoress is not defined`** was a misspelled name. The error gives file, line and character (`server.js:7:9`).
- **No "Server running" message:** something was off on the `app.listen` line. The message needs backticks (`` ` ``) for `${PORT}` to work.
- **`Cannot POST /api/books`** (an HTML page, not JSON) means Express found no matching route. Usually I forgot to restart the server after saving (Ctrl + C, then `node server.js`). Node only reads files when it starts.
- **"Path `title` is required" AND "Path `author` is required"** at the same time means the server got an *empty body*. My code was fine; the problem was in Postman.
  - How I found it: I added `console.log('BODY RECEIVED:', req.body)` in the route, and it printed `undefined`. That meant `express.json()` skipped the request.
  - Postman's hidden Headers showed **Content-Length: 0**, so the body really was empty, and no Content-Type was sent.
  - **Fix:** Body tab → select **raw** (not none) → paste the JSON → dropdown on **JSON** → Send.
  - Lesson: when stuck, `console.log` what actually arrives instead of guessing.

## New terms

- **schema:** the blueprint of fields and rules for a book (`models/Book.js`).
- **model:** the schema turned into a working tool (`Book.create`, `Book.find`…).
- **validation:** rules checked before saving (`required: true`).
- **default:** the value used when none is given (`inStock: true`).
- **collection / document:** a group of same-kind records (`books`) / one record (one book).
- **middleware:** code that runs in the middle, between the request arriving and the route answering (`express.json()`).
- **router / route / endpoint:** the traffic director for URLs / one URL + method + its code / the full address, like `POST /api/books`.
- **mount:** attaching a router at a starting path (`app.use('/api/books', bookRoutes)`).
- **async / await:** "this function does slow stuff" / "wait here until it finishes."
- **module.exports:** what a file ships out to other files (CommonJS version of `export`).
- **environment variable:** a setting kept outside the code, in `.env` (`MONGO_URI`, `PORT`).
- **status codes:** 200 OK, 201 Created, 400 Bad Request, 404 Not Found.
- **Content-Type:** the label saying what's inside a request; Postman's JSON option sets `application/json`.
