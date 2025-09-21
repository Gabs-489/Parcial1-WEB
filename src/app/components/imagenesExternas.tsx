import Image from 'next/image';

const myLoader = ({ src, width, quality }: { src: string; width: number; quality?: number }) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};

interface ImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
}

const ImagenesExternas = ({ src, alt, width, height }: ImageProps) => {
  return (
    <Image
        className='w-40 h-40 object-cover'
        loader={myLoader}
        src={src}
        alt={alt}
        width={width}
        height={height}
    />
  );
}

export default ImagenesExternas;
