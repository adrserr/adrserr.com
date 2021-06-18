import axios from 'axios'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import useSWR from 'swr'
import { fetcher } from '../lib/fetcher'
import { Locale } from '../types'

interface ViewCounterProps {
  slug: string
  locale: Locale
}
export const ViewsCounter = ({ slug, locale }: ViewCounterProps) => {
  const URL = `/api/views/${slug}?locale=${locale}`
  const { data } = useSWR<{ views: number }>(URL, fetcher)
  const { t } = useTranslation('common')

  useEffect(() => {
    const addView = () => axios.post(URL)

    addView()
  }, [URL])

  return (
    <span>
      {data?.views || '—'} {t('blog.viewsCounter.views')}
    </span>
  )
}
