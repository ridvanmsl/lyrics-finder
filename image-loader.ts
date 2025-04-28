export default function imageLoader({ src }: { src: string }) {
  const isProd = process.env.NODE_ENV === 'production'
  return isProd ? `/my-app${src}` : src
} 