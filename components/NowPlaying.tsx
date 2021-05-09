import useSWR from 'swr'
import Image from 'next/image'
import { RiSpotifyFill } from 'react-icons/ri'
import { useTranslation } from 'react-i18next'
import { fetcher } from '../lib/fetcher'
import { Song } from '../types'

export const NowPlaying = () => {
  const { data } = useSWR<Song>('/api/now-playing', fetcher)
  const { t } = useTranslation('common')

  return (
    <div className="flex flex-row border rounded-md p-2 w-72 justify-between border-gray-400">
      <div className="m-1 flex w-16 flex-sp-img">
        <Image
          className="rounded w-16 max-w-max"
          alt={data?.album ?? 'not playing image'}
          src={data?.albumImageUrl ?? '/images/notPlayingImage.jpg'}
          height="64"
          width="64"
          quality={100}
          layout={data?.albumImageUrl ? undefined : 'intrinsic'}
        />
      </div>
      <div className="flex flex-col truncate justify-items-center m-1 flex-grow">
        {data?.songUrl ? (
          <a
            className="text-gray-600 dark:text-gray-300 font-medium text-base truncate hover:underline"
            href={data.songUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {data.title}
          </a>
        ) : (
          <p className="text-gray-600 dark:text-gray-200 text-base font-semibold truncate">
            {t('footer.nowPlaying.notPlaying')}
          </p>
        )}

        <p className="text-gray-500 dark:text-gray-300 text-base font-light truncate">
          {data?.artist ?? 'Spotify'}
        </p>
      </div>
      <div className="justify-self-end text-xl text-spotify-green">
        <RiSpotifyFill />
      </div>
    </div>
  )
}
