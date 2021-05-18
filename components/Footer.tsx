import {
  RiGithubFill,
  RiTwitterFill,
  RiLinkedinBoxFill,
  RiMailFill
} from 'react-icons/ri'
import { NowPlaying } from './NowPlaying'

interface ExternalLinkProps {
  href: string
  children: JSX.Element
}

const ExternalLink = ({ href, children }: ExternalLinkProps) => (
  <a className="w-5" target="_blank" href={href} rel="noreferrer">
    {children}
  </a>
)

// eslint-disable-next-line import/prefer-default-export
export const Footer = () => (
  <footer className="flex flex-col flex-shrink-0 justify-center items-center text-lg pt-8 max-w-2xl mx-auto w-full mb-4">
    <hr className="w-10/12 md:w-full border-1 border-gray-200 dark:border-gray-800 mb-8" />
    <NowPlaying />
    <div className="flex space-x-7 p-6 max-w-2xl mx-auto items-center">
      <ExternalLink href="http://twitter.com/adrserr10">
        <RiTwitterFill />
      </ExternalLink>
      <ExternalLink href="https://github.com/adrserr">
        <RiGithubFill />
      </ExternalLink>
      <ExternalLink href="https://www.linkedin.com/in/adrserr/">
        <RiLinkedinBoxFill />
      </ExternalLink>
      <ExternalLink href="mailto:hello@adrserr.com">
        <RiMailFill />
      </ExternalLink>
    </div>
  </footer>
)
