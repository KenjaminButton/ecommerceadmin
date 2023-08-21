import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function POST (
  req: Request,
  {params}: {params: {storeId: string}}
) {
  try {
    // Using Clerk to authenticate this POST route
    const {userId} = auth()
    const body = await req.json()

    const {label, imageUrl} = body

    // If we don't have enough information to create our Billboard
    if (!userId) {
      return new NextResponse('Unauthenticated', {status: 401})
    }
    // If we don't have enough information to create our Billboard
    if (!label) {
      return new NextResponse('Label is required', {status: 400})
    }
    if (!imageUrl) {
      return new NextResponse('Image URL is required', {status: 400})
    }

    if (!params.storeId) {
      return new NextResponse('Store id is required', {status: 400})
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId
      }
    })

    if (!storeByUserId) {
      // user is trying to update someone else's store
      return new NextResponse('Unauthorized', {status: 403})
    }

    // We have enough information to create our Billboard. 
    const billboard = await prismadb.billboard.create({
      data: {
        label,
        imageUrl,
        storeId: params.storeId
      }
    })
    return NextResponse.json(billboard)

  } catch(error) {
      console.log('[BILLBOARDS_POST]', error)
      return new NextResponse('Internal error', {
        status: 500
      })
  }
}

export async function GET (
  req: Request,
  {params}: {params: {storeId: string}}
) {
  try {
    if (!params.storeId) {
      return new NextResponse('Store id is required', {status: 400})
    }

    // We have enough information to create our Billboard. 
    const billboards = await prismadb.billboard.findMany({
      where: {
        storeId: params.storeId
      }
    })
    return NextResponse.json(billboards)

  } catch(error) {
      console.log('[BILLBOARDS_GET]', error)
      return new NextResponse('Internal error', {
        status: 500
      })
  }
}