export default async function Preflight ({ req }) {
  return {
    author: {
      name: 'Axol Lotl',
      title: 'Web Developer',
      githubUsername: 'enhance-dev',
    },
    path: req.path,
    pageTitle: getPageTitle(req.path)
  }
}

function getPageTitle (path) {
  const titleMap = {
    '/': 'Senior Developer',
    '/resume': 'Résumé',
    '/linktree': 'Links',
  }

  return titleMap[path] || ''
}
