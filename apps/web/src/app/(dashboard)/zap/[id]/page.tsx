import React from 'react'

export default async function page(props: {
    params: Promise<{
        id: string
    }>
}) {
    const { id } = await props.params;
    return (
        <div>{id}</div>
    )
}
