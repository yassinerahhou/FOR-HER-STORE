import fs from 'node:fs';
import path from 'node:path';

const file = path.join(process.cwd(), 'node_modules', 'vinext', 'dist', 'routing', 'file-matcher.js');
if (fs.existsSync(file)) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(
    /async function\* scanWithExtensions[\s\S]*?\}\n\}/,
    `async function* scanWithExtensions(stem, cwd, extensions, exclude) {
	const targetBase = stem.includes("/") ? stem.split("/").pop() : stem;
	function* walk(dir) {
		let files;
		try { files = readdirSync(dir); } catch { return; }
		for (const f of files) {
			const full = join(dir, f);
			const rel = toSlash(relative(cwd, full));
			if (typeof exclude === "function" && exclude(rel)) continue;
			try {
				const stat = statSync(full);
				if (stat.isDirectory()) { yield* walk(full); }
				else if (stat.isFile()) {
					const ext = f.split(".").pop();
					const nameNoExt = f.substring(0, f.lastIndexOf("."));
					if (extensions.includes(ext) && nameNoExt === targetBase) { yield rel; }
				}
			} catch {}
		}
	}
	yield* walk(cwd);
}`
  );
  fs.writeFileSync(file, content, 'utf8');
  console.log('Patched vinext file-matcher.js for Node.js compatibility.');
}




