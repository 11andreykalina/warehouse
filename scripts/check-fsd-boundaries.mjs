import { existsSync, readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sourceRoot = path.join(projectRoot, 'src');
const layerOrder = new Map([
  ['shared', 0],
  ['entities', 1],
  ['features', 2],
  ['widgets', 3],
  ['pages', 4],
  ['app', 5],
]);
const slicedLayers = new Set(['entities', 'features', 'widgets', 'pages']);
const problems = [];

function getSourceFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      return getSourceFiles(entryPath);
    }

    return /\.(ts|tsx)$/.test(entry.name) ? [entryPath] : [];
  });
}

function resolveImport(importer, specifier) {
  const basePath = specifier.startsWith('@/') ?
    path.join(sourceRoot, specifier.slice(2)) :
    path.resolve(path.dirname(importer), specifier);
  const candidates = [
    basePath,
    `${basePath}.ts`,
    `${basePath}.tsx`,
    path.join(basePath, 'index.ts'),
    path.join(basePath, 'index.tsx'),
  ];

  return candidates.find((candidate) => existsSync(candidate));
}

function getSlice(filePath) {
  const relativePath = path.relative(sourceRoot, filePath);
  const [layer, slice] = relativePath.split(path.sep);

  return {
    layer,
    slice: slicedLayers.has(layer) ? slice : null,
  };
}

function display(filePath) {
  return path.relative(projectRoot, filePath).split(path.sep).join('/');
}

for (const importer of getSourceFiles(sourceRoot)) {
  const source = readFileSync(importer, 'utf8');
  const importerSlice = getSlice(importer);
  const importPattern = /\b(?:import|export)\s+(?:[^'"]*?\s+from\s+)?['"]([^'"]+)['"]/g;

  for (const match of source.matchAll(importPattern)) {
    const specifier = match[1];

    if (!specifier.startsWith('@/') && !specifier.startsWith('.')) {
      continue;
    }

    const target = resolveImport(importer, specifier);

    if (!target) {
      problems.push(`${display(importer)}: cannot resolve ${specifier}`);
      continue;
    }

    const targetSlice = getSlice(target);
    const sourceRank = layerOrder.get(importerSlice.layer);
    const targetRank = layerOrder.get(targetSlice.layer);

    if (sourceRank === undefined || targetRank === undefined) {
      problems.push(`${display(importer)}: import uses an unknown FSD layer: ${specifier}`);
      continue;
    }

    if (targetRank > sourceRank) {
      problems.push(`${display(importer)}: ${importerSlice.layer} must not depend on ${targetSlice.layer} (${specifier})`);
      continue;
    }

    if (
      importerSlice.layer === targetSlice.layer &&
      importerSlice.slice &&
      targetSlice.slice &&
      importerSlice.slice !== targetSlice.slice
    ) {
      problems.push(`${display(importer)}: cross-slice import from ${importerSlice.slice} to ${targetSlice.slice} (${specifier})`);
      continue;
    }

    if (specifier.startsWith('@/')) {
      const aliasParts = specifier.slice(2).split('/');
      const isSlicedLayerPublicApi =
        slicedLayers.has(targetSlice.layer) &&
        aliasParts.length === 2 &&
        aliasParts[1] === targetSlice.slice;
      const isSharedSegmentPublicApi = targetSlice.layer === 'shared' && aliasParts.length === 2;

      if (slicedLayers.has(targetSlice.layer) && !isSlicedLayerPublicApi) {
        problems.push(`${display(importer)}: import ${specifier} bypasses the ${targetSlice.slice} public API`);
      } else if (targetSlice.layer === 'shared' && !isSharedSegmentPublicApi) {
        problems.push(`${display(importer)}: import ${specifier} bypasses the shared segment public API`);
      }
    }
  }
}

if (problems.length > 0) {
  console.error('FSD boundary check failed:');
  for (const problem of problems) {
    console.error(`- ${problem}`);
  }
  process.exitCode = 1;
} else {
  console.log('FSD layer dependencies and slice public APIs are valid.');
}
