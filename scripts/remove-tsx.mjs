import fs from 'fs/promises';
import path from 'path';

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

async function main(){
  const all = await walk(srcDir);
  const tsxFiles = all.filter(f => f.endsWith('.tsx'));
  console.log('Found', tsxFiles.length, '.tsx files to remove');
  for(const f of tsxFiles){
    // only remove if a corresponding .jsx exists
    const other = f.replace(/\.tsx$/, '.jsx');
    try{
      await fs.stat(other);
      await fs.unlink(f);
      console.log('Removed', f);
    }catch(e){
      // no corresponding jsx, skip
    }
  }
  console.log('Removal complete');
}

main().catch(e=>{console.error(e);process.exit(1)});
