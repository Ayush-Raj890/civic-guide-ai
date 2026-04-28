import fs from 'fs/promises';
import path from 'path';
import ts from 'typescript';

const root = process.cwd();
const srcDir = path.join(root, 'src');

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const ent of entries) {
    const res = path.join(dir, ent.name);
    if (ent.isDirectory()) files.push(...await walk(res));
    else files.push(res);
  }
  return files;
}

function transpile(code, fileName) {
  const result = ts.transpileModule(code, {
    compilerOptions: {
      jsx: ts.JsxEmit.Preserve,
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2020,
      esModuleInterop: true,
      allowSyntheticDefaultImports: true,
    },
    fileName,
  });
  return result.outputText;
}

async function main() {
  console.log('Scanning src for .tsx files...');
  const all = await walk(srcDir);
  const tsxFiles = all.filter(f => f.endsWith('.tsx'));
  console.log(`Found ${tsxFiles.length} .tsx files`);
  for (const f of tsxFiles) {
    const code = await fs.readFile(f, 'utf8');
    const out = transpile(code, f);
    const newPath = f.replace(/\.tsx$/, '.jsx');
    await fs.writeFile(newPath, out, 'utf8');
    console.log('Wrote', path.relative(root, newPath));
  }
  console.log('Conversion complete. Review generated .jsx files.');
}

main().catch(err => { console.error(err); process.exit(1); });
