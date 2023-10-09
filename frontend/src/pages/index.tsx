import { Routes } from '../routes/constant'
import Link from 'next/link'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()
  useEffect(() => {
    router.push('/home')
  })
  return <></>
}
