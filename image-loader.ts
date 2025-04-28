export default function imageLoader({ src }: { src: string }) {
  const isProd = process.env.NODE_ENV === 'production'
  return isProd ? `/lyrics-finder${src}` : src
} 