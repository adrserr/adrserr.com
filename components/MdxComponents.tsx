/* eslint-disable react/display-name */
import NextImage, { ImageProps } from 'next/image'

export const mdxComponents = {
  Image: ({ caption, ...rest }: { caption: string } & ImageProps) => (
    <figure>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <NextImage {...rest} />
      {caption && (
        <figcaption className=" text-center text-sm text-gray-600 dark:text-gray-400 my-4">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
