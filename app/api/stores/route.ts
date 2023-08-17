import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function POST (
  req: Request,
) {
  try {
    // Using Clerk to authenticate this POST route
    const {userId} = auth()
    const body = await req.json()

    const {name} = body

    // If we don't have enough information to create our Store
    if (!userId) {
      return new NextResponse('Unauthorized', {status: 401})
    }
    // If we don't have enough information to create our Store
    if (!name) {
      return new NextResponse('Name is required', {status: 400})
    }

    // We have enough information to create our Store. 
    const store = await prismadb.store.create({
      data: {
        name, 
        userId
      }
    })
    return NextResponse.json(store)

  } catch(error) {
      console.log('[STORES_POST]', error)
      return new NextResponse('Internal error', {
        status: 500
      })
  }
}