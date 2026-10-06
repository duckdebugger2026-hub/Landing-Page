# Enquiry form → Google Sheet

The website has no server or database. Each enquiry is posted to a small Google
Apps Script web app, which adds it as a new row in your Google Sheet.

## Setup (about 5 minutes)

1. Create a new Google Sheet, for example "Website enquiries".
2. In the Sheet, open **Extensions → Apps Script**.
3. Delete the sample code, paste in everything from `Code.gs`, and save.
4. Optional: put your email address in `ALERT_EMAIL` to get an email for every enquiry.
5. Click **Deploy → New deployment**, choose type **Web app**, then set:
   - Execute as: **Me**
   - Who has access: **Anyone**
6. Click **Deploy**, approve the permissions, and copy the **Web app URL**
   (it ends in `/exec`).
7. In the website project, create a file called `.env.local` with:

   ```
   VITE_SHEET_ENDPOINT=https://script.google.com/macros/s/XXXX/exec
   ```

8. Rebuild the site (`npm run build`), or add the same variable in your
   Vercel/Netlify project settings and redeploy.

Until the endpoint is set, the form opens WhatsApp with the enquiry pre-filled
instead, so no lead is lost.

## Updating the script later

After editing `Code.gs`, use **Deploy → Manage deployments → Edit → New version**.
This keeps the same URL. Creating a brand new deployment gives you a new URL.

## Columns

| Date | Name | Business | WhatsApp | Package | Message | Status |
| ---- | ---- | -------- | -------- | ------- | ------- | ------ |

`Status` starts as "New". Change it to "Quote sent", "Call booked", etc. as you
follow up on WhatsApp.
