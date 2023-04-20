export const replaceHash = (hash: String) => {
  const result = hash.startsWith("$2y$") ? hash.replace("$2y$", "$2b$") : hash;
  return result;
};
