import { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../../lib/supabase'
import { Locale, View } from '../../../types'

const POST_TABLE = process.env.VIEWS_TABLE

const getViews = async (slug: string, locale: Locale) => {
  if (slug && locale && POST_TABLE) {
    const { data: post, error } = await supabase
      .from<View>(POST_TABLE)
      .select('*')
      .eq('slug', slug)
      .eq('locale', locale)
      .single()

    if (!error && post) return post.views

    if (!error) {
      const { error: insertError } = await supabase
        .from(POST_TABLE)
        .insert({ slug, locale, views: 1 })
      if (!insertError) return 1
    }
  }
  return null
}

const addView = async (slug: string, locale: Locale) => {
  if (!POST_TABLE) return null

  const { data } = await supabase
    .from<View>(POST_TABLE)
    .select('views')
    .match({ slug, locale })
    .single()

  const { data: post, error } = await supabase
    .from<View>(POST_TABLE)
    .upsert({ slug, locale, views: (data?.views || 0) + 1 })
    .eq('slug', slug)
    .eq('locale', locale)
    .single()

  if (error) return null
  return post
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const post = await addView(
      req.query.slug as string,
      req.query.locale as Locale
    )
    return res.status(200).json({ views: post?.views })
  }

  if (req.method === 'GET') {
    const views = await getViews(
      req.query.slug as string,
      req.query.locale as Locale
    )
    return res.status(200).json({ views })
  }
  return null
}
