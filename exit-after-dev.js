const { exec } = require('child_process');

exec('yarn dev', (err, stdout, stderr) => {
  if (err) {
    console.error(`Error: ${err}`);
    process.exit(1);
  }
  console.log(`stdout: ${stdout}`);
  console.error(`stderr: ${stderr}`);
  process.exit(0); // Exit after running the development server
});
