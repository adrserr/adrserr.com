import {
  RiGithubFill,
  RiTwitterFill,
  RiLinkedinBoxFill,
  RiMailFill,
  RiRssFill
} from 'react-icons/ri'
import Link from 'next/link'
import * as AccessibleIcon from '@radix-ui/react-accessible-icon'
import { forwardRef } from 'react'
import { NowPlaying } from './NowPlaying'
import { Locale } from '../types'

interface ExternalLinkProps {
  href: string
  children: JSX.Element
}

const ExternalLink = ({ href, children }: ExternalLinkProps) => (
  <a className="w-5" target="_blank" href={href} rel="noreferrer">
    {children}
  </a>
)
// Avoid warning https://nextjs.org/docs/api-reference/next/link#if-the-child-is-a-function-component
// eslint-disable-next-line prefer-arrow-callback
const RSSFeedIcon = forwardRef(function RSSFeedIcon() {
  return (
    <AccessibleIcon.Root label="Rss feed">
      <RiRssFill />
    </AccessibleIcon.Root>
  )
})

// eslint-disable-next-line import/prefer-default-export
export const Footer = ({ locale }: { locale: Locale }) => (
  <footer className="flex flex-col flex-shrink-0 justify-center items-center text-lg pt-8 max-w-2xl mx-auto w-full mb-4">
    <hr className="w-10/12 md:w-full border-1 border-gray-200 dark:border-gray-800 mb-8" />
    <NowPlaying />
    <div className="flex space-x-7 p-6 max-w-2xl mx-auto items-center">
      <ExternalLink href="http://twitter.com/adrserr10">
        <AccessibleIcon.Root label="Twitter">
          <RiTwitterFill />
        </AccessibleIcon.Root>
      </ExternalLink>
      <ExternalLink href="https://github.com/adrserr">
        <AccessibleIcon.Root label="Github">
          <RiGithubFill />
        </AccessibleIcon.Root>
      </ExternalLink>
      <ExternalLink href="https://www.linkedin.com/in/adrserr/">
        <AccessibleIcon.Root label="Linkedin">
          <RiLinkedinBoxFill />
        </AccessibleIcon.Root>
      </ExternalLink>
      <ExternalLink href="mailto:hello@adrserr.com">
        <AccessibleIcon.Root label="Email">
          <RiMailFill />
        </AccessibleIcon.Root>
      </ExternalLink>
      <Link href="/rss.xml" locale={locale} passHref>
        <RSSFeedIcon />
      </Link>
    </div>
  </footer>
)
