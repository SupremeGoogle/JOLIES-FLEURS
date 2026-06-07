import { cpSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const web = join(root, "web");
const rootNext = join(root, ".next");
const webNext = join(web, ".next");

function run(command, args, options = {}) {
  console.log(`\n> ${command} ${args.join(" ")}`);
  const result = spawnSync(command, args, {
    cwd: options.cwd ?? root,
    env: process.env,
    stdio: "inherit",
    shell: false,
  });

  if (result.status !== 0) {
    throw new Error(`${command} ${args.join(" ")} failed with exit code ${result.status}`);
  }
}

function copyDir(from, to) {
  if (!existsSync(from)) {
    throw new Error(`Expected build artifact does not exist: ${from}`);
  }
  rmSync(to, { recursive: true, force: true });
  cpSync(from, to, { recursive: true });
  console.log(`copied ${from} -> ${to}`);
}

console.log("RelaxDev build: installing web dependencies");
run("npm", ["ci"], { cwd: web });

console.log("RelaxDev build: building Next.js app in web/");
run("npm", ["run", "build"], { cwd: web });

console.log("RelaxDev build: preparing root-level standalone artifacts");
rmSync(rootNext, { recursive: true, force: true });
rmSync(join(root, "public"), { recursive: true, force: true });
mkdirSync(rootNext, { recursive: true });
mkdirSync(join(webNext, "standalone", ".next"), { recursive: true });

copyDir(join(webNext, "standalone"), join(rootNext, "standalone"));
copyDir(join(webNext, "static"), join(rootNext, "static"));
copyDir(join(webNext, "static"), join(webNext, "standalone", ".next", "static"));
copyDir(join(web, "public"), join(root, "public"));
copyDir(join(web, "public"), join(webNext, "standalone", "public"));

console.log("RelaxDev build: done");
