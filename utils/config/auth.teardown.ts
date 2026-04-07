import fs from 'fs/promises';
import path from 'path';

async function teardown() {
  const env = process.env.NODE_ENV || 'test';
  const authFiles = [`user.${env}.json`, `admin.${env}.json`];

  for (const file of authFiles) {
    const authPath = path.resolve(process.cwd(), file);
    try {
      await fs.unlink(authPath);
      console.log(`Removed ${authPath}`);
    } catch (error: any) {
      if (error.code !== 'ENOENT') console.error(`Failed to remove ${authPath}:`, error);
    }
  }
}

export default teardown;