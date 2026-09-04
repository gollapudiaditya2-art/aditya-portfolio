import { getImageDimensions } from '../content/imageDimensions.js'

export function PortfolioImage({ src, width, height, ...props }) {
  const dimensions = getImageDimensions(src)
  return <img src={src} width={width ?? dimensions.width} height={height ?? dimensions.height} {...props} />
}
