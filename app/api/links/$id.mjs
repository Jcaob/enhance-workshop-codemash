// View documentation at: https://enhance.dev/docs/learn/starter-project/api
/**
  * @typedef {import('@enhance/types').EnhanceApiFn} EnhanceApiFn
  */
import { getLink, upsertLink, validate } from '../../models/links.mjs'
import { checkAuth } from '../../lib/checkAuth.mjs'

export const get = [checkAuth, listLink]

/**
 * @type {EnhanceApiFn}
 */
export async function listLink (req) {
  if (req.session.problems) {
    let { problems, link, ...session } = req.session
    return {
      session,
      json: { problems, link }
    }
  }

  const id = req.pathParameters?.id
  const result = await getLink(id)
  return {
    json: { link: result }
  }
}

export const post = [checkAuth, updateLink]

/**
 * @type {EnhanceApiFn}
 */
export async function updateLink (req) {
  const id = req.pathParameters?.id

  const session = req.session
  // Validate
  let { problems, link } = await validate.update(req)
  console.log({ problems, link })
  if (problems) {
    return {
      session: {...session, problems, link },
      json: { problems, link },
      location: `/links/${link.key}`
    }
  }

  // eslint-disable-next-line no-unused-vars
  let { problems: removedProblems, link: removed, ...newSession } = session
  try {
    const result = await upsertLink({ key: id, ...link })
    console.log({ result })
    return {
      session: newSession,
      json: { link: result },
      location: '/links'
    }
  }
  catch (err) {
    return {
      session: { ...newSession, error: err.message },
      json: { error: err.message },
      location: '/links'
    }
  }
}
