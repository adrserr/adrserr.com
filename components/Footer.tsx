import {
  faGithub,
  faLinkedin,
  faTwitter
} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface ExternalLinkProps {
  href: string
  children: JSX.Element
}
const ExternalLink = ({ href, children }: ExternalLinkProps) => (
  <a className="w-5" target="_blank" href={href}>
    {children}
  </a>
)

export const Footer = () => {
  return (
    <footer className="flex flex-col flex-shrink-0 justify-center items-center">
      {/* <h6>Spotify</h6> */}
      <div className="flex space-x-7 p-6">
        <ExternalLink href="http://twitter.com/adrserr10">
          <FontAwesomeIcon icon={faTwitter} />
        </ExternalLink>
        <ExternalLink href="https://github.com/adrserr">
          <FontAwesomeIcon icon={faGithub} />
        </ExternalLink>
        <ExternalLink href="https://www.linkedin.com/in/adrserr/">
          <FontAwesomeIcon icon={faLinkedin} />
        </ExternalLink>
      </div>
    </footer>
  )
}
