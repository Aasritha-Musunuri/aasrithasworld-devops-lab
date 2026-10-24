// Public lesson source. Never put passwords or GitHub tokens in this file.
const retiredDomain = location.hostname === 'asymytric.com' || location.hostname.endsWith('.asymytric.com');
window.STUDY_SOURCE = {
  owner: 'Aasritha-Musunuri',
  repository: 'Devops',
  branch: 'main',
  directory: 'DevOps-Learning-Journey',
  // Keep local preview and public GitHub lessons connected without using the retired domain.
  retiredDomain,
  mode: retiredDomain ? 'disabled' : location.hostname === '127.0.0.1' || location.hostname === 'localhost' ? 'local' : 'github'
};
