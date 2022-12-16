export default function apiConnect () {
  if (!process.env.NEXT_PUBLIC_API_adr) {
    throw new Error('Please add your API_adr to .env.local')
  }
  return process.env.NEXT_PUBLIC_API_adr
}
