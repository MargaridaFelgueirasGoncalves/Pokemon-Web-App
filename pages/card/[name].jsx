import { useRouter } from 'next/router'

export default function Card() {
    const router = useRouter();

    return (
        <h1>{router.query.name}</h1>
    )
}