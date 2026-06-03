/**
 * GitHub API helper.
 * When GITHUB_TOKEN is set (Vercel production), all saves go directly
 * to the repository via the GitHub API, triggering an automatic Vercel redeploy.
 * In local dev (no token), writes go to the local filesystem instead.
 */

const REPO = "SupremeGoogle/JOLIES-FLEURS";
const BRANCH = "main";

function headers() {
  return {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    Accept: "application/vnd.github+json",
    "Content-Type": "application/json",
  };
}

async function getFileSha(apiPath: string): Promise<string | undefined> {
  const res = await fetch(
    `https://api.github.com/repos/${REPO}/contents/${apiPath}?ref=${BRANCH}`,
    { headers: headers() }
  );
  if (!res.ok) return undefined;
  const data = await res.json();
  return data.sha;
}

/** Commit a text file (JSON, etc.) to GitHub */
export async function pushFileToGitHub(
  repoPath: string,   // e.g. "web/data/products.json"
  content: string,
  message: string
): Promise<void> {
  const sha = await getFileSha(repoPath);
  const encoded = Buffer.from(content, "utf8").toString("base64");

  const res = await fetch(
    `https://api.github.com/repos/${REPO}/contents/${repoPath}`,
    {
      method: "PUT",
      headers: headers(),
      body: JSON.stringify({ message, content: encoded, sha, branch: BRANCH }),
    }
  );

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`GitHub API error: ${res.status} — ${err}`);
  }
}

/** Commit a binary file (image) to GitHub and return its public path */
export async function pushImageToGitHub(
  filename: string,
  buffer: Buffer
): Promise<string> {
  const repoPath = `web/public/uploads/${filename}`;
  const sha = await getFileSha(repoPath);
  const encoded = buffer.toString("base64");

  const res = await fetch(
    `https://api.github.com/repos/${REPO}/contents/${repoPath}`,
    {
      method: "PUT",
      headers: headers(),
      body: JSON.stringify({
        message: `Upload image: ${filename}`,
        content: encoded,
        sha,
        branch: BRANCH,
      }),
    }
  );

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`GitHub image upload error: ${res.status} — ${err}`);
  }

  return `/uploads/${filename}`;
}

export const isProduction = () => Boolean(process.env.GITHUB_TOKEN);
